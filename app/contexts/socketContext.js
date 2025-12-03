"use client";

import { useUser } from "./userContext";
import { io } from "socket.io-client";
import { useContext, createContext, useRef, useEffect } from "react";

const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const { user } = useUser();
  const socketRef = useRef(null);

  useEffect(() => {
    console.log("User object in socket's useEffect", user);
    if (!user) return;

    if (!socketRef.current) {
      socketRef.current = io("http://localhost:8080", {
        auth: { token: { id: user.userId, type: user.type } },
        transports: ["websocket"],
      });
    }

    socketRef.current.on("connect", () => {
      console.log(
        `Connected socket id(${socketRef.current.id}) for user id (${user.userId})`
      );
    });

    console.log("socket id socket's useEffect", socketRef.current.id);

    socketRef.current.on("disconnect", () => {
      console.log(
        `Disconnected socket id (${socketRef.current?.id}) for user id (${user.userId})`
      );
    });

    return () => {
      console.log("cleanup function running...");
      socketRef.current.disconnect();
      socketRef.current = null;
    };
  }, [user]);

  return (
    <SocketContext.Provider value={socketRef.current}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
