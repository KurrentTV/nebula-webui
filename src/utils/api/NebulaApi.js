import { API_USERNAME, API_PASSWORD, API_VERSION, LOGIN_URL, ASSETS_URL ,JOBS_URL, SET_ASSETS_URL } from "../Constants";
import axios from "axios";

export default class NebulaApi {
  /*
  All functions for communicating with NebulaApi are placed in this class. For example, if we need
  to fetch user info, we'll add static method getUserInfo which is calling proper url (/user/5) for 
  fetching user data.
  */
  static authenticate(loginData) {
    // loginData = {
    //   login: API_USERNAME,
    //   password: API_PASSWORD,
    //   api: API_VERSION
    // };
    loginData.api = API_VERSION;

    return axios({
      url: LOGIN_URL,
      method: "POST",
      params: loginData
    });
  }

  static getAssets(data) {
    return axios({
      url: ASSETS_URL,
      method: "POST",
      data
    });
  }
  static setAssets(data) {
    return axios({
      url: SET_ASSETS_URL,
      method: "POST",
      data
    });
  }
  static getLatestJobs(data) {
    return axios({
      url: JOBS_URL,
      method: "POST",
      data
    });
  }
  static getJobbyId(data) {
    return axios({
      url: JOBS_URL,
      method: "POST",
      data
    });
  }
  static getDashboardData(assetData,itemsData,binData,eventsData) {
  	return axios.all([this.getAssets(assetData), this.getAssets(itemsData),this.getAssets(binData),this.getAssets(eventsData)]);
  }
}
