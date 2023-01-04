import React, {
  FC,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

import PhoneInput, { Country } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import countryCode from "../../../ipcountrycode/ipcountrycode";
import { useTranslation } from "react-i18next";
import {
  InboxIcon,
  LockIcon,
  UserIcon2,
  ReferralCodeIcon,
} from "../../../assets/svgIcons";
import { IRegistration } from "../../../types/context/auth";

interface IAuthSignup {
  useType?: string;
  setAuthStatus: Dispatch<SetStateAction<string>>;
  updateState: (key: string, value: string) => void;
  onSubmit: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  userState?: IRegistration;
  phoneCode: string;
  setPhoneCode: (number: string) => void;
  activeTab: string;
  setActiveTab: (number: string) => void;
  allowSignUp: boolean;
  setAllowSignUp: (allow: boolean) => void;
}

export const AuthSignUp: FC<IAuthSignup> = ({
  setAuthStatus,
  useType,
  updateState,
  onSubmit,
  userState,
  phoneCode,
  setPhoneCode,
  activeTab,
  setActiveTab,
  allowSignUp,
  setAllowSignUp,
}) => {
  const { t } = useTranslation();
  const [countryShortCode, setCountryShortCode] = useState<Country>("US");
  const [phoneWithoutCode, setPhoneWithoutCode] = useState(userState?.phone?.slice(phoneCode.length));

  const tabs = [
    { label: "Sign Up With Email", value: "email" },
    { label: "Sign Up With Phone", value: "phone" },
  ];

  useEffect(() => {
    (async function () {
      const response = await countryCode();
      setCountryShortCode(response);
    })();
  }, []);

  useEffect(() => {
    updateState('registration_source', activeTab)
  }, [activeTab])

  useEffect(() => {
    if (
      (activeTab === "email" && useType === "agency" && userState?.email && userState?.password && userState?.full_name) ||
      (activeTab === "phone" && useType === "agency" && userState?.phone?.slice(phoneCode.length) && userState?.password && userState?.full_name) ||
      (activeTab === "email" && useType === "student" && userState?.email && userState?.password && userState?.full_name && userState?.user_name) ||
      (activeTab === "phone" && useType === "student" && userState?.phone?.slice(phoneCode.length) && userState?.password && userState?.full_name && userState?.user_name)
    ){
      setAllowSignUp(true)
    } else {
      setAllowSignUp(false)
    }
  }, [userState, activeTab]);

  return (
    <>
      <div className="auth-section">
        <div className="title">Get Your Free Account</div>
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
          {useType === "agency" ? (
            <div className="field-row">
              <div className={userState?.full_name ? "filled-field" : "field"}>
                <div className="icon">
                  <UserIcon2 />
                </div>
                <div className="iput-container">
                  <input
                    type="text"
                    className="iput"
                    placeholder="Enter your agency name"
                    value={userState?.full_name}
                    onChange={(event) => {
                      event.preventDefault();
                      const name = event.target.value
                      updateState('full_name', event.target.value)
                    }}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="field-row">
              <div className={(userState?.full_name)? "filled-field" : "field"}>
                <div className="icon">
                  <UserIcon2 />
                </div>
                <div className="iput-container">
                  <input
                    type="text"
                    className="iput"
                    value={userState?.full_name}
                    placeholder="Enter your full name"
                    onChange={(event) => {
                      event.preventDefault();
                      const entry = event.target.value
                      updateState('full_name', entry)
                      if (entry){
                        const splittedNames: string[] = entry.split(" ");
                        if (splittedNames.length > 1){
                          const firstName: string = splittedNames[0]
                          splittedNames.shift()
                          const lastName: string = splittedNames.join(" ")
                          updateState('first_name', firstName)
                          updateState('last_name', lastName)
                        }
                      }
                    }}
                  />
                </div>
              </div>
              <div className={userState?.user_name ? "filled-field" : "field"}>
                <div className="icon">
                  <UserIcon2 />
                </div>
                <div className="iput-container">
                  <input
                    type="text"
                    className="iput"
                    placeholder="Enter your user name"
                    value={userState?.user_name}
                    onChange={(event) => {
                      event.preventDefault();
                      updateState('user_name', event.target.value)
                    }}
                  />
                </div>
              </div>
            </div>
          )}
          {activeTab === "email" ? (
            <div className="field-row">
              <div className={userState?.email ? "filled-field" : "field"}>
                <div className="icon">
                  <InboxIcon />
                </div>
                <div className="iput-container">
                  <input
                    type="text"
                    className="iput"
                    placeholder="Email Address"
                    value={userState?.email}
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
                  className="phone-iput"
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
                  value={phoneWithoutCode}
                  placeholder="Enter Phone Number"
                  onChange={(event) => {
                    event.preventDefault();
                    const value = event.target.value
                    setPhoneWithoutCode(value)
                    updateState('phone', `${phoneCode}${event.target.value}`)
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
                  placeholder="Password"
                  value={userState?.password}
                  onChange={(event) => {
                    event.preventDefault();
                    updateState('password', event.target.value)
                  }}
                />
              </div>
            </div>
          </div>          
          {useType !== "agency" && (
            <div className="field-row">
              <div className={userState?.referral_code ? "filled-field" : "field"}>
                <div className="icon">
                  <ReferralCodeIcon />
                </div>
                <div className="iput-container">
                  <input
                    type="text"
                    className="iput"
                    placeholder="Enter referral code"
                    value={userState?.referral_code}
                    onChange={(event) => {
                      event.preventDefault();
                      updateState('referral_code', event.target.value)
                    }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
        <button className={allowSignUp ? "sign-btn-all-filled sign-up" : "sign-btn sign-up"} onClick={onSubmit}>Sign Up</button>
        <div className="sginup-blk">
          Already have an account?&nbsp;
          <button
            className="signup-btn"
            onClick={() => {
              setAuthStatus("login");
            }}
          >
            Sign In
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
    </>
  );
};
