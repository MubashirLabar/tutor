import React, { useEffect, useState } from "react";
import { fetchAgents } from "../stores/agents";
import { agentsList } from "../stores/agents/selectors";
import { useDispatch, useSelector } from "../stores/rootReducer";
export const UseAgents = () => {
  const agents = useSelector((store) => agentsList(store));
  //const [page, setPage] = useState<number>()
  const dispatch = useDispatch();
  //Todo: Add pagination
  useEffect(() => {
    if (!agents || agents?.length === 0) {
      dispatch(fetchAgents({}));
    }
  });

  return {
    agents,
  };
};
