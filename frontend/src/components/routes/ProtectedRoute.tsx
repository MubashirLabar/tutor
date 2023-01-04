import React, { ComponentType } from "react";
import { RouteProps, Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useDispatch } from "../../stores/rootReducer";
import { fetchConversationsLoading, fetchMessagesLoading, intializeTwilioStore } from "../../stores/twilio";
export type ProtectedRouteProps = {
  role?: string;
  authenticationPath: string;
  Component: ComponentType;
  reverse?: boolean;
} & RouteProps;

export default function ProtectedRoute<T>({
  role,
  authenticationPath,
  Component,
  ...routeProps
}: ProtectedRouteProps): JSX.Element {
  const { token } = useAuth();
  const { reverse } = routeProps;
  const dispatch = useDispatch();
  React.useEffect(() => {
    if( token ){
      dispatch(fetchConversationsLoading())
      dispatch(fetchMessagesLoading())
      dispatch(intializeTwilioStore())
    }
  }, []);
  if (reverse) {
    if (token) {
      <Navigate to={authenticationPath} />;
    } else {
      <Component {...routeProps} />;
    }
  }

  return token ? (
    <Component {...routeProps} />
  ) : (
    <Navigate to={authenticationPath} />
  );
}
