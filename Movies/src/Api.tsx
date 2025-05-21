import axios, { AxiosError } from "axios";
import type { AxiosInstance, InternalAxiosRequestConfig } from "axios";

const BASE_URL = "http://localhost:3030/";
const tokenKeyname = "accessToken";

export const baseInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
});

//any instead of unknown
baseInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig<any>) => {
    const correctPath: boolean = config.url !== "login";
    if (localStorage.getItem(tokenKeyname) !== "" && correctPath) {
      if (!config.headers) {
      }
      // @ts-ignore
      config.headers.Authorization = `Bearer ${localStorage.getItem(
        tokenKeyname
      )}`;
    }
    return config;
  },

  (error: AxiosError) => {
    return Promise.reject(error);
  }
);
