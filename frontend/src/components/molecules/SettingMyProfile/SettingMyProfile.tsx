import React, { useState, useEffect } from "react";
import { createModuleStyleExtractor } from "../../../utils/css";
import {
  DashboardIcon,
  DropDownIcon,
  EditIcon,
} from "../../../assets/svgIcons";
import { Modal } from "../../atoms/Modal";

import styles from "./settingMyProfile.module.scss";
const cx = createModuleStyleExtractor(styles);

export const SettingMyProfile = () => {
  const [openCategoriesModal, setOpenCategoriesModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("business");
  const [categories, setOpenCategories] = useState([
    {
      label: "Business",
      value: "business",
    },
    {
      label: "Computer science",
      value: "computer-science",
    },
    {
      label: "Statistics",
      value: "statistics",
    },
    {
      label: "English",
      value: "humanities",
    },
    {
      label: "Engineering",
      value: "engineering",
    },
    {
      label: "Math",
      value: "math",
    },
    {
      label: "Category",
      value: "category",
    },
    {
      label: "Category",
      value: "category",
    },
  ]);

  const handleCloseCategories = () => {
    setOpenCategoriesModal(false);
  };

  return (
    <>
      <div className={cx("setting-contact-info")}>
        {/* My Profile Block */}
        <div className={cx("info-block")}>
          <div className={cx("block-hdr")}>
            <div className={cx("hdr-title")}>My Profile</div>
          </div>
          <div className={cx("info-wrapper")}>
            <div className={cx("setting-form")}>
              <div className={cx("field")}>
                <div className={cx("lbl")}>Visibility</div>
                <input type="text" className={cx("iput")} />
              </div>
              <div className={cx("field")}>
                <div className={cx("lbl")}>Earning Privacy</div>
                <input type="text" className={cx("iput")} />
              </div>
            </div>
          </div>
        </div>

        {/* Categories Block */}
        <div className={cx("info-block")}>
          <div className={cx("block-hdr")}>
            <div className={cx("hdr-title")}>Categories</div>
            <button
              className={cx("edit-btn")}
              onClick={() => setOpenCategoriesModal(true)}
            >
              <EditIcon />
            </button>
          </div>
          <div className={cx("info-wrapper")}>
            <div className={cx("info-row")}>
              <div className={cx("item")}>
                <div className={cx(["lbl"])}>Humanities</div>
                <div className={cx("txt")}>Literature</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal open={openCategoriesModal} onClose={handleCloseCategories}>
        <div className={cx("categories-modal")}>
          <div className={cx("modal-hdr")}>
            <div className={cx("modal-title")}>Change Password</div>
            <div
              className={cx("modal-cross-btn")}
              onClick={handleCloseCategories}
            >
              &times;
            </div>
          </div>
          <div className={cx("modal-content")}>
            {categories.map((category, index) => (
              <div key={index} className={cx("block")}>
                <div className={cx("block-hdr")}>
                  <div className={cx("label")}>{category.label}</div>
                  <div className={cx("icon")}>
                    <DropDownIcon />
                  </div>
                  {/* <div className={cx("block-content")}>
                    <div className={cx("humanities")}>
                      <div className={cx("item")}>ACT English</div>
                    </div>
                  </div> */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Modal>
    </>
  );
};
