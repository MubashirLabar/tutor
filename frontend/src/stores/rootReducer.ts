import { combineReducers } from "redux";
import { Dispatch } from "react";
import {
  TypedUseSelectorHook,
  useSelector as useSelectorNative,
  useDispatch as useDispatchNative,
} from "react-redux";

import storage from "redux-persist/lib/storage";
import {
  reducer as UserReducer,
  Actions as UserActions,
  initialState as usersInitialState,
  IUserStore,
} from "./users/index";

import {
  reducer as AgentsReducer,
  Actions as AgentsActions,
  initialState as agentsInitialState,
  IAgentStore,
} from "./agents";
import {
  reducer as ReferralsReducer,
  Actions as ReferralsActions,
  initialState as referralsInitialState,
  IReferralStore,
} from "./referrals";
import {
  reducer as TwilioReducer,
  Actions as TwilioActions,
  initialState as twilioInitialState,
} from "./twilio";
import {
  reducer as LayoutReducer,
  Actions as LayoutActions,
  initialState as layoutInitialState,
  ILayoutStore,
} from "./layouts";
import {
  reducer as alertReducer,
  initialState as alertInitialState,
  Actions as AlertActions,
  IAlertStore,
} from "./alert";
import persistReducer from "redux-persist/es/persistReducer";
import { ITwilioStore } from "../types/twilio";

const authPersistConfig = {
  key: "users",
  storage: storage,
  blacklist: ["authRequestProcessing", "user"],
};

/* group all app reducers */
export const rootReducer = combineReducers({
  // users: persistReducer<any, any>(authPersistConfig, UserReducer),
  users: UserReducer,
  alert: alertReducer,
  agents: AgentsReducer,
  referrals: ReferralsReducer,
  layout: LayoutReducer,
  twilio: TwilioReducer,
});

/* group all app initialState */

export interface IRootState {
  users: IUserStore;
  alert: IAlertStore;
  agents: IAgentStore;
  referrals: IReferralStore;
  layout: ILayoutStore;
  twilio: ITwilioStore;
}

export const rootInitialState: IRootState = {
  users: usersInitialState,
  alert: alertInitialState,
  agents: agentsInitialState,
  referrals: referralsInitialState,
  layout: layoutInitialState,
  twilio: twilioInitialState,
};

/* group all app actions */
export type RootActions =
  | UserActions
  | AlertActions
  | AgentsActions
  | ReferralsActions
  | LayoutActions
  | TwilioActions;

/* export useSelector hook */

export const useSelector: TypedUseSelectorHook<typeof rootInitialState> =
  useSelectorNative;

/* export useDispatch hook */
export const useDispatch = () => useDispatchNative<Dispatch<RootActions>>();
