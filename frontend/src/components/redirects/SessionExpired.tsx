import { RootState } from "@/app/store/store";
import { useAppSelector } from "@/hooks";
import { useAuthUser } from "@/hooks/api/useAuthUser/useAuthUser";
import React, { FC, useEffect, useRef } from "react";
import { Link, Route, Routes } from "react-router-dom";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { ConditionallyRender, LoginRedirect, Preloader } from "../common";
import LayoutPicker from "../layout/layoutPicker/LayoutPicker";
import ProtectedRoutes from "../routes/ProtectedRoutes";
import PublicRoutes from "../routes/PublicRoutes";
import { routes } from "../routes/routes";

interface ISessionExpiredProps {
  isAuth: boolean;
  success: boolean;
}

const SessionExpired: FC<ISessionExpiredProps> = ({ isAuth, success }) => {
  const availableRoutes = !isAuth
    ? routes.filter(route => route.type === "public")
    : routes;

  const availableRoutesRef = useRef(availableRoutes);

  useEffect(() => {
    availableRoutesRef.current = availableRoutes;
  }, [routes, availableRoutesRef]);

  console.log("filteredPublicRoutes", availableRoutes);

  return (
    <ConditionallyRender
      condition={!isAuth}
      show={
        <Routes>
          {availableRoutes.map(route => (
            <Route
              key={route.path}
              path={route.path}
              element={
                <LayoutPicker isStandAlone={route.isStandalone === true}>
                  <PublicRoutes route={route} />
                </LayoutPicker>
              }
            />
          ))}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      }
      elseShow={<Preloader />}
    />
  );
};

export default SessionExpired;
