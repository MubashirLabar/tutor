import { IAlert } from "../../types/alert";
import { Actions, actionTypes } from "./actions";

export interface IAlertStore {
  alert: IAlert;
}

export const initialState: IAlertStore = {
  alert: { active: false, message: "", type: "" },
};

export const reducer = (state: IAlertStore = initialState, action: Actions) => {
  switch (action.type) {
    case actionTypes.CREATE_ALERT:
      return {
        ...state,
      };
    case actionTypes.CREATE_ALERT_SUCCESS:
      return {
        ...state,
        alert: action.alert,
      };
    case actionTypes.REMOVE_ALERT:
      return {
        ...state,
        alert: {
          active: false,
          message: "",
          type: "",
        },
      };
    default:
      return state;
  }
};
