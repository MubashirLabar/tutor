import { IAgentStore } from "./reducer";

export interface IRootStore {
  agents: IAgentStore;
}

export const agentsList = (store: IRootStore) => store.agents.list;
export const agentsListByUserId = (store: IRootStore) => store.agents.byUserId;
export const selectAgentFetching = (store: IRootStore) =>
  store.agents.agentFetching;
export const getAgent = (store: IRootStore, id: string) =>
  store.agents.byUserId[id];

export const selectFetchAgents = (store: IRootStore) =>
  store.agents.agents.agents;

export const selectAgentsPagination = (store: IRootStore) =>
  store.agents.agents.pagination;

export const selectAgentsLoading = (store: IRootStore) =>
  store.agents.processing;

export const selectAgentsPaginationCache = (store: IRootStore) =>
  store.agents.cache;
export const selectSearchString = (store: IRootStore) =>
  store.agents.searchString;
