import axios from "axios";

export const BASE_URL = "/api";

export const axiosInstance = (baseURL: string) =>
  axios.create({
    baseURL,
    timeout: 10000,
  });
