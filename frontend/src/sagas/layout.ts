import { call, delay, put, takeEvery } from "redux-saga/effects";
import { fetchCategories, fetchSchools, fetchTests } from "../api/layout";
import {
  actionTypes,
  doFetchCategories,
  doFetchCategoriesSuccess,
  doFetchSchools,
  doFetchSchoolsSuccess,
  doFetchTests,
  doFetchTestsSuccess,
} from "../stores/layouts";
import { InferAsyncResponse } from "../types/asyncResponse";
import { ICategory, ISchool, ITest } from "../types/layout";
import { noop } from "../utils/noop";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function* sagaOnFetchSchools(action: ReturnType<typeof doFetchSchools>) {
  // more stuff in future as per need
  try {
    console.log(`action.type : ${action.type}`);
    const response: InferAsyncResponse<ReturnType<typeof fetchSchools>> =
      yield call(fetchSchools);
    if (response && response.status === "SUCCESS") {
      const schools: ISchool[] = response.data;
      yield put(doFetchSchoolsSuccess(schools));
    }
  } catch (error) {
    console.log(`error ${error}`);
    () => noop;
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function* sagaOnFetchCategories(action: ReturnType<typeof doFetchCategories>) {
  // more stuff in future as per need
  try {
    console.log(`action.type : ${action.type}`);
    const response: InferAsyncResponse<ReturnType<typeof fetchCategories>> =
      yield call(fetchCategories);
    if (response && response.status === "SUCCESS") {
      const categories: ICategory[] = response.data;
      yield put(doFetchCategoriesSuccess(categories));
    }
  } catch (error) {
    () => noop;
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function* sagaOnFetchTests(action: ReturnType<typeof doFetchTests>) {
  // more stuff in future as per need
  try {
    console.log(`action.type : ${action.type}`);
    const response: InferAsyncResponse<ReturnType<typeof fetchTests>> =
      yield call(fetchTests);
    if (response && response.status === "SUCCESS") {
      const tests: ITest[] = response.data;
      yield put(doFetchTestsSuccess(tests));
    }
  } catch (error) {
    () => noop;
  }
}

export function* watchLayoutSagas() {
  yield takeEvery(actionTypes.FETCH_SCHOOLS, sagaOnFetchSchools);
  yield takeEvery(actionTypes.FETCH_CATEGORIES, sagaOnFetchCategories);
  yield takeEvery(actionTypes.FETCH_TESTS, sagaOnFetchTests);
}
