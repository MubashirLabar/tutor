import React, { FC, Fragment } from "react";
import { Outlet } from "react-router-dom";

import { useDispatch, useSelector } from "../../../stores/rootReducer";
import { sidebarState } from "./../../../stores/layouts/selectors";
import { DefaultLayout } from "../DefaultLayout/DefaultLayout";
import { sidebarCLose } from "./../../../stores/layouts";

export const GuestLayout: FC = ({ children }) => {
  const dispatch = useDispatch();
  const sidebar = useSelector(sidebarState);

  const bodyClick = React.useCallback(() => {
    if (sidebar) dispatch(sidebarCLose());
  }, [sidebar]);

  return (
    <DefaultLayout>
      <div className="guest_main_layout-wrapper">
        <div onClick={bodyClick} className="layout__guest__content">
          <Fragment>{children}</Fragment>
          <Outlet />
        </div>
      </div>
    </DefaultLayout>
  );
};
