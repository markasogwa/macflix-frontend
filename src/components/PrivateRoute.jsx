import { Navigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

export const PrivateRoute = ({ children }) => {
  const {
    auth: { user },
    loading,
  } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    // User is not authenticated, redirect to login page
    return <Navigate to="/login" replace />;
  }

  // User is authenticated, render the children components
  return children;
};
