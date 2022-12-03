import { RootState } from "@/app/store/store";
import { FORGOT_PASSWORD, LOGIN, REGISTER } from "@/constants/routes";
import { useAppSelector } from "@/hooks";
import { useAuthUser } from "@/hooks/api/useAuthUser/useAuthUser";
import React from "react";
import { useLocation, Navigate } from "react-router-dom";
import { matchPath } from "react-router-dom";
import { routes } from "../routes/routes";

const PublicFeedsRedirect = () => {
  const { pathname, search } = useLocation();
  const { user, isLoading, error } = useAuthUser();

  const publicRoutes = routes.filter(route => {
    return route.type === "public";
  });

  if (!user && isLoading) {
    return null;
  }

  const isAuth = Boolean(user);

  if (isAuth) {
    return null;
  }

  const redirect = encodeURIComponent(pathname + search);
  const loginLink = `${LOGIN}?redirect=${redirect}`;

  const pathNotToRedirect = [loginLink, ...publicRoutes];

  const isPathNotToRedirect = pathNotToRedirect.some(path => {
    return matchPath(path, pathname);
  });

  if (isPathNotToRedirect) {
    return null;
  }

  if (matchPath("/public-feed", pathname)) {
    return null;
  }

  return <Navigate to="/public-feed" replace />;
};

export default PublicFeedsRedirect;
