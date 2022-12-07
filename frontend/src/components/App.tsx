import React, { Suspense, useEffect, useRef, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import { Preloader, ToastRenderer } from "@/components/common";
import Error from "@/components/layout/error/Error";
import { Homepage } from "@/components";
import ProtectedRoutes from "@/components/routes/ProtectedRoutes";
import LayoutPicker from "./layout/layoutPicker/LayoutPicker";
import { useAppDispatch, useAppSelector } from "../hooks";
import { RootState } from "@/app/store/store";
import { logOut, setCredentials } from "@/features/auth/authSlice";
import socket from "../socket/socket";
import { useCheckSessionMutMutation } from "../features/auth/authApiSlice";
import PublicRoutes from "./routes/PublicRoutes";
import {
  FORGOT_PASSWORD,
  HOME,
  LOGIN,
  PASSWORD_RESET,
  PUBLIC_FEEDS,
} from "@/constants/routes";
import { Login } from "./auth";
import PublicFeeds from "./publicFeeds/PublicFeeds";
import ForgottenPassword from "./auth/forgottenPassword/ForgottenPassword";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PasswordReset from "./auth/PasswordReset/PasswordReset";

const App = () => {
  const user = useAppSelector(({ root }: RootState) => root.auth?.id);
  const isAuth = Boolean(user);
  const effectRan = useRef<boolean>(false);
  const [success, setSuccess] = useState<boolean>(true);

  const [check] = useCheckSessionMutMutation();

  const dispatch = useAppDispatch();
  useEffect(() => {
    if (effectRan.current === true) {
      (async () => {
        try {
          const { user } = await check().unwrap();
          if (user?.id) {
            dispatch(setCredentials(user));
            socket.emit("useConnect", user.id);
            setSuccess(false);
          }
        } catch (err: any) {
          console.log("err", err?.data?.error);
          dispatch(logOut());
          setSuccess(false);
        }
      })();
    }
    return () => {
      effectRan.current = true;
    };
  }, []);

  return success ? (
    <Preloader />
  ) : (
    <ErrorBoundary FallbackComponent={Error}>
      <Suspense fallback={<Preloader />}>
        <div>
          <ToastRenderer />
          <Routes>
            {/* -------PUBLIC ROUTES-------- */}
            <Route element={<LayoutPicker isStandAlone={true} />}>
              <Route element={<PublicRoutes isAuth={isAuth} />}>
                <Route path={LOGIN} element={<Login />} />
                {/* <Route path={REGISTER} element={<Register />} /> */}
                <Route path={FORGOT_PASSWORD} element={<ForgottenPassword />} />
                <Route path={PUBLIC_FEEDS} element={<PublicFeeds />} />
                <Route path={PASSWORD_RESET} element={<PasswordReset />} />
              </Route>
            </Route>
            {/* -------PROTECTED ROUTES-------- */}
            <Route element={<LayoutPicker isStandAlone={false} />}>
              <Route element={<ProtectedRoutes isAuth={isAuth} />}>
                <Route path={HOME} element={<Homepage />} />
              </Route>
            </Route>
            {/* if user is not authenticated redirect to public feed page */}
            <Route element={!isAuth ? <Navigate to={PUBLIC_FEEDS} /> : null} />
            {/* ------404 PAGE----- */}
            <Route path="*" element={<h1>NOT FOUND</h1>} />
          </Routes>
        </div>
      </Suspense>
    </ErrorBoundary>
  );
};

export default App;
