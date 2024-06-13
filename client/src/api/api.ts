import axios, { AxiosInstance } from "axios";


const api: AxiosInstance = axios.create({
  baseURL: "http://localhost:8081/api/",
});

api.interceptors.request.use(
  (config) => {
  
    config.headers["Authorization"] = `Bearer ${localStorage.getItem("token")}`; 
    config.headers["Content-Type"] = "application/json";
    
    return config;
  },
  (error) => {
    
    return Promise.reject(error);
  }
);

export default api;
