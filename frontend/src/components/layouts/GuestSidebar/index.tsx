import React from "react";
import { NavLink } from "react-router-dom";

// import { removeLocalStorageToken } from "../../../services/token.service";
import { useSelector } from "../../../stores/rootReducer";
import { sidebarState } from "./../../../stores/layouts/selectors";
// import { fetchCurrentRole } from "../../../stores/users/selectors";
import { createModuleStyleExtractor } from "../../../utils/css";
// import { doLogoutUser } from "../../../stores/users";
// import { noop } from "../../../utils/noop";

import styles from "./GuestSidebar.module.scss";
const cx = createModuleStyleExtractor(styles);

export const GuestSidebar = () => {
  const sidebar = useSelector(sidebarState);

  const guest_links = [
    {
      title: "Home",
      to: "/auth/dashboard",
    },
    {
      title: "Homework help",
      to: "agents",
    },
    {
      title: "Online tutoring",
      to: "xyz",
    },
    {
      title: "Browse tutors",
      to: "xyz",
    },
    {
      title: "Our story",
      to: "xyz",
    },
    {
      title: "Login / Signup",
      to: "/auth",
    },
  ];

  return (
    <nav className={cx("Guest__sidebar--Root", { mobile__open: sidebar })}>
      <ul className={cx("sidebar__links")}>
        {guest_links.map((link, index) => (
          <li key={index}>
            <NavLink
              className={({ isActive }) => cx("link__container", { isActive })}
              to={`${link.to ?? ""}`}
            >
              {/* <i className={cx("link-icon", {}, [link.iconClass])}></i> */}
              <span className={cx("link-text", {}, [])}>{link.title}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
