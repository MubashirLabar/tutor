import React, { useEffect } from "react";
import { useDispatch, useSelector } from "../stores/rootReducer";
import { currentUserInfo, doFetchUser } from "../stores/users";
import { useAuth } from "./useAuth";

export const useUser = () => {
  const user = useSelector(currentUserInfo);
  const { token } = useAuth();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!token) return;
    if (user) return;
    dispatch(doFetchUser());
  }, []);
  return user;
};
