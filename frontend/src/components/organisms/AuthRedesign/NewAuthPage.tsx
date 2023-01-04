import React, {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { defaultAuthFormState } from ".";
import { currentAlertState } from "../../../stores/alert/selectors";
import { useDispatch, useSelector } from "../../../stores/rootReducer";
import PhoneInput, { Country } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import countryCode from "../../../ipcountrycode/ipcountrycode";
import {
  parsePhoneNumber,
  isPossiblePhoneNumber,
} from "react-phone-number-input";
import {
  authRequestInProcessing,
  doLoginUser,
  doRegisterUser,
} from "../../../stores/users";
import { IAlert } from "../../../types/alert";

import { ILoginRequest, IRegistration } from "../../../types/context/auth";
import { createModuleStyleExtractor } from "../../../utils/css";
import {
  validateCommonInformation,
  validateLoginForm,
} from "../../../utils/validation/validations";
import { Input } from "../../atoms/Input";
import { Loading } from "../../molecules/Loading/Loading";
import styles from "./Auth.module.scss";
import { useAuth } from "../../../hooks/useAuth";
import { noop } from "../../../utils/noop";
import { Modal } from "../../atoms/Modal";
import { useTranslation } from "react-i18next";
import { JoinIcon, LockIcon, UserIcon2 } from "../../../assets/svgIcons";
import { AuthLogin } from "../../molecules/AuthLogin/AuthLogin";
import { AuthSignUp } from "../../molecules/AuthSignUp/AuthSignUp";
import { SpinnerVolume } from "../../atoms/SpinnerVolume/SpinnerVolume";
import { Loader } from "../../atoms/Loader/Loader";

const cx = createModuleStyleExtractor(styles);
interface IAuth {
  onNotification: (alert: IAlert) => void;
  enableNotification?: boolean;
}
export const NewAuthPage: FC<IAuth> = ({
  onNotification,
  enableNotification = true,
}) => {
  const dispatch = useDispatch();
  const { token } = useAuth();
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const newQueryParameters: URLSearchParams = new URLSearchParams();
  const navigate = useNavigate();
  const alert = useSelector(currentAlertState); // extract the alert state
  const [action, setAction] = useState<string>("Register");
  const [user, setUser] = useState<IRegistration>(defaultAuthFormState);
  const isRequestProcess = useSelector((store) =>
    authRequestInProcessing(store)
  );
  const [fieldtype, setFieldType] = useState(0);
  const [countryShortCode, setCountryShortCode] = useState<Country>("US");
  const _updateUIAction = (action: string) => {
    newQueryParameters.delete("action");
    setSearchParams(newQueryParameters);
    setAction(action);
  };

  const [authStatus, setAuthStatus] = useState<string>("join");
  const [useType, setUserType] = useState<string>("");
  const [phoneCode, setPhoneCode] = useState("+1");
  const [activeTab, setActiveTab] = useState("email");
  const [allowLogin, setAllowLogin] = useState(false);
  const [allowSignUp, setAllowSignUp] = useState(false);

  /// watch the notification state and trigger notification
  useEffect(() => {
    alert.type === "SUCCESS" &&
      setUser({
        ...defaultAuthFormState,
        user_type: user.user_type,
      });
  }, [alert]);

  useEffect(() => {
    const action = searchParams.get("action");
    if (action) {
      setAction(`${action === "login" ? "Login" : "Register"}`);
    }

    const referral_code = searchParams.get("referral_code");
    const registration_source = searchParams.get("registration_source");
    if (referral_code) {
      setUser({
        ...user,
        user_type: "Student",
        ...(!!registration_source && { email: `${user.email}` }),
        referral_code,
      });
      setUserType("student");
      setAuthStatus("signup");
      setAction("Register");
    } else {
      // from new-landing-page
      setUserType("student");
      if (action === "login") {
        setAuthStatus("login");
        setAction("Login");
      } else if (action === "register") {
        setAuthStatus("signup");
        setAction("Register");
      }
    }
  }, [searchParams]);

  useEffect(() => {
    if (token) navigate("/dashboard/messenger", { replace: true });
  }, [token]);

  useEffect(() => {
    (async function () {
      const response = await countryCode();
      setCountryShortCode(response);
    })();
  }, []);

  /* to update the state */
  const updateState = (key: string, value: string) => {
    return setUser({
      ...user,
      [key]: value,
    });
  };

  const onSubmit = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    if (action === "Login") {
      const { error, message } = validateLoginForm(user as ILoginRequest);
      if (error) {
        return onNotification({
          type: "DANGER",
          message,
          active: true,
        });
      }

      activeTab === "email"
        ? dispatch(doLoginUser({ email: user.email, password: user.password }))
        : dispatch(doLoginUser({ phone: user.phone, password: user.password }));

      return;
    }
    if (user.password.length < 8) {
      return onNotification({
        type: "DANGER",
        message: "Password length must be at least 8 characters long",
        active: true,
      });
    }

    const { registration_source } = user;
    const bucket: IRegistration = {
      ...(registration_source === "phone" && {
        phone: `${user.phone}`,
        email: `${user.phone}`,
      }), // since both phone and email are indices at db
      ...(registration_source === "email" && {
        email: `${user.email}`,
        phone: `${user.email}`,
      }), // since both phone and email are indices at db
      ...(!!user.referral_code && {
        referral_code: `${user.referral_code}`,
      }),
      ...(user.user_type === "Student" && { user_name: `${user.user_name}` }),
      full_name: user.full_name,
      password: user.password,
      user_type: user.user_type,
      registration_source: user.registration_source,
      login_source: user.login_source,
      first_name: user.first_name,
      last_name: user.last_name,
    };

    const { error, message } = validateCommonInformation(bucket);

    if (error) {
      return onNotification({
        type: "DANGER",
        message,
        active: true,
      });
    }
    // if (bucket.registration_source === "phone") {
    //   /* check if it is valid phone number */
    //   if (bucket.phone) {
    //     if (!isPossiblePhoneNumber(bucket.phone)) {
    //       onNotification({
    //         type: "DANGER",
    //         message: "Invalid Phone Format",
    //         active: true,
    //       });
    //       return;
    //     }
    //   }
    // }
    const redirect_uri = searchParams.get("redirect_uri");
    !redirect_uri
      ? dispatch(doRegisterUser(bucket))
      : dispatch(doRegisterUser(bucket, redirect_uri));
  };

  return (
    <>
      <div className={cx("auth-page")}>
        {isRequestProcess && <Loader />}
        {authStatus === "join" ? (
          <div className={cx("join-section")}>
            <div className={cx("title")}>Join as Student or Agency</div>
            <div className={cx("options")}>
              <div
                className={cx([
                  "option",
                  useType === "student" ? "active" : "",
                ])}
                onClick={() => {
                  setUserType("student");
                  updateState("user_type", "Student");
                }}
              >
                <div className={cx("radio-btn")} />
                <div className={cx("icon")}>
                  <JoinIcon />
                </div>
                <div className={cx("lbl")}>I am a student looking for help</div>
              </div>
              <div
                className={cx(["option", useType === "agency" ? "active" : ""])}
                onClick={() => {
                  setUserType("agency");
                  updateState("user_type", "Agent");
                }}
              >
                <div className={cx("radio-btn")} />
                <div className={cx("icon")}>
                  <JoinIcon />
                </div>
                <div className={cx("lbl")}>
                  I am an agency looking for clients
                </div>
              </div>
            </div>
            <button
              disabled={!useType}
              onClick={() => setAuthStatus("signup")}
              className={cx("join-btn")}
            >
              Sign up
            </button>
            <button disabled={!useType} className={cx("already-blk")}>
              Already have an account?&nbsp;
              <button
                className={cx("signup-btn")}
                onClick={() => setAuthStatus("login")}
              >
                Login
              </button>
            </button>
          </div>
        ) : (
          <div className={cx("auth-container")}>
            {authStatus === "login" ? (
              <AuthLogin
                setAuthStatus={setAuthStatus}
                updateState={updateState}
                onSubmit={onSubmit}
                _updateUIAction={_updateUIAction}
                userState={user}
                phoneCode={phoneCode}
                setPhoneCode={setPhoneCode}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                allowLogin={allowLogin}
                setAllowLogin={setAllowLogin}
              />
            ) : authStatus === "signup" ? (
              <AuthSignUp
                useType={useType}
                setAuthStatus={setAuthStatus}
                updateState={updateState}
                onSubmit={onSubmit}
                userState={user}
                phoneCode={phoneCode}
                setPhoneCode={setPhoneCode}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                allowSignUp={allowSignUp}
                setAllowSignUp={setAllowSignUp}
              />
            ) : null}
          </div>
        )}
      </div>
    </>
  );
};
