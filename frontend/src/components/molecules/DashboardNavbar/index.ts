import { IDashboardNavbarLink } from "../../../types/link";
const dashboardLink: IDashboardNavbarLink = {
  title: "Dashboard",
  to: "/dashboard",
  className: "",
};

const agents: IDashboardNavbarLink[] = [];
const students: IDashboardNavbarLink[] = [
  {
    title: "Agents",
    to: "agents",
  },
];

const support: IDashboardNavbarLink[] = [
  {
    title: "Find Agents",
    to: "",
  },
];

export const dashboardNavLinks = {
  agents: agents,
  students: students,
  support: support,
};
