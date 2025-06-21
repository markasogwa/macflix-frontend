import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ user: null, token: null });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      const stored = localStorage.getItem("user");
      if (!stored) {
        setLoading(false);
        return;
      }

      const parsed = JSON.parse(stored);
      const { user, token } = parsed;

      if (!user || !token) {
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get("/api/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
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

  const login = async ({ user, token }) => {
    localStorage.setItem("user", JSON.stringify({ user, token }));
    setAuth({ user, token });
  };

  const logout = () => {
    localStorage.removeItem("user");
    setAuth({ user: null, token: null });
    toast.success("You have Logged out from your account successfully");
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
