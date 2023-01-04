import React, { useEffect } from "react";
import { fetchAgentByUserId } from "../stores/agents";
import { getAgent } from "../stores/agents/selectors";
import { useDispatch, useSelector } from "../stores/rootReducer";

export const useAgent = (id: string) => {
  const agent = useSelector((store) => getAgent(store, id)) || null;
  const dispatch = useDispatch();
  useEffect(() => {
    if (agent) return;
    dispatch(fetchAgentByUserId(id));
  }, [dispatch]);

  return { agent };
};
