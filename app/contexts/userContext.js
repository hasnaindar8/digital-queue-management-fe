"use client";
import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = (data) => {
    setUser(data);
    localStorage.setItem("user", JSON.stringify(data));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  useEffect(() => {
    const storeUser = localStorage.getItem("user");

    if (storeUser && storeUser !== "undefined" && storeUser !== "null") {
      try {
        setUser(JSON.parse(storeUser));
      } catch (err) {
        console.error("Invalid user in localStorage, clearing it...");
        localStorage.removeItem("user");
      }
    }

    setLoading(false);
  }, []);

  return (
    <UserContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
