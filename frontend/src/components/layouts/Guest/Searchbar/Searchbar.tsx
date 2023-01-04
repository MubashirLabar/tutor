import React, { useEffect, useState } from "react";
import { createModuleStyleExtractor } from "../../../../utils/css";
import { SearchIcon, DropDownIcon } from "../../../../assets/svgIcons";
import { Link, useNavigate } from "react-router-dom";

import styles from "./Searchbar.module.scss";
const cx = createModuleStyleExtractor(styles);

export const Searchbar = () => {
  const [openSearchFilter, setOpenSearchFilter] = useState(false);
  const navigate = useNavigate();

  const searchFilters = [
    { title: "Courses", to: "" },
    { title: "Tutors", to: "" },
    { title: "Agents", to: "/agents" },
  ];

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
          {searchFilters.map((item, index) => (
            <div
              key={index}
              className={cx("item")}
              onClick={(e) => {
                e.stopPropagation();
                setOpenSearchFilter(false);
              }}
            >
              <Link to={item.to}>{item.title}</Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
