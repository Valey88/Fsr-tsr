import { create } from "zustand";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import api from "../configs/axiosConfig";

// Safe storage utility для mobile compatibility
const safeStorage = {
  setItem: (key, value) => {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      // Fallback для mobile private mode
      console.warn("LocalStorage unavailable, using session fallback");
      try {
        sessionStorage.setItem(key, value);
      } catch {
        // Final fallback - memory storage (cleared on refresh)
        console.error("All storage options unavailable");
      }
    }
  },

  getItem: (key) => {
    try {
      return localStorage.getItem(key);
    } catch {
      try {
        return sessionStorage.getItem(key);
      } catch {
        return null;
      }
    }
  },

  removeItem: (key) => {
    try {
      localStorage.removeItem(key);
    } catch {
      try {
        sessionStorage.removeItem(key);
      } catch {
        // Ignore errors on removal
      }
    }
  },
};

// Единый источник истины для auth статуса
const getInitialAuthState = () => {
  try {
    const hasAuthCookie = !!Cookies.get("logged_in");
    const hasUserData = !!safeStorage.getItem("user");
    return hasAuthCookie && hasUserData;
  } catch {
    return false;
  }
};

const useUserStore = create((set, get) => ({
  // Состояние
  user: (() => {
    try {
      const userData = safeStorage.getItem("user");
      return userData ? JSON.parse(userData) : null;
    } catch {
      return null;
    }
  })(),
  allUsers: [],
  isLoggedOut: false,
  isRefreshingToken: false,
  refreshPromise: null, // Для синхронизации concurrent refresh
  isLoggingOut: false,
  email: "",
  fio: "",
  password: "",
  confirmPassword: "",
  phone_number: "",
  showConfirmation: false,
  code: "",
  isAuthenticated: getInitialAuthState(),
  isLoadingUser: false,

  // Setters
  setEmail: (email) => set({ email }),
  setFio: (fio) => set({ fio }),
  setPhone_number: (phone_number) => set({ phone_number }),
  setPassword: (password) => set({ password }),
  setConfirmPassword: (confirmPassword) => set({ confirmPassword }),
  setShowConfirmation: (showConfirmation) => set({ showConfirmation }),
  setCode: (code) => set({ code }),
  setIsAuthenticated: (status) => set({ isAuthenticated: status }),
  setLoadingUser: (loading) => set({ isLoadingUser: loading }),

  // Проверка auth статуса с синхронизацией всех источников
  checkAuthStatus: () => {
    const newAuthStatus = getInitialAuthState();
    const currentAuthStatus = get().isAuthenticated;

    if (newAuthStatus !== currentAuthStatus) {
      set({ isAuthenticated: newAuthStatus });
    }

    return newAuthStatus;
  },

  // Безопасный wrapper для auth-зависимых операций
  checkAuthAndExecute: async (callback) => {
    const state = get();

    if (!state.isAuthenticated || state.isLoggingOut) {
      console.warn("Not authenticated or logging out, skipping operation");
      return;
    }

    try {
      await callback();
    } catch (error) {
      // Не обрабатываем 401 если уже в процессе logout
      if (state.isLoggingOut) {
        throw error;
      }

      if (error.response?.status === 401) {
        try {
          console.log("Auth expired, attempting token refresh...");
          await get().refreshToken();

          // Повторяем операцию после успешного refresh
          await callback();

          // Сохраняем обновленные данные пользователя
          const updatedUser = get().user;
          if (updatedUser) {
            safeStorage.setItem("user", JSON.stringify(updatedUser));
          }
        } catch (refreshError) {
          console.error("Token refresh failed, logging out:", refreshError);
          await get().logout();
          throw refreshError;
        }
      } else {
        throw error;
      }
    }
  },

  // Восстановление пароля - запрос email
  checkPasswordResetEmail: async (email) => {
    try {
      const response = await api.get(`/auth/reset-password/${email}`, {
        withCredentials: true,
      });
      if (response.data.status === "success") {
        toast.info(
          "Пожалуйста, проверьте ваш email для восстановления пароля."
        );
      }
      return response.data;
    } catch (error) {
      toast.error(
        "Ошибка отправки запроса на сброс пароля: " +
          (error.response?.data?.message || error.message)
      );
      console.error("Error in password reset request:", error);
      throw error;
    }
  },

  // Смена пароля после подтверждения
  changePasswordReset: async (queryToken, confirmPassword) => {
    try {
      const response = await api.post(
        `/auth/reset-password`,
        {}, // body data
        {
          params: {
            token: queryToken,
            pass: confirmPassword,
          },
          withCredentials: true,
        }
      );

      if (response.data.status === "success") {
        toast.info("Пароль успешно изменен");
      }
      return response.data;
    } catch (error) {
      toast.error(
        "Ошибка смены пароля: " +
          (error.response?.data?.message || error.message)
      );
      console.error("Error in password change:", error);
      throw error;
    }
  },

  // Регистрация
  registerFunc: async () => {
    const { email, fio, phone_number, password } = get();
    try {
      const response = await api.post(
        `/auth/register`,
        { email, fio, phone_number, password },
        { withCredentials: true }
      );

      if (response.data.status === "success") {
        set({ showConfirmation: true });
        toast.info("Пожалуйста, проверьте ваш email для подтверждения.");
      }
      return response.data;
    } catch (error) {
      toast.error(
        "Ошибка регистрации: " +
          (error.response?.data?.message || error.message)
      );
      console.error("Error in registration:", error);
      throw error;
    }
  },

  // Логин
  loginFunc: async (navigate) => {
    const { email, password } = get();
    try {
      const response = await api.post(
        `/auth/login`,
        { email, password },
        { withCredentials: true }
      );

      if (response.data.status === "success") {
        // Синхронизируем состояние после успешного логина
        set({ isAuthenticated: true });

        // Получаем данные пользователя
        await get().getUserInfo();

        if (navigate) {
          navigate("/profile");
        }
        toast.success("Успешный вход!");
      }
      return response.data;
    } catch (error) {
      toast.error(
        "Ошибка авторизации: " +
          (error.response?.data?.message || error.message)
      );
      console.error("Error in login:", error);
      throw error;
    }
  },

  // Подтверждение email
  verifyFunc: async (navigate) => {
    const { email, code } = get();
    try {
      const response = await api.post(
        `/auth/verify-code`,
        { email, code },
        { withCredentials: true }
      );

      if (response.data.status === "success") {
        if (navigate) {
          navigate("/auth");
        }
        toast.success("Код подтвержден!");
      }
      return response.data;
    } catch (error) {
      toast.error("Ошибка: неправильный код верификации " + error.message);
      console.error("Error in verification:", error);
      throw error;
    }
  },

  deleteUser: async (id) => {
    try {
      const response = await api.delete(`/user/${id}`);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  },

  // Получение информации о пользователе
  getUserInfo: async () => {
    const state = get();

    // Предотвращаем множественные одновременные запросы
    if (state.isLoadingUser) {
      return;
    }

    await state.checkAuthAndExecute(async () => {
      try {
        set({ isLoadingUser: true });

        const response = await api.get(`/user/me`);
        const userData = response.data;

        set({
          user: userData,
          isLoggedOut: false,
          isLoadingUser: false,
        });

        // Сохраняем в safe storage
        safeStorage.setItem("user", JSON.stringify(userData));

        return userData;
      } catch (error) {
        console.error("Ошибка при получении данных пользователя:", error);
        set({ isLoadingUser: false });
        throw error;
      }
    });
  },

  // Обновление токена (синхронизированная версия)
  refreshToken: async () => {
    const state = get();

    // Возвращаем существующий promise если refresh уже в процессе
    if (state.refreshPromise) {
      return state.refreshPromise;
    }

    // Предотвращаем refresh во время logout
    if (state.isLoggingOut) {
      throw new Error("Logging out, cannot refresh token");
    }

    // Создаем новый refresh promise
    const refreshOperation = async () => {
      try {
        set({ isRefreshingToken: true });

        console.log("Refreshing authentication token...");
        const response = await api.post(
          `/auth/refresh`,
          {},
          { withCredentials: true }
        );

        // После успешного refresh обновляем данные пользователя
        await get().getUserInfo();

        set({
          isRefreshingToken: false,
          isAuthenticated: true,
          refreshPromise: null,
        });

        console.log("Token refreshed successfully");
        return response.data;
      } catch (error) {
        set({
          isRefreshingToken: false,
          refreshPromise: null,
        });

        console.error("Token refresh failed:", error);

        // ЛЮБАЯ ошибка refresh = принудительный logout
        if (error.response?.status === 401 || error.response?.status === 403) {
          console.log("Refresh token expired, logging out...");
          await get().logout();
        }
        throw error;
      }
    };

    const promise = refreshOperation();
    set({ refreshPromise: promise });

    return promise;
  },

  // Logout с полной очисткой
  logout: async () => {
    const state = get();

    // Предотвращаем множественные одновременные logout
    if (state.isLoggingOut) {
      return;
    }

    try {
      set({ isLoggingOut: true });

      // Синхронно очищаем ВСЕ состояния
      set({
        user: null,
        allUsers: [],
        isLoggedOut: true,
        isLoggingOut: false,
        isAuthenticated: false,
        isRefreshingToken: false,
        refreshPromise: null,
        email: "",
        fio: "",
        password: "",
        confirmPassword: "",
        phone_number: "",
        showConfirmation: false,
        code: "",
        isLoadingUser: false,
      });

      // Очищаем ВСЕ storage
      safeStorage.removeItem("user");
      Cookies.remove("logged_in");

      // API call делаем последним (на случай ошибки)
      await api.post(`/auth/logout`, {}, { withCredentials: true });

      console.log("Logout completed successfully");
    } catch (error) {
      console.error("Ошибка при выходе:", error);
      // Все равно очищаем локальное состояние даже при ошибке API
    } finally {
      // Final cleanup и redirect
      window.location.href = "/";
    }
  },

  // Получение списка пользователей (только для админов)
  fetchUsers: async () => {
    await get().checkAuthAndExecute(async () => {
      try {
        const response = await api.get(`/user`);
        set({ allUsers: response.data });
        return response.data;
      } catch (error) {
        toast.error(
          "Ошибка при загрузке пользователей: " +
            (error.response?.data?.message || error.message)
        );
        console.error("Error fetching users:", error);
        throw error;
      }
    });
  },

  // Очистка store (для тестов и development)
  clearStore: () => {
    set({
      user: null,
      allUsers: [],
      isLoggedOut: false,
      isRefreshingToken: false,
      refreshPromise: null,
      isLoggingOut: false,
      email: "",
      fio: "",
      password: "",
      confirmPassword: "",
      phone_number: "",
      showConfirmation: false,
      code: "",
      isAuthenticated: false,
      isLoadingUser: false,
    });
  },
}));

export default useUserStore;
