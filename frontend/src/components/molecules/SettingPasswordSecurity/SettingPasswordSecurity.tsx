import React, { useState, useEffect } from "react";
import { createModuleStyleExtractor } from "../../../utils/css";
import styles from "./PasswordSecurity.module.scss";
const cx = createModuleStyleExtractor(styles);
import {
  CircleTickFillIcon,
  CircleTickIcon,
  EditIcon,
  ViewIcon,
} from "../../../assets/svgIcons";
import { Modal } from "../../atoms/Modal";
import { useDispatch, useSelector } from "../../../stores/rootReducer";
import Alert from "../../atoms/Alert/Alert";
import { currentAlertState } from "../../../stores/alert/selectors";
import { doCreateAlert } from "../../../stores/alert";
import { IUpdatePassword } from "../../../types/context/auth";
import {
  authRequestInProcessing,
  doSendEmailVerificationOTP,
  doSendOtp,
  doUpdatePassword,
  doVerifyEmailOTP,
  doVerifyMobileOtp,
  selectOtpSent,
} from "../../../stores/users";
import { useUser } from "../../../hooks/useUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import PhoneInput, { isPossiblePhoneNumber } from "react-phone-number-input";
import { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { ClickableIcon } from "../ClickableIcon/ClickableIcon";
import { validateEmail } from "../../../utils/common";
import { Loading } from "../Loading/Loading";
import { LocalStorage } from "../../../services/local-storage.service";

export const SettingPasswordSecurity = () => {
  const [passwordModal, setPasswordModal] = useState(false);
  const { active, message, type } = useSelector(currentAlertState);
  const dispatch = useDispatch();
  const user = useUser();
  const [phone, setPhone] = useState<string>(user?.phone || "");
  const [email, setEmail] = useState<string>(user?.email || "");
  const processing = useSelector(authRequestInProcessing);

  const [phoneOtp, setPhoneOtp] = useState<string>("");
  const [emailOtp, setEmailOtp] = useState<string>("");

  const [editPhoneNumber, setEditPhoneNumber] = useState<boolean>(false);
  const [editEmail, setEditEmail] = useState<boolean>(
    user?.email_verified ?? false
  );
  const isOtpSent = useSelector(selectOtpSent);

  const [showOldPassword, setShowOldPassword] = useState<boolean>(false);
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);

  const handleClosePasswordModal = () => {
    setPasswordModal(false);
  };

  const [password, setPassword] = useState<IUpdatePassword>({
    new_password: "",
    old_password: "",
  });

  const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword({
      ...password,
      [event.target.name]: event.target.value,
    });
  };

  /**
   * To dispatch alert
   * @param message
   * @param _type
   */
  const dispatchAlert = (message: string, _type: string = "DANGER") => {
    dispatch(
      doCreateAlert({
        active: true,
        type: _type,
        message,
      })
    );
  };

  /**
   * Handle Password Change
   * @param event
   * @returns
   */
  const onPasswordChangeSubmit = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const { new_password, old_password } = password;

    if (
      !new_password ||
      !old_password ||
      new_password.trim() === "" ||
      old_password.trim() === ""
    ) {
      dispatchAlert("Both fields are required");
      return;
    }

    if (new_password === old_password) {
      dispatchAlert("New & Old Password can not be same");
      return;
    }
    if (new_password.length < 8) {
      dispatchAlert("Password can not be less than 8 characters");
      return;
    }

    if (user) {
      dispatch(doUpdatePassword(password));
    }
  };

  /**
   * Dispatch Phone OTP
   * @returns
   */
  const dispatchPhoneOtp = () => {
    if (!user) return;
    if (!phone || phone.trim() === "") {
      dispatchAlert("Phone can not be empty");
      return;
    }
    // if (!isPossiblePhoneNumber(phone)) {
    //   dispatchAlert("Phone Format is not correct");
    //   return;
    // }
    const { expired, message } = LocalStorage.doVerifyOTPInformation(
      "phone",
      phone,
      user._id
    );
    if (!expired) {
      LocalStorage.doStoreOTPInformation("phone", phone, user._id);
      dispatch(doSendOtp(phone));
    } else {
      dispatchAlert(`${message}`);
    }
  };

  const isSourceEmpty = (source: string): boolean =>
    !source || source.trim() === "";

  /**
   * Dispatch Phone Verification OTP
   * @returns
   */
  const dispatchVerifyPhoneOtp = () => {
    if (isSourceEmpty(phoneOtp)) {
      dispatchAlert("OTP can not be empty");
      return;
    }
    dispatch(doVerifyMobileOtp(phone, phoneOtp));
  };

  /**
   * Dispatch Email verification OTP on email
   * @returns
   */
  const dispatchEmailVerificationOTP = () => {
    if (!user) return;
    if (isSourceEmpty(email)) {
      dispatchAlert("Email can not be empty");
      return;
    }
    if (!validateEmail(email)) {
      dispatchAlert("Email format is invalid");
      return;
    }
    const { expired, message } = LocalStorage.doVerifyOTPInformation(
      "email",
      email,
      user._id
    );
    if (!expired) {
      LocalStorage.doStoreOTPInformation("email", email, user._id);
      dispatch(doSendEmailVerificationOTP(email));
    } else {
      dispatchAlert(`${message}`);
    }
  };

  /**
   * Verify EMAIL OTP
   */
  const verifyEmailOTP = () => {
    if (!user) return;
    if (isSourceEmpty(emailOtp)) {
      dispatchAlert("Oops! Empty OTP");
      return;
    }
    if (isSourceEmpty(email)) {
      dispatchAlert("Please Enter Email");
      return;
    }
    dispatch(doVerifyEmailOTP(email, emailOtp));
  };

  useEffect(() => {
    if (active) {
      if (type === "SUCCESS") {
        setPasswordModal(false);
      }
    }
  }, [active]);

  useEffect(() => {
    if (user) {
      setEditPhoneNumber(user.phone_verified);
    }
  }, [user]);

  return (
    <>
      {user && (
        <>
          <div className={cx("password-security-setting")}>
            {processing && <Loading />}
            {/* {active && <Alert type={type} message={message} />} */}
            {/* Authentication options Block */}
            <div className={cx("info-block")}>
              <div className={cx("block-hdr")}>
                <div className={cx("hdr-title")}>Authentication options</div>
                <button
                  className={cx("edit-btn")}
                  onClick={() => setPasswordModal(true)}
                >
                  <EditIcon />
                </button>
              </div>
              <div className={cx("info-wrapper")}>
                <div className={cx("info-row")}>
                  <div className={cx("info-row-col")}>
                    <div className={cx("row-title")}>Password</div>
                    <div className={cx(["item", "flex"])}>
                      <div className={cx("icon")}>
                        <CircleTickFillIcon />
                      </div>
                      <div className={cx(["item-meta", "flex", "flex-col"])}>
                        <div className={cx("lbl")}>
                          Choose a strong, unique password that’s at least 8
                          characters long.
                        </div>
                        <div className={cx("txt")}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Edit Email */}
            {
              <div className={cx("info-block")}>
                <div className={cx("block-hdr")}>
                  <div className={cx("hdr-title")}>Verify Phone</div>
                </div>

                <div className={cx("info-wrapper")}>
                  <div className={cx("row-block")}>
                    <div className={cx("field")}>
                      <span
                        className={cx([
                          "span-alert",
                          user.phone_verified ? "verified" : "nonverified",
                        ])}
                      >
                        <FontAwesomeIcon icon={faCheckCircle} />{" "}
                        <span>
                          Phone {user.phone_verified ? "is" : "not"} Verified
                        </span>
                      </span>
                      <div
                        className={cx([
                          "form-fields-wrapper",
                          "form-fields-wrapper-phone",
                        ])}
                      >
                        <div className={cx("input-row")}>
                          <PhoneInput
                            placeholder="Enter phone number"
                            className={cx(["account-settings-phone"])}
                            value={phone ?? undefined}
                            international={true}
                            defaultCountry="US"
                            disabled={editPhoneNumber}
                            onChange={(value: string) => setPhone(value)}
                          />

                          {!user.phone_verified && (
                            <div
                              className={cx(["save-btn", "send-otp-btn"])}
                              onClick={
                                !user.phone_verified || !editPhoneNumber
                                  ? dispatchPhoneOtp
                                  : () => setEditPhoneNumber(false)
                              }
                            >
                              {editPhoneNumber ? "Change" : "Send Otp"}
                            </div>
                          )}
                        </div>
                        {isOtpSent && (
                          <div className={cx("input-row")}>
                            <span className={cx("otp-phone-sent-success")}>
                              Please Check your Phone Number
                            </span>
                          </div>
                        )}
                        {!user.phone_verified && (
                          <div className={cx("input-row")}>
                            <input
                              type="text"
                              className={cx("iput")}
                              placeholder="Enter OTP"
                              value={phoneOtp}
                              onChange={(event) =>
                                setPhoneOtp(event.target.value)
                              }
                            />

                            <div
                              className={cx("save-btn")}
                              onClick={dispatchVerifyPhoneOtp}
                            >
                              Verify
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            }

            {/* Verify Email< */}
            <div className={cx("info-block")}>
              <div className={cx("block-hdr")}>
                <div className={cx("hdr-title")}>Verify Email</div>
              </div>
              <div className={cx("info-wrapper")}>
                <div className={cx("row-block")}>
                  <div className={cx("field")}>
                    <span
                      className={cx([
                        "span-alert",
                        user.email_verified ? "verified" : "nonverified",
                      ])}
                    >
                      <FontAwesomeIcon icon={faCheckCircle} />{" "}
                      <span>
                        Email {user.email_verified ? "is" : "not"} Verified
                      </span>
                    </span>
                    <div className={cx("email-verification-actions")}>
                      <div className={cx("input-row")}>
                        <input
                          type="text"
                          className={cx("iput")}
                          placeholder="Verify Email"
                          value={email ?? ""}
                          disabled={editEmail}
                          onChange={(event) => setEmail(event.target.value)}
                        />
                        {!user.email_verified && (
                          <div
                            className={cx(["save-btn", "send-otp-btn"])}
                            onClick={dispatchEmailVerificationOTP}
                          >
                            Update
                          </div>
                        )}
                      </div>
                      <br />
                      {!user.email_verified && (
                        <div className={cx("input-row")}>
                          <input
                            type="text"
                            className={cx("iput")}
                            placeholder="Enter Email Verification OTP"
                            value={emailOtp ?? ""}
                            onChange={(event) =>
                              setEmailOtp(event.target.value)
                            }
                          />
                          <div
                            className={cx("save-btn")}
                            onClick={verifyEmailOTP}
                          >
                            Verify OTP
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Modal open={passwordModal} onClose={handleClosePasswordModal}>
            <div className={cx("change-password-modal")}>
              <div className={cx("password-modal-hdr")}>
                <div className={cx("modal-title")}>Change Password</div>
                <div
                  className={cx("modal-cross-btn")}
                  onClick={handleClosePasswordModal}
                >
                  &times;
                </div>
              </div>
              <div className={cx("modal-content")}>
                {/* <div className={cx("field")}>
              <div className={cx("lbl")}>First Name</div>
              <div className={cx("input-row")}>
                <input type="text" className={cx("iput")} />
              </div>
            </div> */}
                <div className={cx("field")}>
                  <div className={cx("lbl")}>Old Password</div>
                  <div className={cx(["flex", "aic"])}>
                    <div className={cx("input-row")}>
                      <input
                        type={showOldPassword ? "text" : "password"}
                        className={cx("iput")}
                        name="old_password"
                        value={password.old_password}
                        onChange={onChangePassword}
                      />
                      <div className={cx("icon")}>
                        <ClickableIcon
                          icon={<ViewIcon />}
                          onIconClick={() =>
                            setShowOldPassword(!showOldPassword)
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className={cx("field")}>
                  <div className={cx("lbl")}> New Password</div>
                  <div className={cx(["flex", "aic"])}>
                    <div className={cx("input-row")}>
                      <input
                        type={showNewPassword ? "text" : "password"}
                        className={cx("iput")}
                        name="new_password"
                        value={password.new_password}
                        onChange={onChangePassword}
                      />
                      <div className={cx("icon")}>
                        <ClickableIcon
                          icon={<ViewIcon />}
                          onIconClick={() =>
                            setShowNewPassword(!showNewPassword)
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className={cx("actions")}>
                  <div
                    className={cx(["action-btn", "transparent"])}
                    onClick={handleClosePasswordModal}
                  >
                    Cancel
                  </div>
                  <div
                    className={cx("action-btn")}
                    onClick={onPasswordChangeSubmit}
                  >
                    Save
                  </div>
                </div>
              </div>
            </div>
          </Modal>
        </>
      )}
    </>
  );
};
