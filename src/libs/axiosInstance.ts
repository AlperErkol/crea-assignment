import axios from "axios";
import { env } from "./env";

// @Instance
const axiosInstance = axios.create({
  baseURL: env.NEXT_PUBLIC_BASE_URL,
  timeout: env.API_REQUEST_TIMEOUT,
});

// @Interceptors
axiosInstance.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

axios.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default axiosInstance;
