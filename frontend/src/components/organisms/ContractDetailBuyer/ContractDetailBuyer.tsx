import React, { useState, useEffect } from "react";
import { MoreIcon2 } from "../../../assets/svgIcons";
import { createModuleStyleExtractor } from "../../../utils/css";
import { ContractEarningsBuyer } from "../../molecules/ContractEarningsBuyer/ContractEarningsBuyer";
import { ContractFeedbackBuyer } from "../../molecules/ContractFeedbackBuyer/ContractFeedbackBuyer";
import { ContractTermsBuyer } from "../../molecules/ContractTermsBuyer/ContractTermsBuyer";
import styles from "./ContractDetailBuyer.module.scss";

const cx = createModuleStyleExtractor(styles);

export function ContractDetailBuyer() {
  const [activeTab, setActiveTab] = useState("earnings");
  const [openMore, setOpenMore] = useState(false);
  const tabs = [
    { label: "Earnings", value: "earnings" },
    { label: "Messages", value: "messages" },
    { label: "Terms & Settings", value: "terms-settings" },
    { label: "Feedback", value: "feedback" },
  ];

  const moreLinks = [
    { title: "View original order", slug: "" },
    { title: "Start an hourly contract", slug: "" },
  ];

  useEffect(() => {
    document.body.addEventListener("click", () => {
      setOpenMore(false);
    });
  }, []);

  return (
    <div className={cx("contract-detail-buyer")}>
      <div className={cx(["wrapper", "main-app-width"])}>
        <div className={cx("page-hdr")}>
          <div className={cx("page-title")}>
            Need Tik Tok Conversion API set up
          </div>
        </div>
        <div className={cx("edux-blk")}>
          <div className={cx("left-side")}>
            <div className={cx("user-info")}>
              <div className={cx("user_dp-blk")}>
                <div
                  className={cx("user-dp")}
                  style={{
                    backgroundImage: `url(${"/assets/images/avatar.png"})`,
                  }}
                />
              </div>
              <div className={cx("meta")}>
                <div className={cx("name")}>Edux Tech</div>
                <div className={cx("stamp")}>
                  Texas, Austin USA - 10:00 am local time
                </div>
              </div>
            </div>
          </div>
          <div className={cx("right-side")}>
            <button className={cx(["action-btn"])}>Pay Now</button>
            <button className={cx(["action-btn", "transparent"])}>
              Give Bonus
            </button>
            <button className={cx(["action-btn", "transparent"])}>
              Cancel Contract
            </button>
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
            <div
              className={cx("menu-btn")}
              onClick={(e) => {
                e.stopPropagation();
                setOpenMore(!openMore);
              }}
            >
              <MoreIcon2 />
              <div className={cx(["more-links", openMore ? "show" : "hide"])}>
                {moreLinks.map((link, index) => (
                  <div key={index} className={cx("link")}>
                    {link.title}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Contract Page Content */}
        <div className={cx("contract-contents")}>
          {activeTab === "earnings" && <ContractEarningsBuyer />}
          {activeTab === "messages" && <div>Messenger....</div>}
          {activeTab === "terms-settings" && <ContractTermsBuyer />}
          {activeTab === "feedback" && <ContractFeedbackBuyer />}
        </div>
      </div>
    </div>
  );
}
