import { all } from "redux-saga/effects";

import { watchUserSagas } from "./users";
import { watchAlertSagas } from "./alert";
import { watchReferralSagas } from "./referrals";
import { watchAgentsSagas } from "./agents";
import { watchLayoutSagas } from "./layout";
import { watchTwilioSagas } from "./twilio";
export function* rootSaga() {
  yield all([
    watchUserSagas(),
    watchAlertSagas(),
    watchAgentsSagas(),
    watchReferralSagas(),
    watchLayoutSagas(),
    watchTwilioSagas(),
  ]);
}
