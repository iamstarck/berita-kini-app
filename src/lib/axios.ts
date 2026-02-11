import axios from "axios";

export const BASE_URL = import.meta.env.VITE_API_BASE as string;

export const axiosInstance = (baseURL: string) =>
  axios.create({
    baseURL,
    timeout: 10000,
  });
