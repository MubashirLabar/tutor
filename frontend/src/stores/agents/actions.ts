import {
  FetchAgentsSuccessPayload,
  FetchAgentByUserIdSuccessPayload,
  IAgent,
} from "../../types/agents";
import {
  IPagination,
  IResponseWithPagination,
  QueryParmType,
} from "../../types/context/common";

export const actionTypes = {
  FETCH_AGENTS_REQUEST: "@AGENTS/FETCH_AGENTS_REQUEST",
  FETCH_AGENTS_RESPONSE: "@AGENTS/FETCH_AGENTS_RESPONSE",
  FETCH_AGENTS_ERROR: "@AGENTS/FETCH_AGENTS_ERROR",
  FETCH_AGENT_REQUEST: "@AGENTS/FETCH_AGENT_REQUEST",
  FETCH_AGENT_RESPONSE: "@AGENTS/FETCH_AGENT_RESPONSE",

  CLEAR_AGENTS: "@AGENTS/CLEAR_AGENTS",

  FETCH_AGENTS_WITH_PAGINATION: "@@AGENTS/FETCH_AGENTS_WITH_PAGINATION",
  FETCH_AGENTS_WITH_PAGINATION_SUCCESS:
    "@@AGENTS/FETCH_AGENTS_WITH_PAGINATION_SUCCESS",
  MOVE_AGENTS_PAGINATION_BACK: "@@AGENTS/MOVE_AGENTS_PAGINATION_BACK",

  FETCH_AGENTS_REFERRALS: "@@AGENTS/FETCH_AGENTS_REFERRALS",
  FETCH_AGENTS_REFERRALS_SUCCESS: "@@AGENTS/FETCH_AGENTS_REFERRALS_SUCCESS",
  FETCH_AGENTS_REQUEST_FAILED: "@@AGENTS/FETCH_AGENTS_REQUEST_FAILED",

  FILTER_AGENTS: "@@AGENTS/FILTER_AGENTS",
  FILTER_AGENTS_SUCCESS: "@@AGENTS/FILTER_AGENTS_SUCCESS",
} as const;

export const fetchAgents = (payload: QueryParmType) => ({
  type: actionTypes.FETCH_AGENTS_REQUEST,
  payload,
});

export const fetchAgentByUserId = (userId: string) => ({
  type: actionTypes.FETCH_AGENT_REQUEST,
  userId,
});

export const fetchAgentsResponse = (payload: FetchAgentsSuccessPayload) => ({
  type: actionTypes.FETCH_AGENTS_RESPONSE,
  payload,
});

export const doClearAgents = () => ({
  type: actionTypes.CLEAR_AGENTS,
});
export const fetchAgentByUserIdResponse = (
  payload: FetchAgentByUserIdSuccessPayload
) => ({
  type: actionTypes.FETCH_AGENT_RESPONSE,
  payload,
});

export const doFilterAgents = (link: string, search: string) => ({
  type: actionTypes.FILTER_AGENTS,
  search,
  link,
});
// export const filterAgentsSuccess = (response: IResponseWithPagination) => ({
//   type: actionTypes.FILTER_AGENTS_SUCCESS,
//   response,
// });

export const doFetchAgentsWithPagination = (link: string) => ({
  type: actionTypes.FETCH_AGENTS_WITH_PAGINATION,
  link,
});

export const doFetchAgentsWithPaginationSuccess = (
  response: IResponseWithPagination
) => ({
  type: actionTypes.FETCH_AGENTS_WITH_PAGINATION_SUCCESS,
  response,
});

export const doReverseAgentsPagination = (
  pagination: IPagination,
  agents: IAgent[],
  filter: boolean = false
) => ({
  type: actionTypes.MOVE_AGENTS_PAGINATION_BACK,
  pagination,
  agents,
  filter,
});
export const doFetchAgentsFailed = () => ({
  type: actionTypes.FETCH_AGENTS_REQUEST_FAILED,
});

export type Actions =
  | ReturnType<typeof fetchAgents>
  | ReturnType<typeof fetchAgentsResponse>
  | ReturnType<typeof fetchAgentByUserId>
  | ReturnType<typeof fetchAgentByUserIdResponse>
  | ReturnType<typeof doFetchAgentsWithPagination>
  | ReturnType<typeof doFetchAgentsWithPaginationSuccess>
  | ReturnType<typeof doReverseAgentsPagination>
  | ReturnType<typeof doFetchAgentsFailed>
  | ReturnType<typeof doFilterAgents>
  | ReturnType<typeof doClearAgents>;

// | ReturnType<typeof filterAgentsSuccess>;
