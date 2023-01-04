import { Actions } from "./actions";
import { rootInitialState } from "../rootReducer";
import { actionTypes } from ".";
import { ReferralResposeData } from "../../types/agents";
/* create the user store */
export interface IReferralStore {
  data: Array<ReferralResposeData>;
  loading: boolean;
}

/* create default state */
const defaultState = {
  loading: false,
  data: [],
};

/* set the initial state */
export const initialState: IReferralStore = defaultState;

/**
 * initalState
 */

export interface IHydrateAction {
  payload: typeof rootInitialState;
}

export const reducer = (state: IReferralStore = initialState, action: Actions) => {
  switch (action.type) {
    case actionTypes.FETCH_REFERALS_SUCCESS:
    case actionTypes.FETCH_REFERALS_ERROR:
      return {
        ...state,
        loading: false,
        data: action.data,
      };
    case actionTypes.FETCH_REFERALS_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
};
