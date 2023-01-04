import { IDashboardSidebarLink } from "../../../types/link";
import { DashboardIcon } from "../../../assets/svgIcons";

const dashboardLink = {
  title: "Dashboard",
  to: "/dashboard",
  iconClass: DashboardIcon,
};

// students ky andar agents ka link and agents ky ander user ka link

export const sidebarLinks = {
  agents: [
    dashboardLink,
    {
      title: "Add Users",
      to: "users",
      iconClass: "fa fa fa-users",
    },
    // referralsLink,
    // inboxLink,
  ],

  students: [
    dashboardLink,
    {
      title: "Agents",
      to: "agents",
      iconClass: "fa fa fa-users",
    },
    // referralsLink,
    // inboxLink,
  ],

  support: [
    dashboardLink,
    {
      title: "Agents",
      to: "agents",
      iconClass: "fa fa fa-users",
    },
    // referralsLink,
    // inboxLink,
  ],
};
