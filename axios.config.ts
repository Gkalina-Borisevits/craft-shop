import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api',
    withCredentials: true, 
  });
  
 
  api.interceptors.request.use(config => {
    return config;
  }, error => {
    return Promise.reject(error);
  });
  
  
  api.interceptors.response.use(response => {
    return response;
  }, async error => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; 
      try {
        const response = await axios.get('http://localhost:8080/api/refresh', {
          withCredentials: true 
        });
        if (response.status === 200) {
          return api(originalRequest);
        }
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  });
  
  export default api;
  