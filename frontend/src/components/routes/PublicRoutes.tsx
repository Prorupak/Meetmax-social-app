import React, { FC } from "react";
import { Outlet } from "react-router-dom";

interface IPublicRoutes {
  isAuth: boolean;
}

const PublicRoutes: FC<IPublicRoutes> = ({ isAuth }) => {
  return <Outlet />;
};

export default PublicRoutes;
