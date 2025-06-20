import { useEffect, useState } from "react";
import AppRoutes from "./routes/AppRoutes";

export default function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Retrieve from localStorage when App first loads
  useEffect(() => {
    const stored = localStorage.getItem("user");

    if (stored) {
      const parsed = JSON.parse(stored);
      setUser(parsed.user);
      setToken(parsed.token);
    }
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading...</div>; // or spinner
  }

  return <AppRoutes user={user} token={token} />;
}
