import { put, takeEvery } from "@redux-saga/core/effects";
import { call } from "redux-saga/effects";
import { getReferrals } from "../api/users";
import { fetchReferralsError, fetchReferralsLoading, fetchReferralsSuccess } from "../stores/referrals";
import { actionTypes } from "../stores/referrals";
import { ReferralRespose } from "../types/agents";
import { InferAsyncResponse } from "../types/asyncResponse";
import { noop } from "../utils/noop";


function* workLoadFetchReferrals() {
  try {
    const response: InferAsyncResponse< ReturnType<typeof getReferrals>> = yield call(getReferrals);
    yield put(fetchReferralsLoading());
    if (response) {
      if (response?.status === "FAILURE") {
        yield put(fetchReferralsError());
      } else {
        const referralResponse: ReferralRespose = response;
        yield put(fetchReferralsSuccess(referralResponse.data));
      }
    }
  } catch (error) {
    yield put(fetchReferralsError());
    () => noop;
  }
}



export function* watchReferralSagas() {
  yield takeEvery(actionTypes.FETCH_REFERALS, workLoadFetchReferrals);

 
}
