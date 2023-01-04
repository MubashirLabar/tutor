import React, { memo } from "react";
import { useRoutes } from "react-router-dom";
import { useSelector } from "../../stores/rootReducer";
import { fetchCurrentRole } from "../../stores/users/selectors";
import { withNotification } from "../hoc/withAlertNotification";
import { AuthLayout } from "../layouts/AuthLayout/AuthLayout";
import { GuestLayout } from "../layouts/GuestLayout/GuestLayout";
import { AgentCusomerServiceUsers } from "../organisms/AgentCustomerServiceUsers/AgentCustomerSericeUsers";
import { Agents } from "../organisms/Agents/Agents";
import { AuthPage } from "../organisms/Auth/Auth";
import { NewAuthPage } from "../organisms/AuthRedesign/NewAuthPage";
import { ChangePassword } from "../organisms/ChangePassword/ChangePassword";

import { Referrals } from "../organisms/Referrals/Referrals";
import { MyVideos } from "../organisms/MyVideos/MyVideos";
import { Messenger } from "../organisms/Messenger/Messenger";
import { InboxScreen } from "../organisms/Inbox";
import { PageNotFound } from "../organisms/PageNotFound/PageNotFound";
import { VerifyEmail } from "../organisms/VerifyEmail/VerifyEmail";
import ProtectedRoute from "./ProtectedRoute";
import { AgentProfile } from "../organisms/AgentProfile/AgentProfile";
import { NewAgentProfile } from "../organisms/AgentProfile/NewAgentProfile";

import { NewOrder } from "../organisms/NewOrder/NewOrder";
import { SelfLearning } from "../organisms/SelfLearning/SelfLearning";

import { Settings } from "../organisms/Settings/Settings";
import { Contacts } from "../organisms/Contacts/Contacts";
import { VideoDetails } from "../organisms/VideoDetails/VideoDetails";
import { Cart } from "../organisms/Cart/Cart";
import { Checkout } from "../organisms/Checkout/Checkout";
import { MyCourses } from "../organisms/MyCourses/MyCourses";
import { ContractDetailSeller } from "../organisms/ContractDetailSeller/ContractDetailSeller";
import { ContractBuyer } from "../organisms/ContractsBuyer/ContractsBuyer";
import { ContractDetailBuyer } from "../organisms/ContractDetailBuyer/ContractDetailBuyer";
import { ContractSeller } from "../organisms/ContractsSeller/ContractsSeller";
import { OrderPlacedSuccessfully } from "../organisms/OrderPlacedSuccessfully/OrderPlacedSuccessfully";

import { NewGuestLayout } from "../layouts/GuestLayout/NewGuestLayout";
import { LandingPage } from "../organisms/LandingPage/LandingPage";
import { StartContract } from "../organisms/StartContract/StartContract";

export const LazyLoadHome = React.lazy(() => import("../organisms/Home/Home"));
export const LazyLoadPublicAgentProfile = React.lazy(
  () => import("../organisms/PublicAgents/PublicAgents")
);
export const LazyLoadLogout = React.lazy(
  () => import("../organisms/Logout/Logout")
);
export const LazyLoadDashboard = React.lazy(
  () => import("../organisms/Dashboard/Dashboard")
);
export const LazyLoadResetPassword = withNotification(
  React.lazy(() => import("../organisms/ResetPassword/ResetPassword"))
);

const AuthWithNotification = withNotification(AuthPage);
const NewAuthWithNotification = withNotification(NewAuthPage);

const NewChatText = () => {
  React.useEffect(() => {
    const s = document.createElement("script");
    s.type = "text/javascript";
    s.async = true;
    s.innerHTML = `(function(d,w,i){w.premiumchat = w.premiumchat || [];var p = w.premiumchat; if(!p.length){(()=>{
    w.premiumchat_domain = 'https://premium.chat/';var s = d.createElement('script'); s.type = 'text/javascript'; s.async = true; s.src = w.premiumchat_domain+'embed/js/widget.js'; var ss = d.getElementsByTagName('script')[0]; ss.parentNode.insertBefore(s, ss);})();}
    p.push({'num': p.length, 'wid': i});})(document, window,58150);`;
    document.body.appendChild(s);
  }, []);

  return <div className="pchat-widget-placeholder"></div>;
};

