import axios from "axios";

import { KURRENTTV_BASE_URL, LOGIN_URL } from "./Constants";
import CookiesHelper from "./CookiesHelper";

export const initializeHttpClient = () => {
  axios.defaults.baseURL = KURRENTTV_BASE_URL;
  axios.interceptors.request.use(requestHandler, requestError => {
    return Promise.reject(requestError);
  });
};

const requestHandler = config => {
  if (config.url !== LOGIN_URL) {
    const sessionId = CookiesHelper.getCookie("session_id");
    if (config.data) {
      config.data.session_id = sessionId;
    }
  }
  return config;
};
