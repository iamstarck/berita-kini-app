import axios from "axios";

export const axiosInstance = (baseURL: string) =>
  axios.create({
    baseURL,
    timeout: 10000,
  });
