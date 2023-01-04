import React from "react";
import { NavLink, Link } from "react-router-dom";

import { removeLocalStorageToken } from "../../../services/token.service";
import { useDispatch, useSelector } from "../../../stores/rootReducer";
import { sidebarState } from "./../../../stores/layouts/selectors";
import { fetchCurrentRole } from "../../../stores/users/selectors";
import { IDashboardSidebarLink } from "../../../types/link";
import { createModuleStyleExtractor } from "../../../utils/css";
import { doLogoutUser } from "../../../stores/users";
import { noop } from "../../../utils/noop";
import { sidebarLinks } from ".";
// Icons
import {
  DashboardIcon,
  QuestionIcon,
  OrderIcon,
  UsersIcon,
  InboxIcon,
  ReferralIcon,
  HelpIcon,
  SettingIcon2,
  LogoutIcon,
  BellIcon,
  ContactIcon,
  VideosIcon,
  CoursesIcon,
} from "../../../assets/svgIcons";
import styles from "./DashboardSidebar.module.scss";
import { useUser } from "../../../hooks/useUser";
const cx = createModuleStyleExtractor(styles);

export const DashboardSidebar = () => {
  const dispatch = useDispatch();
  const sidebar = useSelector(sidebarState);
  const user = useUser();

  const role = useSelector((store) => fetchCurrentRole(store));

  /* logout user */
  const _logout = () => {
    removeLocalStorageToken();
    dispatch(doLogoutUser());
  };

  const conditionalLinks = () => {
    if (role === "Student") {
      return [
        {
          label: "Agents",
          slug: "agents",
          icon: <UsersIcon />,
          icon_name: "agents",
        },
      ];
    }
    if (role === "Agent") {
      return [
        // {
        //   label: "Users",
        //   slug: "users",
        //   icon: <DashboardIcon />,
        //   icon_name: "users",
        // },
        {
          label: "Profile",
          slug: `${user ? `agents/${user.agentProfile?._id}` : "agents/"}`,
          icon: <ReferralIcon />,
          icon_name: "profile",
        },

        {
          label: "Referrals",
          slug: "referrals",
          icon: <ReferralIcon />,
          icon_name: "referrals",
        },
      ];
    }
    return [
      {
        label: "Agents",
        slug: "agents",
        icon: <DashboardIcon />,
        icon_name: "agents",
      },
    ];
  };

  const nav = [
    {
      label: "Dashboard",
      slug: "",
      icon: <DashboardIcon />,
      icon_name: "dashboard",
    },
    {
      label: "Contacts",
      slug: "contacts",
      icon: <ContactIcon />,
      icon_name: "contacts",
    },
    ...conditionalLinks(),
    {
      label: "My Courses",
      slug: "my-courses",
      icon: <CoursesIcon />,
      icon_name: "courses",
    },
    {
      label: "My Videos",
      slug: "my-videos",
      icon: <VideosIcon />,
      icon_name: "videos",
    },
    {
      label: "Inbox",
      slug: "messenger",
      icon: <InboxIcon />,
      icon_name: "inbox",
    },
    {
      label: "Setting",
      slug: "settings",
      icon: <SettingIcon2 />,
      icon_name: "setting",
    },
    // {
    //   label: "Notifications",
    //   slug: "/notifications",
    //   icon: <BellIcon />,
    //   icon_name: "notifications",
    // },

    // {
    //   label: "Post a Question",
    //   slug: "/question",
    //   icon: <QuestionIcon />,
    //   icon_name: "question",
    // },
    // {
    //   label: "My Orders",
    //   slug: "orders",
    //   icon: <OrderIcon />,
    //   icon_name: "orders",
    // },
    // {
    //   label: "Browse Tutors",
    //   slug: "tutors",
    //   icon: <UsersIcon />,
    //   icon_name: "tutors",
    // },

    // {
    //   label: "Help Center",
    //   slug: "help",
    //   icon: <HelpIcon />,
    //   icon_name: "help",
    // },
    {
      label: "Logout",
      slug: "/logout",
      icon: <LogoutIcon />,
      icon_name: "logout",
    },
  ];

  return (
    <>
      <div className={cx(["sidebar-overlay", sidebar ? "show" : "hide"])} />
      <div
        className={cx([
          "Dashbord__sidebar--Root",
          sidebar ? "open-sidebar" : "",
        ])}
      >
        <Link to="/" className={cx("logo")}>
          Read.
        </Link>
        <div className={cx("nav")}>
          {nav.map((link, index) => (
            <NavLink
              end
              key={index.toString()}
              className={({ isActive }) =>
                cx(["link", isActive ? "active" : "", link.icon_name])
              }
              to={`${link.slug ?? ""}`}
            >
              <div className={cx("icon")}>{link.icon}</div>
              <div className={cx("lbl")}>{link.label}</div>
            </NavLink>
          ))}
        </div>
      </div>
    </>
  );
};
