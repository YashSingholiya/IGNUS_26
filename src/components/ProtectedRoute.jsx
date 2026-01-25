import React from "react";
import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const location = useLocation();

  const isLoggedIn = !!localStorage.getItem("access");
  const isProfileComplete =
    localStorage.getItem("isProfileComplete") === "true";

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  // Allow user to stay on login page if profile incomplete
  if (!isProfileComplete && location.pathname !== "/login") {
    return <Navigate to="/login" replace />;
  }

  return children;
}
