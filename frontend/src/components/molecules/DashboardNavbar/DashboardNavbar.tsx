import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { removeLocalStorageToken } from "../../../services/token.service";
import { useDispatch, useSelector } from "../../../stores/rootReducer";
import { sidebarOpen } from "./../../../stores/layouts";
import { sidebarState } from "./../../../stores/layouts/selectors";
import { fetchCurrentRole } from "../../../stores/users/selectors";
import { createModuleStyleExtractor } from "../../../utils/css";
import { doLogoutUser } from "../../../stores/users";
import { noop } from "../../../utils/noop";
import { DashboardNavSearchbar } from "../DashboardNavSearchbar/DashboardNavSearchbar";
import { BellIcon, DropDownIcon, SearchIcon } from "../../../assets/svgIcons";

import styles from "./DashboardNavbar.module.scss";
import { IDashboardNavbarLink } from "../../../types/link";
import { dashboardNavLinks } from ".";
import { useUser } from "../../../hooks/useUser";
import LanguageBar from "../../helpers/LanguageBar/languageBar";

const cx = createModuleStyleExtractor(styles);

export const DashboardNavbar = () => {
  const user = useUser();
  const dispatch = useDispatch();
  const role = useSelector((store) => fetchCurrentRole(store));
  const [openSearchbar, setOpenSearchbar] = useState(false);

  useEffect(() => {
    console.log({ realUser: user });
  }, [user]);

  const _logout = () => {
    removeLocalStorageToken();
    dispatch(doLogoutUser());
  };
  // useEffect(() => {
  //   if (user) return;
  //   dispatch(doFetchUser());
  // }, []);

  const logoutLink: IDashboardNavbarLink = {
    title: "Logout",
    to: "#",
    onClick: _logout,
  };

  const navbarLinks = () => {
    if (role === "Student")
      return dashboardNavLinks.students.concat(logoutLink);
    if (role === "Agent") return dashboardNavLinks.agents.concat(logoutLink);
    return dashboardNavLinks.support.concat(logoutLink);
  };

  const [backgroundImage, setBackgroundImage] = useState<string>(
    user?.image_path ||
      "https://avatars.mds.yandex.net/i?id=2a00000179f005d083eb0b8a38ae95ba4d6f-4443391-images-thumbs&ref=rim&n=33&w=300&h=300"
  );

  useEffect(() => {
    if (user) {
      if (user.image_path) {
        setBackgroundImage(user.image_path);
      }
    }
  }, [user]);
  return (
    <>
      <div className={cx("Header--Root")}>
        <div className={cx(["wrapper", "app-padding"])}>
          <div className={cx(["left", openSearchbar ? "hide" : "show"])}>
            <div
              className={cx("hamburger-lines")}
              onClick={(e) => {
                e.stopPropagation();
                dispatch(sidebarOpen());
              }}
            >
              <span className={cx(["line", "line1"])}></span>
              <span className={cx(["line", "line2"])}></span>
              <span className={cx(["line", "line3"])}></span>
            </div>
            <Link to="/dashboard" className={cx("page-title")}>
              Dashboard
            </Link>
          </div>
          <div className={cx(["right"])}>
            <div
              className={cx(["search", openSearchbar ? "open" : "hide-search"])}
            >
              <DashboardNavSearchbar />
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
            <div className={cx("notification")}>
              <div className={cx("icon")}>
                <BellIcon />
              </div>
            </div>

            <div className={cx("user")}>
              {user && (
                <img
                  id="profile-pic"
                  className={cx("user_profile_dp")}
                  data-holder-rendered="true"
                  src={backgroundImage}
                  alt="profile-pic"
                />
              )}
              <div className={cx("name")}>
                {user && user.first_name
                  ? user.first_name.charAt(0).toUpperCase() +
                    user.first_name.substring(1)
                  : user && user.full_name
                  ? user.full_name.charAt(0).toUpperCase() +
                    user.full_name.substring(1)
                  : ""}

                {/*{user &&
                  `${user.first_name
                    ?.charAt(0)
                    .toUpperCase()}${user.first_name?.substring(1)}`}*/}
              </div>
              <button className={cx("drop-btn")}>
                <DropDownIcon />
                <div className={cx("drop-down-nav")}>
                  {navbarLinks().map((item, index) => (
                    <Link
                      key={index}
                      className={cx("nav-link")}
                      to={`${item.to ?? ""}`}
                      onClick={item.title === "Logout" ? _logout : noop}
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              </button>
              <div className={cx("languageBar")}>
                <LanguageBar />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={cx("Header--Root-Clean")} />
    </>
  );
};
