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
    const requestKey = `${originalRequest.method}-${originalRequest.url}`;

    // Если сервер вернул 401 (Unauthorized) и запрос еще не повторялся
    if (
      error.response &&
      error.response.status === 401 &&
      !retriedRequests.has(requestKey)
    ) {
      // Помечаем запрос как повторенный, чтобы избежать бесконечного цикла
      retriedRequests.add(requestKey);

      try {
        // Сначала пробуем обновить токен
        await api.post("/auth/refresh");
        // После успешного рефреша повторяем оригинальный запрос
        const response = await api(originalRequest);
        // Если успешно, удаляем из списка повторенных запросов
        retriedRequests.delete(requestKey);
        return response;
      } catch (retryError) {
        
      }
    }
    // Для всех остальных ошибок
    return Promise.reject(error);
  },
);

export default api;
