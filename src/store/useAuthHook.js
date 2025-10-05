import { useEffect } from "react";
import useUserStore from "../store/userStore";

export const useAuthSync = () => {
  useEffect(() => {
    // Инициализация при загрузке приложения
    useUserStore.getState().initialize();

    // Настройка синхронизации между вкладками
    const cleanupSync = useUserStore.getState().initializeAuthSync();

    // Обработка изменения размера окна (mobile/desktop switch)
    const handleResize = () => {
      setTimeout(() => useUserStore.getState().initialize(), 100);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cleanupSync();
      window.removeEventListener("resize", handleResize);
    };
  }, []);
};
