import React, { useEffect, useState } from "react";
import TimezoneSelect from "react-timezone-select";
import DatePicker from "react-modern-calendar-datepicker";
import {
  DropDownIcon,
  CalenderIcon,
  TimeIcon,
} from "../../../../assets/svgIcons";
import { createModuleStyleExtractor } from "../../../../utils/css";
import { IBudgetDeadline } from "..";
import styles from "./Budget.module.scss";
const cx = createModuleStyleExtractor(styles);

export function Budget() {
  return (
    <div className={cx("budget-detail-form")}>
      <div className={cx(["wrapper", "main-app-width"])}>
        <div className={cx("content")}>
          <div className={cx("title")}>Tell Your Budget</div>
          <div className={cx("text")}>
            You’re protected by{" "}
            <span className={cx("color")}>EDUX payment protection.</span> Only
            pay for the work you authorize.
          </div>
          <div className={cx("form")}>
            <div className={cx("budget-field")}>
              <div className={cx("lbl")}>Your Desired Budget</div>
              <div className={cx("field")}>
                <div className={cx("sign")}>$</div>
                <input
                  type="text"
                  className={cx("iput")}
                  placeholder="Ex 400"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
