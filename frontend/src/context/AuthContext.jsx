/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useMemo, useState } from "react";

const AuthContext = createContext(null);

const readStoredUser = () => {
  try {
    const current = JSON.parse(localStorage.getItem("dreamshaadi_user") || "null");
    if (current) return current;
    const legacyName = JSON.parse(localStorage.getItem("loggedInUser") || "null");
    if (!legacyName) return null;
    return {
      name: legacyName,
      email: localStorage.getItem("loggedInEmail") || "",
      role: localStorage.getItem("role") || "couple",
      isAdmin: localStorage.getItem("isAdmin") === "true",
    };
  } catch {
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(readStoredUser);
  const [token, setToken] = useState(() => localStorage.getItem("token") || "");

  const login = (userData, jwtToken) => {
    localStorage.setItem("token", jwtToken);
    localStorage.setItem("dreamshaadi_user", JSON.stringify(userData));
    setToken(jwtToken);
    setUser(userData);
  };

  const logout = () => {
    [
      "token",
      "dreamshaadi_user",
      "loggedInUser",
      "loggedInEmail",
      "isAdmin",
      "role",
      "vendorProfile",
    ].forEach((key) => localStorage.removeItem(key));
    setToken("");
    setUser(null);
  };

  const value = useMemo(() => ({
    user,
    token,
    login,
    logout,
    isLoggedIn: Boolean(token),
    isAdmin: Boolean(user?.isAdmin),
    isVendor: user?.role === "vendor",
  }), [user, token]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
};
