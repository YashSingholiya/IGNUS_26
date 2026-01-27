// utils/cookies.js

export const getCookie = (name) => {
  if (!document.cookie) return null;

  const cookies = document.cookie.split("; ").reduce((acc, curr) => {
    const [key, value] = curr.split("=");
    acc[key] = decodeURIComponent(value);
    return acc;
  }, {});

  return cookies[name] ?? null;
};

export const isLoggedIn = () => getCookie("LoggedIn") === "true";
export const isGoogleUser = () => getCookie("isGoogle") === "true";
export const isProfileComplete = () => getCookie("isProfileComplete") === "true";
export const isCA = () => getCookie("isCA") === "true";
export const getIgnusID = () => getCookie("ignusID");

export const clearAuthCookies = () => {
  [
    "access",
    "refresh",
    "LoggedIn",
    "isGoogle",
    "isProfileComplete",
    "isCA",
    "ignusID",
  ].forEach((cookie) => {
    document.cookie = `${cookie}=; Max-Age=0; path=/`;
  });
};
