"use client";
import { createContext, useContext, useState, useEffect } from "react";


const userContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true)
  const login = (data) => {
     setUser(data);
     localStorage.setItem("user", JSON.stringify(data))
  };
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user")
  };
  useEffect(() => {
    const storeUser = localStorage.getItem("user")
    if(storeUser) {
        setUser(JSON.parse(storeUser))
    }
    setLoading(false)
  }, [])
  return (
    <userContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </userContext.Provider>
  );
};

export const useUser = () => {
  return useContext(userContext);
};
