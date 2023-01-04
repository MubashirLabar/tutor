import { delay, put, takeEvery } from "redux-saga/effects";
import {
  doCreateAlert,
  doRemoveAlert,
  actionTypes,
  doCreateAlertSuccess,
} from "../stores/alert";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function* sagaCreateAlert(action: ReturnType<typeof doCreateAlert>) {
  // more stuff in future as per need
  yield put(doCreateAlertSuccess(action.alert));
  yield delay(2000);
  yield put(doRemoveAlert());
}

export function* watchAlertSagas() {
  yield takeEvery(actionTypes.CREATE_ALERT, sagaCreateAlert);
}
