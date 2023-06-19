import axios from "axios";

import { AUTH_LOCAL_STORAGE } from "../auth";
import { getEnv } from "../helpers";

const { VITE_API_URL } = getEnv();

const calendarApi = axios.create({
  baseURL: VITE_API_URL,
});

calendarApi.interceptors.request.use((config) => {
  const token = localStorage.getItem(AUTH_LOCAL_STORAGE.token);

  if (token) {
    config.headers = {
      ...config.headers,
      "x-token": token,
    };
  }

  return config;
});

export default calendarApi;
