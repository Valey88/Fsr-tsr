import { useEffect, useRef } from "react";
import useChatStore from "@/store/chatStore";

const useWebSocket = (url) => {
  const ws = useRef(null);
  const {
    setWebSocketConnection,
    setConnectionStatus,
    addMessage,
    updateMessage,
    removeMessage,
    replaceTempMessage,
    markMessagesAsRead,
    setFragments,
    currentChat,
  } = useChatStore();

  useEffect(() => {
    //Создание соедененния

    ws.current = new WebSocket(url);
    setWebSocketConnection(ws.current);

    //обработчик открытияя соеденения

    ws.current.onopen = () => {
      console.log("Websocket connected");
      setConnectionStatus(true);
    };

    //обработчик получения сообщения

    ws.current.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        handleWebsocketMessage(data);
      } catch (error) {
        console.error("error parsing Websocket message:", error);
      }
    };

    //обработчик ошибок

    ws.current.onerror = (error) => {
      console.error("Websocket error:", error);
      setConnectionStatus(false);
    };

    //обработчик закрытия соеденения

    ws.current.onclose = () => {
      console.log("Websocket disconnected");
      setConnectionStatus(false);
    };

    // отчистка при размонтировании

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, [url]);
};
export default useWebSocket;
