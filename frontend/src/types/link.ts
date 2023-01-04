import React from "react";

export interface IDashboardSidebarLink {
  title: string;
  to: string;
  onClick?: () => void;
  iconClass: JSX.Element;
}

export interface IDashboardNavbarLink {
  title: string;
  to: string;
  onClick?: () => void;
  className?: string;
}
