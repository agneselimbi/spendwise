import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function ProtectedRoute({ children }) {
  const { user } = useAuth(); //equivalent to const {user} = useContext(AuthContext)
  // while loading you could return a spinner…
  if (user === null || !user) return <Navigate to="/login" />;
  return children;
}
