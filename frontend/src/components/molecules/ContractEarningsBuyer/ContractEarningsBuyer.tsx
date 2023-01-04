import React, { useState } from "react";
import { createModuleStyleExtractor } from "../../../utils/css";
import styles from "./ContractEarningsBuyer.module.scss";

const cx = createModuleStyleExtractor(styles);

export function ContractEarningsBuyer() {
  const earningsSummary = [
    { label: "Budget", value: "920.00" },
    { label: "In Escrow", value: "920.00" },
    { label: "Milestones Paid", value: "100.00" },
    { label: "Remaining", value: "820.00" },
    { label: "Total Earnings", value: "100.00" },
  ];

  return (
    <div className={cx("earnings-section")}>
      <div className={cx("earnings-summary")}>
        {earningsSummary.map((item, index) => (
          <div key={index} className={cx(["block"])}>
            <div className={cx("label")}>{item.label}</div>
            <div className={cx("value")}>{`$${item.value}`}</div>
          </div>
        ))}
      </div>
      <div className={cx("remaining-milestone")}>
        <div className={cx("label")}>Remaining Milestones</div>
        <button className={cx("edit-btn")}>Edit Milestones</button>
      </div>
      <div className={cx("next-milestones")}>
        <div className={cx("meta")}>
          <div className={cx("label")}>Second Milestones</div>
          <div className={cx("amount-blk")}>
            <div className={cx("amount")}>$400.00</div>
            <div className={cx("status")}>(Funded)</div>
          </div>
        </div>
        <div className={cx("submit-work")}>Pay Now</div>
      </div>
    </div>
  );
}
