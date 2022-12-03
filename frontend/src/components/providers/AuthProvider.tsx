import { RootState } from "@/app/store/store";
import { useCheckSessionMutMutation } from "@/features/auth/authApiSlice";
import { logOut, setCredentials } from "@/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/hooks";
import socket from "@/socket/socket";
import React, { FC, ReactNode, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { LoginRedirect, Preloader } from "../common";

const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const effectRan = useRef<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const user = useAppSelector(({ root }: RootState) => root.auth?.id);
  const isAuth = Boolean(user);
  const [check, { isError, isSuccess, isUninitialized, isLoading }] =
    useCheckSessionMutMutation();

  const loginRedirect = () => {
    if (!isAuth) {
      return <LoginRedirect />;
    }
  };

  const dispatch = useAppDispatch();
  useEffect(() => {
    if (effectRan.current === true) {
      const checkSession = async () => {
        try {
          const { user } = await check().unwrap();
          if (user?.id) {
            dispatch(setCredentials(user));
            socket.emit("useConnect", user.id);
            setSuccess(true);
          }
        } catch (err: any) {
          console.log("err", err?.data?.error);
          dispatch(logOut());
          setSuccess(false);
        }
      };

      if (!isAuth) checkSession();
    }
    return () => {
      effectRan.current = true;
    };
  }, []);

  let content;
  if (isLoading) {
    content = <Preloader />;
  } else if (isError) {
    content = (
      <>
        <Link to="/login">Login</Link>
      </>
    );
  } else if (isSuccess && success) {
    content = children;
  } else if (isAuth && isUninitialized) {
    content = children;
  }

  return <>{content}</>;
};

export default AuthProvider;
