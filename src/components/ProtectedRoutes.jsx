import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

const isTokenExpired = (token) => {
  if (!token) {
    // No token provided, consider it as expired
    return true;
  }

  const decodedToken = JSON.parse(atob(token.split(".")[1]));
  if (decodedToken.exp) {
    const currentTime = Math.floor(Date.now() / 1000);
    return decodedToken.exp < currentTime;
  } else {
    return true;
  }
};

const ProtectedRoutes = () => {
  const user = JSON.parse(sessionStorage.getItem("user"));
  const token = user ? user.access_token : null;
  const [tokenExpired, setTokenExpired] = useState(false);

  useEffect(() => {
    const checkTokenExpiration = () => {
      if (isTokenExpired(token)) {
        setTokenExpired(true);
      }
    };

    checkTokenExpiration();
  }, [token]);

  return tokenExpired ? (
    <Navigate to="/login" />
  ) : token ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  );
};

export default ProtectedRoutes;
