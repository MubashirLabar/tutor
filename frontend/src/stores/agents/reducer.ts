import { actionTypes, Actions } from "./actions";
import { IAgent, IAgentWithPagination } from "../../types/agents";
import { IPagination } from "../../types/context/common";

export interface IAgentStore {
  list: IAgent[];
  byUserId: Record<string, IAgent> | Record<string, never>;
  currentPage: number;
  agentFetching: boolean;
  agents: IAgentWithPagination;
  processing: boolean;
  searchString: string;
  cache: {
    [key: number]: {
      agents: IAgent[];
      pagination: IPagination;
    };
  } | null;
}

export const initialState: IAgentStore = {
  list: [],
  currentPage: 0,
  byUserId: {},
  agentFetching: false,
  searchString: "",

  agents: {
    agents: [],
    pagination: {
      total: 0,
      count: 0,
      current_page: 0,
      next_page: null,
      links: {
        self: "",
        next: null,
        prev: null,
      },
    },
  },
  processing: false,
  cache: null,
};

export const reducer = (state: IAgentStore = initialState, action: Actions) => {
  switch (action.type) {
    case actionTypes.FETCH_AGENT_REQUEST:
      return {
        ...state,
        agentFetching: true,
      };
    //clear agents only  when search string change
    case actionTypes.CLEAR_AGENTS:
      return {
        ...state,
        searchString: "",
        agents: {
          agents: [],
          pagination: {
            total: 0,
            count: 0,
            current_page: 0,
            next_page: null,
            links: {
              self: "",
              next: null,
              prev: null,
            },
          },
        },
        cache: null,
      };
    case actionTypes.FETCH_AGENTS_RESPONSE: {
      if (action.payload.replace) {
        return {
          ...state,
          list: [...action.payload.agents],
        };
      } else {
        return {
          ...state,
          list: [...state.list, ...action.payload.agents],
        };
      }
    }

    case actionTypes.FILTER_AGENTS:
      return {
        ...state,
        processing: true,
        searchString: action.search,
      };
    case actionTypes.FETCH_AGENTS_WITH_PAGINATION:
      return {
        ...state,
        processing: true,
      };

    case actionTypes.FETCH_AGENTS_WITH_PAGINATION_SUCCESS:
      return {
        ...state,
        processing: false,
        agents: {
          agents: [...state.agents.agents, ...action.response.data.agents],
          pagination: action.response.pagination,
        },
        //for caching mechanism
        cache: {
          ...state.cache,
          [action.response.pagination.current_page]: {
            pagination: action.response.pagination,
            agents: [...action.response.data.agents],
          },
        },
      };
    case actionTypes.FETCH_AGENTS_REQUEST_FAILED:
      return {
        ...state,
        processing: false,
      };
    case actionTypes.MOVE_AGENTS_PAGINATION_BACK:
      return {
        ...state,
        ...(action.filter && {
          filteredAgents: {
            agents: [...action.agents],
            pagination: action.pagination,
          },
        }),
        ...(!action.filter && {
          agents: {
            agents: [...action.agents],
            pagination: action.pagination,
          },
        }),
      };
    case actionTypes.FETCH_AGENT_RESPONSE: {
      let subIndividial = {};
      if (action.payload.agent && action.payload.userId?.length > 0) {
        subIndividial = {
          [action.payload.userId]: action.payload.agent,
        } as Record<string, IAgent>;
      }
      return {
        ...state,
        byUserId: { ...state.byUserId, ...subIndividial },
        agentFetching: false,
      };
    }

    default:
      return state;
  }
};
