import { IAlert } from "../../types/alert";

export const actionTypes = {
  CREATE_ALERT: "@@CREATE_ALERT",
  CREATE_ALERT_SUCCESS: "@@CREATE_ALERT_SUCCESS",
  REMOVE_ALERT: "@@REMOVE_ALERT",
} as const;

export const doCreateAlert = (alert: IAlert) => ({
  type: actionTypes.CREATE_ALERT,
  alert,
});

export const doCreateAlertSuccess = (alert: IAlert) => ({
  type: actionTypes.CREATE_ALERT_SUCCESS,
  alert,
});

export const doRemoveAlert = () => ({
  type: actionTypes.REMOVE_ALERT,
});

export type Actions =
  | ReturnType<typeof doCreateAlert>
  | ReturnType<typeof doCreateAlertSuccess>
  | ReturnType<typeof doRemoveAlert>;
