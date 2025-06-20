// AuthProvider.jsx
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ user: null, token: null });
  const [loading, setLoading] = useState(true);

  // Load user on app start
  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem("token");
      const stored = localStorage.getItem("user");
      if (!token || !stored) {
        setLoading(false);
        return;
      }

      try {
        // const parsed = JSON.parse(stored)
        const res = await axios.get("/api/user/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAuth({ user: res.data, token });
      } catch (err) {
        console.error("Error loading user:", err);
        setAuth({ user: null, token: null });
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  // Login function
  const login = async ({ user, token }) => {
    localStorage.setItem("user", JSON.stringify({ user, token }));
    try {
      // const res = await axios.get("/api/user/profile", {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      // });
      setAuth({ user, token });
    } catch (error) {
      console.error(
        "Login failed:",
        error.response ? error.response.data : error.message
      );
      setAuth({ user: null, token: null });
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("token");
    setAuth({ user: null });
    toast.success("You have Logged out from your account successfully");
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
