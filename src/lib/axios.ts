import axios from "axios";

export const BASE_URL = "https://berita-indo-api-next.vercel.app/api";

export const axiosInstance = (baseURL: string) =>
  axios.create({
    baseURL,
    timeout: 10000,
  });
