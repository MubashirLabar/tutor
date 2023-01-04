import React, {
  FC,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import { defaultAuthFormState } from "../../organisms/AuthRedesign";
import PhoneInput, { Country } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import countryCode from "../../../ipcountrycode/ipcountrycode";
import { useTranslation } from "react-i18next";
import { LockIcon, UserIcon2 } from "../../../assets/svgIcons";
import ForgotPasswordModal from "../../molecules/ForgotPasswordModal/ForgotPasswordModal";
import { validateCommonInformation, validateLoginForm } from "../../../utils/validation/validations";
import { IRegistration } from "../../../types/context/auth";
import { IAlert } from "../../../types/alert";

interface IAuthLogin {
  setAuthStatus: Dispatch<SetStateAction<string>>;
  updateState: (key: string, value: string) => void;
  onSubmit: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  _updateUIAction: (action: string) => void;
  userState?: IRegistration;
  phoneCode: string;
  setPhoneCode: (number: string) => void;
  activeTab: string;
  setActiveTab: (number: string) => void;
  allowLogin: boolean;
  setAllowLogin: (allow: boolean) => void;
}

export const AuthLogin: FC<IAuthLogin> = ({
  setAuthStatus,
  updateState,
  onSubmit,
  _updateUIAction,
  userState,
  phoneCode,
  setPhoneCode,
  activeTab,
  setActiveTab,
  allowLogin,
  setAllowLogin,
}) => {
  const { t } = useTranslation();
  const [openForgot, setOpenForgot] = useState<boolean>(false);
  const [countryShortCode, setCountryShortCode] = useState<Country>("US");
  const [phoneWithoutCode, setPhoneWithoutCode] = useState(userState?.phone?.slice(phoneCode.length));

  const tabs = [
    { label: "Login With Email", value: "email" },
    { label: "Login With Phone", value: "phone" },
  ];

  useEffect(() => {
    (async function () {
      const response = await countryCode();
      setCountryShortCode(response);
    })();
    _updateUIAction("Login")
  }, []);

  useEffect(() => {
    updateState('login_source', activeTab)
  }, [activeTab])

  useEffect(() => {
    if (
      ((activeTab === "email") && userState?.email && userState?.password) ||
      ((activeTab === "phone") && userState?.phone?.slice(phoneCode.length) && userState?.password)
    ){
      setAllowLogin(true)
    } else {
      setAllowLogin(false)
    }
 
  }, [userState, activeTab]);

  return (
    <>
      <div className="auth-section">
        <div className="title">Log in to EduX</div>
        <div className="tabs">
          <div className="nav">
            {tabs.map((item, index) => (
              <div
                key={index}
                className={`item ${activeTab === item.value ? "active" : ""}`}
                onClick={() => setActiveTab(item.value)}
              >
                {item.label}
              </div>
            ))}
          </div>
        </div>
        <div className="form">
          {activeTab === "email" ? (
            <div className="field-row">
              <div className={userState?.email ? "filled-field" : "field"}>
                <div className="icon">
                  <UserIcon2 />
                </div>
                <div className="iput-container">
                  <input
                    type="text"
                    className="iput"
                    name='email'
                    value={userState?.email}
                    placeholder="Email Address"
                    onChange={(event) => {
                      event.preventDefault();
                      updateState('email', event.target.value)
                    }}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="field-row">
              <div className={phoneCode ? "filled-field flag" : "field flag"}>
                <PhoneInput
                  placeholder={t("Register.phone_placeholder")}
                  className="auth-phone-input phone-iput"
                  value={phoneCode ?? undefined}
                  international={true}
                  defaultCountry={countryShortCode}
                  onChange={(value: string) => setPhoneCode(value)}
                />
              </div>
              <div className={userState?.phone?.slice(phoneCode.length) ? "filled-field" : "field"}>
                <input
                  type="text"
                  className="phone-iput"
                  placeholder="Enter Phone Number"
                  value={phoneWithoutCode}
                  onChange={(event) => {
                    event.preventDefault();
                    const value = event.target.value
                    setPhoneWithoutCode(value)
                    updateState('phone', `${phoneCode}${value}`)
                  }}
                />
              </div>
            </div>
          )}
          <div className="field-row">
            <div className={userState?.password ? "filled-field" : "field"}>
              <div className="icon">
                <LockIcon />
              </div>
              <div className="iput-container">
                <input
                  type="password"
                  className="iput"
                  name='password'
                  placeholder="Password"
                  value={userState?.password}
                  onChange={(event) => {
                    event.preventDefault();
                    const value = event.target.value
                    updateState('password', value)
                  }} 
                />
              </div>
            </div>
          </div>
        </div>
        <div className="forget-blk">
          <button className="forget-btn" onClick={() => setOpenForgot(true)}>
            Forgot password?
          </button>
        </div>
        <button className={allowLogin ? "sign-btn-all-filled" : "sign-btn"} onClick={onSubmit}>Sign in</button>

        <div className="sginup-blk">
          Don’t have an account?&nbsp;
          <button
            className="signup-btn"
            onClick={() => setAuthStatus("signup")}
          >
            Sign Up
          </button>
        </div>
        <div className="or-line">
          <div className="txt">Or</div>
        </div>

        {/* Sign up with Google */}
        <button className="button-signup-google">
          <div className="icon">
            <img src="/assets/images/google.svg" />
          </div>
          <div className="lbl">Continue with Google</div>
        </button>
      </div>
      <ForgotPasswordModal
        toggle={openForgot}
        onClose={() => setOpenForgot(false)}
      />
    </>
  );
};
