import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { baseurl } from "../Urls";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const res = await axios.get(`${baseurl}/api/auth/verify`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          console.log(isAuthenticated);
          // console.log(res.data.user);
          setUser(res.data.user);
          // console.log(user);
          setIsAuthenticated(res.data.isAuthenticated);
        }
        setLoading(false);
      } catch (error) {
        setIsAuthenticated(false);
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };
  const login = (token) => {
    localStorage.setItem("token", token);

    setIsAuthenticated(true);
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, loading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
