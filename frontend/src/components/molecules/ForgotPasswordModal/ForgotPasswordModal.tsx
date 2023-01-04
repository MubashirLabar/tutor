import React, { FC, useEffect, useState } from "react";
import { createModuleStyleExtractor } from "../../../utils/css";
import { Modal } from "../../atoms/Modal";
import styles from "./ForgotPasswordModal.module.scss";
const cx = createModuleStyleExtractor(styles);
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { useDispatch, useSelector } from "../../../stores/rootReducer";
import {
  doRequestForgotPassword,
  doSendOtp,
  doVerifyMobileOtp,
  FetchForgotPasswordResponse,
  isForgotPasswordRequestSent,
  selectOtpSent,
} from "../../../stores/users";
import { validateEmail } from "../../../utils/common";
import { doCreateAlert } from "../../../stores/alert";
import { Loading } from "../Loading/Loading";
import { useNavigate } from "react-router-dom";
import { LocalStorage } from "../../../services/local-storage.service";

interface IForgotPasswordModal {
  toggle: boolean;
  onClose: () => void;
}
const ForgotPasswordModal: FC<IForgotPasswordModal> = ({ toggle, onClose }) => {
  const [show, setIsShow] = useState<boolean>(toggle);
  const dispatch = useDispatch();
  const [source, setSource] = useState<"phone" | "email">("email");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [otp, setOTP] = useState<string>("");
  const isRequestInQueue: boolean = useSelector((store) =>
    isForgotPasswordRequestSent(store)
  );
  const navigate = useNavigate();

  const fetchForgotPasswordResponse = useSelector(FetchForgotPasswordResponse);

  const otpSent = useSelector(selectOtpSent);

  const dispatchAlert = (message: string, type: string = "DANGER") => {
    dispatch(
      doCreateAlert({
        active: true,
        message,
        type,
      })
    );
  };
  const forgotResetPasswordRequest = () => {
    if (source === "email") {
      if (!email || !validateEmail(email)) {
        dispatchAlert("Please enter Valid Email");
        return;
      }
      dispatch(doRequestForgotPassword(email, "email"));
      return;
    }

    if (!phone || phone.length < 8 || phone.length > 15) {
      dispatchAlert("Please enter Valid Phone");
      return;
    }
    if (otpSent) {
      /* here we need to validate OTP */
      if (!otp || otp.length < 4) {
        dispatchAlert("Please enter valid OTP");
        return;
      }
      dispatch(doVerifyMobileOtp(phone, otp, false));
      return;
    }
    dispatch(doRequestForgotPassword(phone, "phone")); //otp sent on phone
  };

  useEffect(() => {
    setIsShow(toggle);
  }, [toggle]);

  /*
            setPhone('')
            setIsShow(false)
            onClose()
            navigate(`/auth/reset-password?token=${data.token}&source=${data.source}&phone=$`)
  */
  useEffect(() => {
    if (fetchForgotPasswordResponse) {
      if (fetchForgotPasswordResponse.status === "SUCCESS") {
        const { data } = fetchForgotPasswordResponse;
        if (data?.source === "phone") {
          setPhone("");
          setIsShow(false);
          onClose();
          navigate(
            `/auth/reset-password?token=${data.token}&source=${data.source}&phone=${data.phone}&id=${data.id}`
          );
          return;
        }
        if (source === "email") {
          console.log("reseting email....");
          setEmail("");
          setIsShow(false);
          onClose();
        }
      }
    }
  }, [fetchForgotPasswordResponse]);

  useEffect(() => {
    if (otpSent) {
      LocalStorage.doStoreOTPInformation("phone", phone);
    }
  }, [otpSent]);
  const sendOTP = () => {
    const { expired, message } = LocalStorage.doVerifyOTPInformation(
      "phone",
      phone,
      "",
      false
    );
    if (!expired) {
      LocalStorage.doStoreOTPInformation("phone", phone);
      dispatch(doRequestForgotPassword(phone, "phone"));
    } else {
      dispatchAlert(`${message}`);
    }
  };
  return (
    <>
      <Modal
        open={show}
        onClose={() => {
          setIsShow(false);
        }}
      >
        <div className={cx("new-chat-modal")}>
          <div className={cx("modal-hdr")}>
            <div className={cx("modal-title")}>Reset Password</div>
            <div
              className={cx("modal-cross-btn")}
              onClick={() => {
                setIsShow(false);
                onClose();
              }}
            >
              &times;
            </div>
          </div>

          <div className={cx("modal-content")}>
            {isRequestInQueue && <Loading />}
            <div className={cx("field")}>
              <div className={cx("lbl")}>
                Enter {source === "email" ? "Email" : "Phone"}
              </div>
              {source === "email" && (
                <input
                  type="text"
                  id="email"
                  name="email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                  className={cx("iput")}
                />
              )}
              {source === "phone" && (
                <>
                  <PhoneInput
                    placeholder="Enter phone number"
                    className={cx(["iput", "phone-input"])}
                    value={phone ?? undefined}
                    international={true}
                    defaultCountry="US"
                    onChange={(value: string) => setPhone(value)}
                  />
                </>
              )}
            </div>
            {source === "phone" && otpSent && (
              <div className={cx("field")}>
                <span
                  onClick={() => sendOTP()}
                  className={cx(["lost-password-link"])}
                  style={{
                    textAlign: "right",
                    paddingTop: "8px",
                    display: "block",
                  }}
                >
                  Resend OTP{" "}
                </span>
                <div className={cx("lbl")}>Enter OTP</div>
                {
                  <input
                    type="text"
                    id="otp"
                    name="otp"
                    placeholder="Enter OTP"
                    onChange={(event) => {
                      setOTP(event.target.value);
                    }}
                    className={cx("iput")}
                  />
                }
              </div>
            )}
            <span
              className={cx(["lost-password-link"])}
              onClick={() => setSource(source === "email" ? "phone" : "email")}
            >
              {source === "email"
                ? "Reset with Phone OTP ?"
                : "Reset using Email "}
            </span>
            <div className={cx("actions")}>
              <div
                className={cx(["action-btn", "transparent"])}
                onClick={() => {
                  setIsShow(false);
                  onClose();
                  setEmail("");
                  setPhone("");
                  setOTP("");
                }}
              >
                Cancel
              </div>
              <div
                className={cx("action-btn")}
                onClick={() => forgotResetPasswordRequest()}
              >
                {source === "email" ? (
                  "Send"
                ) : (
                  <>
                    {" "}
                    {source === "phone" && otpSent ? "Verify OTP" : "Send OTP"}
                  </>
                )}
              </div>
            </div>
          </div>

          <div></div>
        </div>
      </Modal>
    </>
  );
};
export default ForgotPasswordModal;
