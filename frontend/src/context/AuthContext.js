import React, { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = () => {
      const loggedInUser = localStorage.getItem("user");
      if (loggedInUser) {
        setUser(JSON.parse(loggedInUser));
      }
      setLoading(false);
    };

    window.onload = loadUser();


    return () => {
      window.onload = null;
    };
  }, []);
  const login = async (name, password) => {
    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, password }),
      });

      const data = await response.json();

      console.log(data.id, "    lllaa    ", data);
      if (response.ok) {
        setUser({ name, password, id: data.id });
        localStorage.setItem(
          "user",
          JSON.stringify({ name, password, id: data.id })
        );
        toast.success("Logged in successfully");
        return { success: true };
      } else {
        toast.error(data.message);
        return { success: false, message: data.message };
      }
    } catch (error) {
      return {
        success: false,
        message: "Server error, please try again later",
      };
    }
  };

  const signup = async (name, email, password) => {
    try {
      const response = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        setUser({ name, password, id: data.id });
        localStorage.setItem(
          "user",
          JSON.stringify({ name, password, id: data.id })
        );
        toast.success("Signed up successfully");
        return { success: true };
      } else {
        toast.error(data.message);
        return { success: false, message: data.message };
      }
    } catch (error) {
      return {
        success: false,
        message: "Server error, please try again later",
      };
    }
  };

  const logout = () => {
    setUser(null);
    toast.success("Logged out successfully");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
