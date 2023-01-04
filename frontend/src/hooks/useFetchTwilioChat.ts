import React, { useEffect } from "react";
import { useDispatch, useSelector } from "../stores/rootReducer";
import { getTwilioStore } from "../stores/twilio";
import { ITwilioStore } from "../types/twilio";

export const useFetchTwilioChat = () => {
  const dispatch = useDispatch();
  const twilio:ITwilioStore = useSelector(getTwilioStore);

  useEffect(() => {
    // dispatch(fetchConversations());
  }, [twilio]);

  return {...twilio}
};
