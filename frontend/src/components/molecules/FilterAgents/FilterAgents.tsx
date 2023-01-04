import React, { useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import { createModuleStyleExtractor } from "../../../utils/css";
import { Modal } from "../Modal";
import styles from "./FilterAgents.module.scss";
const cx = createModuleStyleExtractor(styles);

export const FilterAgents = () => {
  const [toggle, setToggle] = useState<boolean>(true);
  const [show, setIsShow] = useState<boolean>(false);

  const BuildCategoriesList = () => {
    const categories = [
      "Accounting",
      "Admin Support",
      "Design & Creative",
      "Marketing",
    ];
    return (
      <>
        {categories.map((item, index) => (
          <div key={index} className={cx("filter-agents-container__list-item")}>
            <button
              className={cx("filter-agents-container__list-item__button")}
            >
              {" "}
              {item}{" "}
            </button>
          </div>
        ))}
      </>
    );
  };
  return (
    <div className={cx("filter-agents-container")}>
      <div className={cx("filter-agents-container_heading")}>
        <span>Filter By</span>
        <span className={cx("filter-agents-container__divider")}></span>
      </div>

      <div className={cx("filter-agents-container_categories")}>
        <div className={cx("filter-agents-container_categories-label")}>
          <div
            className={cx("filter-agents-container_categories-label-heading")}
          >
            <span
              className={cx(
                "filter-agents-container_categories-label-heading-desktop"
              )}
            >
              Category
            </span>
            <span
              onClick={() => setIsShow(!show)}
              className={cx(
                "filter-agents-container_categories-label-heading-mobile"
              )}
            >
              Choose Category
            </span>
          </div>
          <div className={cx("filter-agents-selector-wrapper")}>
            <span
              onClick={() => setToggle(!toggle)}
              className={cx("filter-agents-selector")}
            >
              {" "}
              {toggle ? (
                <i className="fa fa-angle-up"></i>
              ) : (
                <i className="fa fa-angle-down"></i>
              )}
            </span>
          </div>
        </div>
      </div>
      <div className={cx("filter-agents-container__list-modal")}>
        {show && (
          <Modal onClose={() => setIsShow(!show)}>
            <BuildCategoriesList />
          </Modal>
        )}
      </div>

      <div className={cx("filter-agents-container__list")}>
        {toggle && <BuildCategoriesList />}
      </div>
    </div>
  );
};
