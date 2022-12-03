import { HOME, PUBLIC_FEEDS } from "@/constants/routes";
import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const LoginRedirect = () => {
  const { pathname, search } = useLocation();
  const redirect = encodeURIComponent(pathname + search);

  if (pathname === HOME) {
    const redirect = encodeURIComponent(pathname + search);
    return <Navigate to={`${PUBLIC_FEEDS}?redirect=${redirect}`} />;
  }

  const loginLink = `/login?redirect=${redirect}`;
  return <Navigate to={loginLink} replace />;
};

export default LoginRedirect;
