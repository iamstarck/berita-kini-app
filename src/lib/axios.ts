import axios from "axios";

const CNN_NEWS_URL = "https://berita-indo-api-next.vercel.app";

export const axiosInstance = axios.create({
  baseURL: CNN_NEWS_URL,
  timeout: 10000,
});
