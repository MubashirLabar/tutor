import { takeEvery, call, put } from "redux-saga/effects";

import { InferAsyncResponse } from "./../types/asyncResponse";
import { actionTypes } from "./../stores/agents";
import {
  getAgents,
  getAgentByUserId,
  loadAgents,
  loadFilterAgents,
} from "./../api/agents";
import { noop } from "./../utils/noop";

import {
  fetchAgentsResponse,
  fetchAgentByUserId,
  fetchAgentByUserIdResponse,
  fetchAgents,
  doFetchAgentsWithPagination,
  doFetchAgentsWithPaginationSuccess,
  doFetchAgentsFailed,
  doFilterAgents,
} from "./../stores/agents";
import { IAgent } from "../types/agents";

function* workFetchAgents(action: ReturnType<typeof fetchAgents>) {
  try {
    const response: InferAsyncResponse<ReturnType<typeof getAgents>> =
      yield call(getAgents, action.payload);

    if (response) {
      yield put(
        fetchAgentsResponse({
          agents: response.data,
          replace: true,
        })
      );
    }
  } catch (error) {
    () => noop;
  }
}

function* workFetchAgentByUserId(
  action: ReturnType<typeof fetchAgentByUserId>
) {
  try {
    const response: InferAsyncResponse<ReturnType<typeof getAgentByUserId>> =
      yield call(getAgentByUserId, action.userId);

    if (response) {
      yield put(
        fetchAgentByUserIdResponse({
          agent: response.data,
          userId: action.userId,
        })
      );
    }
  } catch (error) {
    () => noop;
  }
}
function* workLoadFetchAgents(
  action: ReturnType<typeof doFetchAgentsWithPagination>
) {
  try {
    const response: InferAsyncResponse<ReturnType<typeof loadAgents>> =
      yield call(loadAgents, action.link);

    if (response) {
      if (response.status === "SUCCESS") {
        yield put(doFetchAgentsWithPaginationSuccess(response));
      } else {
        yield put(doFetchAgentsFailed());
      }
    }
  } catch (error) {
    () => noop;
  }
}

function* workLoadFilterAgents(action: ReturnType<typeof doFilterAgents>) {
  try {
    const response: InferAsyncResponse<ReturnType<typeof loadAgents>> =
      yield call(loadAgents, action.link, action.search);

    if (response) {
      if (response.status === "SUCCESS") {
        yield put(doFetchAgentsWithPaginationSuccess(response));
      } else {
        yield put(doFetchAgentsFailed());
      }
    }
  } catch (error) {
    () => noop;
  }
}
export function* watchAgentsSagas() {
  yield takeEvery(actionTypes.FETCH_AGENTS_REQUEST, workFetchAgents);
  yield takeEvery(actionTypes.FETCH_AGENT_REQUEST, workFetchAgentByUserId);
  yield takeEvery(actionTypes.FILTER_AGENTS, workLoadFilterAgents);
  yield takeEvery(
    actionTypes.FETCH_AGENTS_WITH_PAGINATION,
    workLoadFetchAgents
  );
}
