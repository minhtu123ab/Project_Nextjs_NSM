import axios from "axios";
import refreshToken from "./refreshToken";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_URL_SERVER,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const tokenAccess = localStorage.getItem("token") || null;

    if (tokenAccess) {
      config.headers.Authorization = `Bearer ${tokenAccess}`;
    } else {
      window.location.href = "/auth/login";
    }

    if (config.data instanceof FormData) {
      config.headers["Content-Type"] = "multipart/form-data";
    } else {
      config.headers["Content-Type"] = "application/json";
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      error.response?.data?.messages?.[0]?.token_type === "access"
    ) {
      originalRequest._retry = true;
      try {
        const newToken = await refreshToken();
        if (newToken) {
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return axiosInstance(originalRequest);
        } else {
          window.location.href = "/auth/login";
          return Promise.reject(error);
        }
      } catch (refreshError) {
        console.log("first");
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
