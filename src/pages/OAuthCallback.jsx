import { React, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function OAuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
  if (localStorage.getItem("oauth_done")) return;

  localStorage.setItem("oauth_done", "true");

  const params = new URLSearchParams(window.location.search);

  const access = params.get("access");
  const refresh = params.get("refresh");
  const profileComplete = params.get("profile_complete") === "true";

  if (!access || !refresh) {
    navigate("/login", { replace: true });
    return;
  }

  localStorage.setItem("access", access);
  localStorage.setItem("refresh", refresh);
  localStorage.setItem("isProfileComplete", String(profileComplete));
  localStorage.setItem("isGoogle", "true");

  navigate(
    profileComplete ? "/profile" : "/login?completeProfile=true",
    { replace: true }
  );
}, [navigate]);
localStorage.removeItem("oauth_done");


  return <div>Signing you in…</div>;
}
