import { LocalStorage } from "./local-storage.service";

/**
 * Utility to get auth token
 * @returns
 */
export const getLocalStorageToken = () => {
  const tokenInfo = LocalStorage.getItem("x-auth-token");
  return tokenInfo;
};

/**
 * Utility to set token
 * @param token
 */
export const setLocalStorageToken = (token: string) => {
  LocalStorage.setItem("x-auth-token", token);
};

export const removeLocalStorageToken = () => {
  localStorage.removeItem("x-auth-token");
};
