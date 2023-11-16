import axios from "axios";

export const useAxios = () => {
  const axiosInstance = axios.create({
    baseURL:
      process.env.REACT_APP_VITE_API_BASE_URL ?? "http://localhost:8081/api",
  });
  return axiosInstance;
};
