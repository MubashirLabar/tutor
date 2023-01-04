import React, { useState, useEffect } from "react";
import styles from "./settings.module.scss";
import { createModuleStyleExtractor } from "../../../utils/css";
const cx = createModuleStyleExtractor(styles);
import { DropDownIcon } from "../../../assets/svgIcons";

// Setting Tabs
import { SettingContactInfo } from "../../molecules/SettingContactInfo/SettingContactInfo";
import { SettingTextInformation } from "../../molecules/SettingTextInformation/SettingTextInformation";
import { SettingPasswordSecurity } from "../../molecules/SettingPasswordSecurity/SettingPasswordSecurity";
import { SettingMyProfile } from "../../molecules/SettingMyProfile/SettingMyProfile";
import { useSelector } from "../../../stores/rootReducer";
import { currentAlertState } from "../../../stores/alert/selectors";
import Alert from "../../atoms/Alert/Alert";

export const Settings = () => {
  const [activeTab, setActiveTab] = useState("contact-info");
  const { active, type, message } = useSelector(currentAlertState);

  const [dropTabSelector, setDropTabSelector] = useState(false);
  const settingTabs = [
    { label: "Contact Info", slug: "contact-info" },
    { label: "Tax Information", slug: "tax-information" },
    { label: "My Profile", slug: "my-profile" },
    { label: "Profile Settings", slug: "profile-settings" },
    { label: "Password & Security", slug: "password-security" },
    { label: "Notification Settings", slug: "notification-settings" },
  ];

  useEffect(() => {
    document.body.addEventListener("click", () => {
      setDropTabSelector(false);
    });
  }, []);

  return (
    <div className={cx("setting-root")}>
      {active && <Alert type={type} message={message} />}
      <div className={cx(["wrapper", "app-padding"])}>
        {/* Setting Tabs */}
        <div className={cx("setting-tabs")}>
          <div className={cx("title")}>User Settings</div>
          <div className={cx("tabs")}>
            {settingTabs.map((tab, index) => (
              <div
                key={index}
                className={cx(["tab", activeTab === tab.slug ? "active" : ""])}
                onClick={() => setActiveTab(tab.slug)}
              >
                {tab.label}
              </div>
            ))}
          </div>
          <button
            className={cx("custom-selector")}
            onClick={(e) => {
              e.stopPropagation();
              setDropTabSelector(!dropTabSelector);
            }}
          >
            {settingTabs.map(
              (tab, index) =>
                activeTab == tab.slug && (
                  <div className={cx("selector-input")} key={index.toString()}>
                    <div className={cx("selected-text")}>{tab.label}</div>
                    <div className={cx("arrow-icon")}>
                      <DropDownIcon />
                    </div>
                  </div>
                )
            )}
            {dropTabSelector && (
              <div className={cx("selector-options")}>
                {settingTabs.map((tab, index) => (
                  <button
                    key={index}
                    className={cx("selector-option-item")}
                    onClick={() => {
                      setActiveTab(tab.slug);
                    }}
                  >
                    <div className={cx("option-item-txt")}>{tab.label}</div>
                  </button>
                ))}
              </div>
            )}
          </button>
        </div>

        {/* Tab Content */}
        <div className={cx(["setting-content", "flex flex-col"])}>
          {activeTab === "contact-info" && <SettingContactInfo />}
          {activeTab === "tax-information" && <SettingTextInformation />}
          {activeTab === "password-security" && <SettingPasswordSecurity />}
          {activeTab === "my-profile" && <SettingMyProfile />}
        </div>
      </div>
    </div>
  );
};
