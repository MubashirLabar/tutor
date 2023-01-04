import React, { useEffect } from "react";
import { useDispatch, useSelector } from "../stores/rootReducer";
import { doFetchUser } from "../stores/users";
import { currentUserInfo } from "../stores/users/selectors";
import { ILoginResponsInfo } from "../types/context/auth";
export const useFetchUser = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector(currentUserInfo);

  useEffect(() => {
    if (userInfo) return;
    dispatch(doFetchUser());
  }, []);

  return {
    user: { ...userInfo },
  };
};
