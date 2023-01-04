import React, { useState } from "react";
import { MoreIcon2 } from "../../../assets/svgIcons";
import { createModuleStyleExtractor } from "../../../utils/css";
import { ContractEarnings } from "../../molecules/ContractEarnings/ContractEarnings";
import { ContractFeedback } from "../../molecules/ContractFeedback/ContractFeedback";
import { ContractTerms } from "../../molecules/ContractTerms/ContractTerms";
import styles from "./ContractDetailSeller.module.scss";

const cx = createModuleStyleExtractor(styles);

export function ContractDetailSeller() {
  const [activeTab, setActiveTab] = useState("earnings");
  const tabs = [
    { label: "Earnings", value: "earnings" },
    { label: "Messages", value: "messages" },
    { label: "Terms & Settings", value: "terms-settings" },
    { label: "Feedback", value: "feedback" },
  ];

  return (
    <div className={cx("contract-page")}>
      <div className={cx(["wrapper", "main-app-width"])}>
        <div className={cx("page-hdr")}>
          <div className={cx("left-side")}>
            <div className={cx("title")}>
              Need designer for Tutoring platform Need designer for Tutoring
              platform
            </div>
            <div className={cx("stamp")}>Active since Jan 23, 2022</div>
          </div>
          <div className={cx("right-side")}>
            <div className={cx("user-info")}>
              <div className={cx("user_dp-blk")}>
                <div
                  className={cx("user-dp")}
                  style={{
                    backgroundImage: `url(${"/assets/images/profile.png"})`,
                  }}
                />
                <div className={cx("online-dot")} />
              </div>
              <div className={cx("meta")}>
                <div className={cx("name")}>Brandon Lipshutz</div>
                <div className={cx("stamp")}>
                  Texas, Austin USA - 10:00 am local time
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={cx("tab-bar")}>
          <div className={cx("nav")}>
            {tabs.map((item, index) => (
              <div
                key={index}
                className={cx([
                  "item",
                  activeTab === item.value ? "active" : "",
                ])}
                onClick={() => setActiveTab(item.value)}
              >
                {item.label}
              </div>
            ))}
            <div className={cx("menu-btn")}>
              <MoreIcon2 />
            </div>
          </div>
        </div>

        {/* Contract Page Content */}
        <div className={cx("contract-contents")}>
          {activeTab === "earnings" && <ContractEarnings />}
          {activeTab === "messages" && <div>Messenger....</div>}
          {activeTab === "terms-settings" && <ContractTerms />}
          {activeTab === "feedback" && <ContractFeedback />}
        </div>
      </div>
    </div>
  );
}
