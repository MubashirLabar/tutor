import React, { useState } from "react";
import { createModuleStyleExtractor } from "../../../utils/css";
import { EditIcon, PlusIcon } from "../../../assets/svgIcons";

import styles from "./settingTextInformation.module.scss";
const cx = createModuleStyleExtractor(styles);

export const SettingTextInformation = () => {
  const [textResidenceSetting, setTextResidenceSetting] = useState(false);
  return (
    <div className={cx("setting-text-information")}>
      {/* Tax Residence Block */}
      <div className={cx("info-block")}>
        <div className={cx("block-hdr")}>
          <div className={cx("hdr-title")}>Tax Residence</div>
          {!textResidenceSetting && (
            <button
              className={cx(["edit-btn", "add-btn"])}
              onClick={() => setTextResidenceSetting(true)}
            >
              <PlusIcon />
            </button>
          )}
        </div>
        <div className={cx("info-wrapper")}>
          {textResidenceSetting ? (
            <div className={cx("setting-form")}>
              <div className={cx("field")}>
                <div className={cx("lbl")}>
                  This address will be displayed on invoices.
                </div>
              </div>
              <div className={cx("field")}>
                <div className={cx("lbl")}>Country</div>
                <input
                  type="text"
                  className={cx("iput")}
                  placeholder="Country"
                />
              </div>
              <div className={cx("field")}>
                <div className={cx("lbl")}>Street Address</div>
                <input
                  type="text"
                  className={cx("iput")}
                  placeholder="Street Address"
                />
              </div>
              <div className={cx("field")}>
                <div className={cx("lbl")}>City</div>
                <input type="text" className={cx("iput")} placeholder="City" />
              </div>
              <div className={cx("field")}>
                <div className={cx("lbl")}>Zip/Postal Code</div>
                <input
                  type="text"
                  className={cx("iput")}
                  placeholder="Zip/Postal Code"
                />
              </div>
              <div className={cx("actions")}>
                <div
                  className={cx("action-btn")}
                  onClick={() => setTextResidenceSetting(false)}
                >
                  Save
                </div>
                <div
                  className={cx(["action-btn", "transparent"])}
                  onClick={() => setTextResidenceSetting(false)}
                >
                  Cancel
                </div>
              </div>
            </div>
          ) : (
            <div className={cx("info-row")}>
              <div className={cx("info-row-col")}>
                <div className={cx("item")}>
                  <div className={cx("lbl")}>
                    This address will be displayed on invoices.
                  </div>
                  <div className={cx("txt")}>—</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* W-8BEN Block */}
      <div className={cx("info-block")}>
        <div className={cx("block-hdr")}>
          <div className={cx("hdr-title")}>W-8BEN</div>
          <button className={cx("edit-btn")}>
            <EditIcon />
          </button>
        </div>
        <div className={cx("info-wrapper")}>
          <div className={cx("info-row")}>
            <div className={cx("info-row-col")}>
              <div className={cx("item")}>
                <div className={cx("lbl")}>
                  Before withdrawing funds, all non-U.S. persons must provide
                  their W-8BEN tax information.
                </div>
              </div>
            </div>
            <div className={cx("info-row-col")}>
              <div className={cx("item")}>
                <div className={cx("lbl")}>Legal Name of Taxpayer</div>
                <div className={cx("txt")}>Brandon Lipshutz</div>
              </div>
            </div>
            <div className={cx("info-row-col")}>
              <div className={cx("item")}>
                <div className={cx("lbl")}>Federal Tax Classification</div>
                <div className={cx("txt")}>N/A - Non-US</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
