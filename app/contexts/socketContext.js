"use client";

import { useUser } from "./userContext";
import { io } from "socket.io-client";
import { useContext, createContext, useEffect, useState } from "react";

const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const { user } = useUser();
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (!user) {
      if (socket) {
        socket.disconnect();
        setSocket(null);
      }
      return;
    }

    if (socket && socket.connected && socket.auth?.token?.id === user.userId) {
      return;
    }

    if (socket) {
      socket.disconnect();
      setSocket(null);
    }

    const newSocket = io("https://digital-queue-management-be.onrender.com", {
      auth: { token: { id: user.userId, type: user.type } },
      transports: ["websocket"],
    });

    newSocket.on("connect", () => {
      console.log("SOCKET CONNECTED", newSocket.id, "for user", user.userId);
    });

    newSocket.on("connect_error", (err) => {
      console.error("SOCKET CONNECT ERROR:", err?.message || err);
    });

    newSocket.on("disconnect", (reason) => {
      console.log("SOCKET DISCONNECTED", newSocket.id, "reason:", reason);
    });

    setSocket(newSocket);

    return () => {
      newSocket.off("connect");
      newSocket.off("connect_error");
      newSocket.off("disconnect");
    };
  }, [user]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
