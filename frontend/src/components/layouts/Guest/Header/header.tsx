import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../../hooks/useAuth";
import { useInitApp } from "../../../../hooks/useInitApp";
import { useUser } from "../../../../hooks/useUser";
import {
  selectGraduateSchools,
  selectJuniorSchools,
  selectUndergraduateSchools,
} from "../../../../stores/layouts/selectors";
import { useSelector } from "../../../../stores/rootReducer";
import { currentUserInfo } from "../../../../stores/users";
import { createPascelCaseName } from "../../../../utils/common";
import { SearchIcon, DropDownIcon } from "../../../../assets/svgIcons";
import { Searchbar } from "../Searchbar/Searchbar";
import LanguageBar from "../../../helpers/LanguageBar/languageBar";

import { createModuleStyleExtractor } from "../../../../utils/css";
import styles from "./header.module.scss";
const cx = createModuleStyleExtractor(styles);

export const Header = () => {
  const { token } = useAuth();
  const user = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const { tests } = useInitApp();
  const [openSearchFilter, setOpenSearchFilter] = useState(false);
  const [openSubLink, setOpenSubLink] = useState("");
  const [openSearchbar, setOpenSearchbar] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);

  const graduate_schools = useSelector((store) => selectGraduateSchools(store));
  const undergraduate_schools = useSelector((store) =>
    selectUndergraduateSchools(store)
  );
  const junior_schools = useSelector((store) => selectJuniorSchools(store));
  useEffect(() => {
    console.log({ userChanged: user });
  }, [user]);

  useEffect(() => {
    console.log({ tokenChanged: token });
  }, [token]);

  const toplinks = [
    {
      title: "Free Ebooks",
      to: "",
    },

    {
      title: "24/7 Homework Help",
      to: "/new-order",
    },
    {
      title: "24/7 Free college conseling service",
      to: "",
    },
    {
      title: " About Us",
      to: "",
    },
  ];

  const bottomlinks = [
    {
      title: "Self Learning",
      to: "self-learning",
    },
    {
      title: "Education News",
      to: "",
    },
    {
      title: "Student’s Social Forum",
      to: "",
    },
    {
      title: "FAQ",
      to: "",
    },
  ];

  useEffect(() => {
    document.body.addEventListener("click", () => {
      setOpenSearchFilter(false);
      setOpenSubLink("");
      setOpenSidebar(false);
    });
  }, []);

  console.log({ user });
  return (
    <>
      <div className={cx(["sidebar-overlay", openSidebar ? "show" : "hide"])} />
      <div className={cx(["public-header", openSidebar ? "open-sidebar" : ""])}>
        <div className={cx(["header-wrapper"])}>
          <div className={cx("header-main-row")}>
            <Link to="/" className={cx("logo")}>
              Read.
            </Link>
            <div className={cx(["main-row-wrap", "main-app-width"])}>
              <div className={cx("nav")}>
                {toplinks.map((link, index) => (
                  <Link key={index} to={link.to} className={cx("link")}>
                    {link.title}
                  </Link>
                ))}
              </div>
              <div className={cx("search-bar")}>
                <Searchbar />
              </div>
            </div>
            {!token ? (
              <>
                <Link to="/new-auth">
                  <span className={cx("sign-btn")}>Sign In</span>
                </Link>
              </>
            ) : (
              <>
                <Link to="/dashboard" className={cx("sign-btn")}>
                  {user && user.first_name
                    ? user.first_name.charAt(0).toUpperCase() +
                      user.first_name.substring(1)
                    : user && user.full_name
                    ? user.full_name.charAt(0).toUpperCase() +
                      user.full_name.substring(1)
                    : "Dashboard"}
                </Link>
              </>
            )}
            <div className={cx("languageBar")}>
              <LanguageBar />
            </div>
          </div>
          <div className={cx(["header-sub-row", "main-app-width"])}>
            <div className={cx("bottom-nav")}>
              {/* Graduation Schools */}
              <button
                className={cx("link")}
                onClick={(e) => {
                  e.stopPropagation();
                  if (openSubLink !== "Graduation Schools") {
                    setOpenSubLink("Graduation Schools");
                  } else {
                    setOpenSubLink("");
                  }
                }}
              >
                Graduation Schools
                {
                  <>
                    <div className={cx("icon")}>
                      <i
                        className={`anim 
                          ${
                            openSubLink === "Graduation Schools"
                              ? "fa fa-caret-up"
                              : "fa fa-caret-down"
                          }`}
                      />
                    </div>
                    <div
                      className={cx([
                        "sub-links",
                        openSubLink === "Graduation Schools" ? "open" : "",
                      ])}
                    >
                      {graduate_schools?.map((item, index) => (
                        <Link key={index} to="" className={cx("item")}>
                          {item.country}
                        </Link>
                      ))}
                    </div>
                  </>
                }
              </button>

              {/* Undergradate */}
              <button
                className={cx("link")}
                onClick={(e) => {
                  e.stopPropagation();
                  if (openSubLink !== "Undergradate") {
                    setOpenSubLink("Undergradate");
                  } else {
                    setOpenSubLink("");
                  }
                }}
              >
                Undergradate
                {
                  <>
                    <div className={cx("icon")}>
                      <i
                        className={`anim 
                          ${
                            openSubLink === "Undergradate"
                              ? "fa fa-caret-up"
                              : "fa fa-caret-down"
                          }`}
                      />
                    </div>
                    <div
                      className={cx([
                        "sub-links",
                        openSubLink === "Undergradate" ? "open" : "",
                      ])}
                    >
                      {undergraduate_schools?.map((item, index) => (
                        <Link key={index} to="" className={cx("item")}>
                          {item.country}
                        </Link>
                      ))}
                    </div>
                  </>
                }
              </button>

              {/* Junior Transfer */}
              <button
                className={cx("link")}
                onClick={(e) => {
                  e.stopPropagation();
                  if (openSubLink !== "Junior Transfer") {
                    setOpenSubLink("Junior Transfer");
                  } else {
                    setOpenSubLink("");
                  }
                }}
              >
                Junior Transfer
                {
                  <>
                    <div className={cx("icon")}>
                      <i
                        className={`anim 
                          ${
                            openSubLink === "Junior Transfer"
                              ? "fa fa-caret-up"
                              : "fa fa-caret-down"
                          }`}
                      />
                    </div>
                    <div
                      className={cx([
                        "sub-links",
                        openSubLink === "Junior Transfer" ? "open" : "",
                      ])}
                    >
                      {junior_schools?.map((item, index) => (
                        <Link key={index} to="" className={cx("item")}>
                          {item.country}
                        </Link>
                      ))}
                    </div>
                  </>
                }
              </button>

              {/* Standardized Tests */}
              <button
                className={cx("link")}
                onClick={(e) => {
                  e.stopPropagation();
                  if (openSubLink !== "Standardized Tests") {
                    setOpenSubLink("Standardized Tests");
                  } else {
                    setOpenSubLink("");
                  }
                }}
              >
                Standardized Tests
                {
                  <>
                    <div className={cx("icon")}>
                      <i
                        className={`anim 
                          ${
                            openSubLink === "Standardized Tests"
                              ? "fa fa-caret-up"
                              : "fa fa-caret-down"
                          }`}
                      />
                    </div>
                    <div
                      className={cx([
                        "sub-links",
                        openSubLink === "Standardized Tests" ? "open" : "",
                      ])}
                    >
                      {tests?.map((item, index) => (
                        <Link key={index} to="" className={cx("item")}>
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </>
                }
              </button>

              {bottomlinks.map((link, index) => (
                <Link key={index} to={link.to} className={cx("link")}>
                  {link.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Small Screen Header */}
      <div className={cx("small-header")}>
        <div className={cx(["wrap", "main-app-width"])}>
          <div className={cx(["left", openSearchbar ? "hide" : "show"])}>
            <div
              className={cx("hamburger-lines")}
              onClick={(e) => {
                e.stopPropagation();
                setOpenSidebar(true);
              }}
            >
              <span className={cx(["line", "line1"])}></span>
              <span className={cx(["line", "line2"])}></span>
              <span className={cx(["line", "line3"])}></span>
            </div>
          </div>
          <div className={cx("right")}>
            <div
              className={cx(["search", openSearchbar ? "open" : "hide-search"])}
            >
              <Searchbar />
            </div>
            <button
              className={cx("search-btn")}
              onClick={() => setOpenSearchbar(!openSearchbar)}
            >
              {!openSearchbar ? (
                <SearchIcon />
              ) : (
                <div className={cx("search-close-btn")}>&times;</div>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
