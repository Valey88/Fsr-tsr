import axios from "axios";
import useUserStore from "../store/userStore";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const url = import.meta.env.VITE_URL_SERVER;
export const urlPictures = import.meta.env.VITE_URL_PICTURES;

// Создаем экземпляр axios
const api = axios.create({
  baseURL: `${url}`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
  timeout: 10000, // 10 секунд timeout
});

// CSRF Protection interceptor
api.interceptors.request.use((config) => {
  // Добавляем CSRF token во все state-changing запросы
  if (["post", "put", "patch", "delete"].includes(config.method)) {
    const csrfToken = Cookies.get("csrf_token"); // Бэкенд должен set this
    if (csrfToken) {
      config.headers["X-CSRF-Token"] = csrfToken;
    }
  }
  return config;
});

// Response interceptor с улучшенной обработкой ошибок
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Если ошибка 401 и не запрос на обновление токена
    if (error.response?.status === 401 && !originalRequest._retry) {
      // Не обрабатываем refresh endpoint повторно
      if (originalRequest.url.includes("/auth/refresh")) {
        console.log("Refresh endpoint returned 401, logging out...");
        await useUserStore.getState().logout();
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      try {
        console.log("Interceptor: Handling 401 error, refreshing token...");

        // Используем синхронизированный refresh из store
        await useUserStore.getState().refreshToken();

        console.log(
          "Interceptor: Token refreshed, retrying original request..."
        );

        // Повторяем оригинальный запрос с обновлёнными cookies
        return api(originalRequest);
      } catch (refreshError) {
        console.error("Interceptor: Token refresh failed:", refreshError);

        // logout уже вызван в refreshToken(), просто reject
        return Promise.reject(refreshError);
      }
    }

    // Обработка network errors
    if (!error.response) {
      console.error("Network error:", error.message);
      toast.error(
        "Проблемы с соединением. Проверьте интернет и попробуйте снова."
      );
    }

    // Обработка других ошибок
    if (error.response?.status >= 500) {
      console.error("Server error:", error.response);
      toast.error("Внутренняя ошибка сервера. Пожалуйста, попробуйте позже.");
    }

    return Promise.reject(error);
  }
);

export default api;