const RouterView = () => {
  const role = useSelector((store) => fetchCurrentRole(store));

  const agentRoutes: { exact: boolean; path: string; element: JSX.Element }[] =
    [
      {
        exact: true,
        path: "users",
        element: <AgentCusomerServiceUsers />,
      },
      { exact: true, path: "referrals", element: <Referrals /> },
    ];

  const studentRoutes: {
    exact: boolean;
    path: string;
    element: JSX.Element;
  }[] = [
    {
      exact: true,
      path: "agents",
      element: <LazyLoadPublicAgentProfile />,
    },
    {
      exact: true,
      path: "agents/:id",
      element: <NewAgentProfile />, // AgentProfile
    },
    {
      exact: true,
      path: "freelancer/:id",
      element: <AgentProfile />, // Freelancer Profile
    },
  ];

  const supportRoutes: {
    exact: boolean;
    path: string;
    element: JSX.Element;
  }[] = [
    {
      exact: true,
      path: "agents",
      element: <Agents />,
    },
  ];

  const guestRoutes = {
    path: "",
    exact: true,
    element: <GuestLayout />,
    children: [
      { exact: true, path: "*", element: <PageNotFound /> },
      { exact: true, path: "logout", element: <LazyLoadLogout /> },
      {
        exact: true,
        path: "auth/reset-password",
        element: <LazyLoadResetPassword enableNotification={true} />,
      },
      {
        exact: true,
        path: "reset-password/:id",
        element: (
          <ProtectedRoute
            reverse={true}
            authenticationPath="/"
            Component={ChangePassword}
          />
        ),
      },
      {
        exact: true,
        path: "verify-identity/:id",
        element: <VerifyEmail />,
      },
      {
        exact: true,
        path: "agents",
        element: <LazyLoadPublicAgentProfile />,
      },
      {
        exact: true,
        path: "agents/:id",
        element: <NewAgentProfile />, // AgentProfile
      },
      {
        exact: true,
        path: "freelancer/:id",
        element: <AgentProfile />, // Freelancer Profile
      },
      {
        exact: true,
        path: "new-order",
        element: <NewOrder />,
      },
      {
        exact: true,
        path: "successfully",
        element: <OrderPlacedSuccessfully />,
      },
      {
        exact: true,
        path: "self-learning",
        element: <SelfLearning />,
      },
      {
        exact: true,
        path: "video-details",
        element: <VideoDetails />,
      },
      {
        exact: true,
        path: "cart",
        element: <Cart />,
      },
      {
        exact: true,
        path: "checkout",
        element: <Checkout />,
      },
      {
        exact: true,
        path: "",
        element: <LazyLoadHome />,
      },
      {
        exact: true,
        path: "auth",
        //element: <AuthWithNotification enableNotification={true} />,
        element: <NewAuthWithNotification enableNotification={true} />,
      },
      {
        exact: true,
        path: "new-auth",
        element: <NewAuthWithNotification enableNotification={true} />,
      },
      {
        exact: true,
        path: "contracts/seller/:id",
        element: <ContractSeller />,
      },
      {
        exact: true,
        path: "contracts/seller/:id/:id",
        element: <ContractDetailSeller />,
      },
      { exact: true, path: "contracts/client/:id", element: <ContractBuyer /> },
      {
        exact: true,
        path: "contracts/client/:id/:detail",
        element: <ContractDetailBuyer />,
      },
    ],
  };

  const newRoutes = {
    path: "",
    exact: true,
    element: <NewGuestLayout />,
    children: [
      { exact: true, path: "new-landing-page", element: <LandingPage /> },
      { exact: true, path: "new-chat", element: <NewChatText /> },
    ],
  };

  //auth
  //dashboard

  const renderAuthRoutes = () => {
    if (role === "Student") return studentRoutes;
    if (role === "Agent") return agentRoutes;
    return supportRoutes;
  };

  const authRoutes = {
    path: "dashboard",
    element: <ProtectedRoute Component={AuthLayout} authenticationPath="/" />,
    children: [
      { exact: true, path: "*", element: <PageNotFound /> },
      { exact: true, path: "messenger", element: <Messenger /> },
      { exact: true, path: "my-videos", element: <MyVideos /> },
      { exact: true, path: "my-courses", element: <MyCourses /> },
      { exact: true, path: "messenger-design", element: <InboxScreen /> },
      { exact: true, path: "contacts", element: <Contacts /> },
      {
        exact: true,
        path: "agents",
        element: <LazyLoadPublicAgentProfile />,
      },
      {
        exact: true,
        path: "agents/:id",
        element: <NewAgentProfile />, // AgentProfile
      },
      {
        exact: true,
        path: "freelancer/:id",
        element: <AgentProfile />, // Freelancer Profile
      },

      { exact: true, path: "settings", element: <Settings /> },
      { exact: true, path: "start-contract", element: <StartContract /> },
      {
        exact: true,
        path: "",
        element: <LazyLoadDashboard />,
      },
      ...renderAuthRoutes(),
    ],
  };

  const routes = useRoutes([authRoutes, guestRoutes, newRoutes]);
  return <>{routes}</>;
};
export default memo(RouterView);
