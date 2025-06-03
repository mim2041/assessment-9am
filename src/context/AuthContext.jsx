import React, { createContext, useContext, useState, useEffect } from "react";
import { authService } from "../services/auth.service";
import { tokenStorage } from "../utils/tokenStorage";

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = tokenStorage.getAccessToken();
      if (token) {
        const userData = await authService.getProfile();
        setUser(userData);
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      tokenStorage.clearTokens();
    } finally {
      setLoading(false);
    }
  };

  const signin = async (credentials) => {
    try {
      setError(null);
      const { user } = await authService.signin(credentials);
      setUser(user);
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.error || "Sign in failed";
      setError(message);
      return { success: false, error: message };
    }
  };

  const signup = async (userData) => {
    try {
      setError(null);
      await authService.signup(userData);
      return { success: true };
    } catch (error) {
      console.error("Signup error:", error);
      const message = error.response?.data?.error || "Sign up failed";
      const details = error.response?.data;
      setError(message);
      return { success: false, error: message, details };
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
      tokenStorage.clearTokens();
      setUser(null);
    }
  };

  const value = {
    user,
    loading,
    error,
    signin,
    signup,
    logout,
    checkAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
