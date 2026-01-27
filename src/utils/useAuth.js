// utils/useAuth.js
import { useEffect, useState } from "react";

export const useAuth = () => {
  const [state, setState] = useState({
    loading: true,
    authenticated: false,
  });

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/accounts/user-profile-details/`, {
      credentials: "include",
    })
      .then((res) => {
        if (res.ok) {
          setState({ loading: false, authenticated: true });
        } else {
          throw new Error();
        }
      })
      .catch(() => {
        setState({ loading: false, authenticated: false });
      });
  }, []);

  return state;
};
