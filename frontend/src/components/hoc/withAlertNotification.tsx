import React, { ComponentType } from "react";
import { doCreateAlert } from "../../stores/alert";
import { currentAlertState } from "../../stores/alert/selectors";
import { useDispatch, useSelector } from "../../stores/rootReducer";
import { IAlert } from "../../types/alert";
import { getDisplayName } from "../../utils/higher-order.name";
import Alert from "../atoms/Alert/Alert";

export function withNotification<T>(WrappedComponent: ComponentType<T>) {
  const HigherOrderNotificationComponent = (
    hocProps: Omit<T, "onNotification">
  ) => {
    //@ts-ignore
    const enableNotification: boolean = hocProps.enableNotification;
    const dispatch = useDispatch();
    const alert = useSelector(currentAlertState); // extract the alert state
    const { active } = alert || {}; // deconstruct properties
    const dispatchNotification = (alert: IAlert) => {
      dispatch(
        doCreateAlert({
          active: true,
          message: alert.message,
          type: alert.type,
        })
      );
    };

    return (
      <>
        <WrappedComponent
          {...(hocProps as T)}
          onNotification={dispatchNotification}
        />
        {active && enableNotification && (
          <Alert type={alert.type} message={alert.message} />
        )}
      </>
    );
  };

  //@ts-ignore
  HigherOrderNotificationComponent.displayName = getDisplayName(
    HigherOrderNotificationComponent
  );
  return HigherOrderNotificationComponent;
}
