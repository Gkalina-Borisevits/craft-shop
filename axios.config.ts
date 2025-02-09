import axios from "axios"
import Cookies from "js-cookie"

const api = axios.create({
  baseURL: "http://localhost:8080/api",
  withCredentials: true,
});

const refreshToken = async () => {
  try {
    const response = await api.post("/refresh", null, {
      withCredentials: true,
    });
    const { accessToken, refreshToken } = response.data;

    Cookies.set("Access-Token", accessToken);
    Cookies.set("Refresh-Token", refreshToken);

    return accessToken;
  } catch (error) {
    console.error("Ошибка обновления токенов", error);
    throw error;
  }
};

api.interceptors.response.use(
  response => response,
  async error => {
    if (
      error.response &&
      error.response.status === 401 &&
      !error.config._retry
    ) {
      error.config._retry = true;
      try {
        const newAccessToken = await refreshToken();
        error.config.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(error.config);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
