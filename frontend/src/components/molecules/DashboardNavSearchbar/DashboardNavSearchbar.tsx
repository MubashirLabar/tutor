import React, { useEffect, useState } from "react";
import { createModuleStyleExtractor } from "../../../utils/css";
import { SearchIcon, DropDownIcon } from "../../../assets/svgIcons";
import { Link, useNavigate } from "react-router-dom";

import styles from "./DashboardNavSearchbar.module.scss";
const cx = createModuleStyleExtractor(styles);

export const DashboardNavSearchbar = () => {
  const [openSearchFilter, setOpenSearchFilter] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.body.addEventListener("click", () => {
      setOpenSearchFilter(false);
    });
  }, []);

  return (
    <div className={cx("searchbar-root")}>
      <div className={cx("actions")}>
        <button className={cx("icon_button")}>
          <SearchIcon />
        </button>
        <button
          className={cx(["icon_button", "drop-down"])}
          onClick={(e) => {
            e.stopPropagation();
            setOpenSearchFilter(!openSearchFilter);
          }}
        >
          <DropDownIcon />
        </button>
        <input
          type="text"
          placeholder="Search Courses"
          className={cx("iput")}
        />
        {/* Search Filter */}
        <div className={cx(["search-filter", openSearchFilter ? "open" : ""])}>
          <div className={cx("item")}>Courses</div>
          <div className={cx("item")}>Tutors</div>
          <div
            className={cx("item")}
            onClick={() => {
              navigate("agents", { replace: true });
            }}
          >
            Agents
          </div>
        </div>
      </div>
    </div>
  );
};
