import { CustomError, IUser } from "@/types/types";
import {
  useCheckSessionMutMutation,
  useCheckSessionQuery,
} from "@/features/auth/authApiSlice";
import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { RootState } from "@/app/store/store";
import socket from "@/socket/socket";
import { logOut, setCredentials } from "@/features/auth/authSlice";

interface IUseAuthUserOutput {
  user?: IUser;
  isLoading: boolean;
  error?: CustomError | unknown;
}

export const useAuthUser = (): IUseAuthUserOutput => {
  const isEffectRan = useRef<boolean>(false);
  const dispatch = useAppDispatch();
  const [check, { data, isLoading, error }] = useCheckSessionMutMutation();
  const user = useAppSelector(({ root }: RootState) => root?.auth?.id);
  // const user = auth.data && "user" in auth.data ? auth.data.user : undefined;
  const isHasID = Boolean(user);

  useEffect(() => {
    if (isEffectRan.current === true) {
      const checkSession = async () => {
        try {
          const { user } = await check().unwrap();
          if (user?.id) {
            dispatch(setCredentials(user));
            socket.emit("useConnect", user.id);
          }
        } catch (err: any) {
          console.log("err", err?.message);
          dispatch(logOut());
        }
      };
      if (isHasID) checkSession();
    }
    return () => {
      isEffectRan.current = true;
    };
  }, [isHasID]);

  return {
    user: data && "user" in data ? data.user : undefined,
    isLoading,
    error,
  };
};
