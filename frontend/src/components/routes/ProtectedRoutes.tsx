import React, { FC } from "react";
import { LoginRedirect } from "../common";
import { Outlet } from "react-router-dom";

interface IProtectedRoutes {
  isAuth: boolean;
}

const ProtectedRoutes: FC<IProtectedRoutes> = ({ isAuth }) => {
  console.log("isAuth", isAuth);
  if (!isAuth) {
    return <LoginRedirect />;
  }
  return <Outlet />;
};

export default ProtectedRoutes;
