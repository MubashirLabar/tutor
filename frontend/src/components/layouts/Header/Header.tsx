import React from "react";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "../../../stores/rootReducer";
import { sidebarCLose, sidebarOpen } from "../../../stores/layouts";
import { sidebarState } from "../../../stores/layouts/selectors";
import { createModuleStyleExtractor } from "../../../utils/css";

import styles from "./Header.module.scss";
const cx = createModuleStyleExtractor(styles);

export const Header = () => {
  const dispatch = useDispatch();
  const sidebar = useSelector(sidebarState);

  const toggleSidebar = React.useCallback(
    (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      e.preventDefault();
      if (sidebar) {
        dispatch(sidebarCLose());
      } else {
        dispatch(sidebarOpen());
      }
    },
    [sidebar]
  );

  return (
    <div className={cx("Header--Root")}>
      <div className={cx("header__logo")}>
        <Link
          onClick={toggleSidebar}
          className={cx("logo__link", {}, [])}
          to="/"
        >
          <span className={cx("logo")}>Read.</span>
          <i className={cx("mobile__logo", {}, ["fa fas fa-bars"])}></i>
        </Link>
      </div>
      <div className={cx("header__auth__links")}>
        <Link className={cx("link")} to="#">
          {" "}
          Homework help{" "}
        </Link>
        <Link className={cx("link")} to="#">
          {" "}
          Online tutoring{" "}
        </Link>
        <Link className={cx("link")} to="agents/profiles">
          {" "}
          Browse tutors{" "}
        </Link>
        <Link className={cx("link")} to="#">
          {" "}
          Our story{" "}
        </Link>
      </div>
      <div className={cx("header__auth__action")}>
        <Link className={cx("link")} to="/auth?action=login">
          Login
        </Link>
        <span className={cx("seprator")}>|</span>
        <Link className={cx("link")} to="/auth?action=register">
          Register
        </Link>
      </div>
    </div>
  );
};
