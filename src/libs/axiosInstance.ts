import axios from "axios";

// @Instance
const axiosInstance = axios.create({
  baseURL: "https://dummyjson.com",
  timeout: 1000,
});

// @Interceptors
axiosInstance.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default axiosInstance;
