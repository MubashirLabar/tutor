import axios from "axios";
import { HOST_URL } from "../config/config";
import {
  getLocalStorageToken,
  removeLocalStorageToken,
  setLocalStorageToken,
} from "./token.service";

const axiosHttp = axios.create({
  baseURL: `${HOST_URL}`,
});

axiosHttp.interceptors.request.use(
  (config) => {
    const token = getLocalStorageToken();
    const authorizedBearer = `Bearer ${token}`;
    return {
      ...config,
      headers: {
        ...(!!token && { Authorization: `${authorizedBearer}` }),
        ...config.headers,
      },
    };
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosHttp.interceptors.response.use(
  (response) => {
    const url = response.config.url;
    url === "/v1/api/users/login" &&
      response.data.status !== "FAILURE" &&
      setLocalStorageToken(response.data.data.token);
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      console.log(`unauthorized :)`);
      localStorage.removeItem("persist:root");
      removeLocalStorageToken();
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export default axiosHttp;
