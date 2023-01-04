import React, { FC, Fragment, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { DashboardNavbar } from "../../molecules/DashboardNavbar/DashboardNavbar";
import { DashboardSidebar } from "../../molecules/DashboardSidebar/DashboardSidebar";
import { useDispatch, useSelector } from "../../../stores/rootReducer";
import { sidebarState } from "./../../../stores/layouts/selectors";
import { sidebarCLose } from "./../../../stores/layouts";
import { ChatContainer } from "./../../molecules/OneOneChat";
import { LocalStorage } from "../../../services/local-storage.service";

export const AuthLayout: FC = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const redirect = localStorage.getItem("redirect_user_uri");
    if (redirect) {
      const info = JSON.parse(redirect);
      const url = info.url;
      LocalStorage.removeRedirectInfo();
      navigate(url, { replace: true });
    }
  });

  const sidebar = useSelector(sidebarState);

  useEffect(() => {
    document.body.addEventListener("click", () => {
      if (sidebar) dispatch(sidebarCLose());
    });
  }, [sidebar]);

  const bodyClick = React.useCallback(() => {
    if (sidebar) dispatch(sidebarCLose());
  }, [sidebar]);

  return (
    <>
      <div className="layout__main__wrapper">
        <DashboardSidebar />
        <DashboardNavbar />
        <div onClick={bodyClick} className="layout__main__wrapper">
          <div className="layout__main__content">
            <Fragment>{children}</Fragment>
            <Outlet />
          </div>
        </div>
      </div>
      <ChatContainer />
    </>
  );
};
