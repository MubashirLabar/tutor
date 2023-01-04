import { useEffect } from "react";
import { doFetchAgentsWithPagination } from "../stores/agents";
import {
  selectAgentsPagination,
  selectFetchAgents,
} from "../stores/agents/selectors";
import { useDispatch, useSelector } from "../stores/rootReducer";

/// This hook is updatd hook that implements pagination
export const useFetchAgents = (link: string) => {
  const dispatch = useDispatch();
  const agents = useSelector(selectFetchAgents);
  const pagination = useSelector(selectAgentsPagination);

  useEffect(() => {
    if (link === "" || link === pagination.links.self) return;
    dispatch(doFetchAgentsWithPagination(link));
  }, [link]);

  return agents;
};
