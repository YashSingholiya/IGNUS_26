import React from "react";
import { Navigate } from "react-router-dom";
import {
  isLoggedIn,
  isProfileComplete,
} from "../utils/cookies";

export default function ProtectedRoute({
  children,
  requireProfile = true,
}) {
  // 🔐 Not logged in
  if (!isLoggedIn()) {
    return <Navigate to="/login" replace />;
  }

  // 🧾 Logged in but profile not complete
  if (requireProfile && !isProfileComplete()) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
