import { useEffect } from "react";
import { useSelector } from "react-redux";
import { getLocalStorageToken } from "../services/token.service";

import { currentUserInfo } from "../stores/users/selectors";

export const useAuth = () => {
  const userInfo = useSelector(currentUserInfo);
  const token = getLocalStorageToken();

  // useEffect(() => {
  //   if (!userInfo || !userInfo.token) {
  //     //Todo: token && dispatch(doFetchUser(token));
  //     console.log("fetching user information");
  //   }
  // }, [userInfo]);

  // if (userInfo?.token) {
  //   return {
  //     token: userInfo.token,
  //   };
  // }
  return {
    token,
  };
};
