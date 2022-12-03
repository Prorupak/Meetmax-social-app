import { useLoginMutation } from "@/features/auth/authApiSlice";
import { useAppDispatch, useQueryParams } from "@/hooks";
import socket from "@/socket/socket";
import { CustomError } from "@/types/types";
import React, { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { parseRedirectParams } from "../login/parseRedirectParams";
import { yupResolver } from "@hookform/resolvers/yup";
import Schema from "@/validations/authValidations";
import { useForm } from "react-hook-form";
import { setCredentials } from "@/features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import {
  EyeIcon,
  EyeSlashIcon,
  LockClosedIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { Button, Input } from "@/components/common";
import { FORGOT_PASSWORD, REGISTER } from "@/constants/routes";
import Links from "@/components/common/utility/Links";
import SocialAuth from "../SocialAuth/SocialAuth";
import toast from "react-hot-toast";

interface IPasswordAuth {
  redirect: string;
}

interface ISubmitProps {
  username: string;
  password: string;
}

const PasswordAuth: FC<IPasswordAuth> = ({ redirect }) => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [login, { isError, isLoading, error, isSuccess }] = useLoginMutation();
  const errorMessage = (error as CustomError)?.data;
  const query = useQueryParams();
  const auth_details = query.get("auth_details") as string;

  const toggleViewPasswordOnHold = () => {
    setShowPassword(prev => !prev);
  };
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<ISubmitProps>({
    resolver: yupResolver(Schema),
  });

  // console.log("reg", setValue("username", {}));

  useEffect(() => {
    setValue("username", auth_details);
  }, []);

  const onSubmit = handleSubmit(async (props: ISubmitProps) => {
    const { user } = await login(props).unwrap();

    toast.promise(login(props), {
      loading: "loading",
      error: errorMessage?.error?.message,
      success: `${t("common:welcomeBack")}, ${user.firstName}!`,
    });

    if (user.id) {
      dispatch(setCredentials(user));
      socket.emit("userConnect", user.id);
      navigate(parseRedirectParams(redirect), { replace: true });
    }
  });
  return (
    <>
      <form className="space-y-4" onSubmit={onSubmit}>
        {isError && (
          <div
            className="mb-4 flex rounded-lg bg-red-100 p-4 text-sm text-red-700 dark:bg-red-200 dark:text-red-800"
            role="alert">
            <svg
              aria-hidden="true"
              className="mr-3 inline h-5 w-5 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"></path>
            </svg>
            <span className="sr-only">Info</span>
            <div>
              {errorMessage?.error?.message ? t("login:loginError") : null}
            </div>
          </div>
        )}

        <div>
          <label
            className="mb-2 block text-sm font-medium capitalize text-gray-900 dark:text-white"
            htmlFor="username">
            {t("common:usernameOrEmail")}
          </label>
          <div className="relative flex items-center">
            <UserIcon className="absolute z-20 ml-2 h-5 w-5 text-gray-700 dark:text-gray-300" />
            <Input
              className="pl-8"
              size="medium"
              type="text"
              {...register("username")}
              placeholder="John_doe, John123 or john_doe123@gmail.com"
            />
          </div>
          {errors.username && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
              <span className="font-medium">{t("common:oops")}</span>{" "}
              {errors?.username?.message ? t("login:usernameRequired") : null}
            </p>
          )}
        </div>
        <div>
          <label
            className="mb-2 block text-sm font-medium capitalize text-gray-900 dark:text-white"
            htmlFor="password">
            {t("common:password")}
          </label>
          <div className="relative flex items-center">
            <LockClosedIcon className="absolute z-20 ml-2 h-5 w-5 text-gray-700 dark:text-gray-300" />
            <Input
              className="pl-8"
              size="medium"
              autoComplete="false"
              type={showPassword ? "text" : "text"}
              {...register("password")}
              placeholder="••••••••"
            />

            {showPassword ? (
              <EyeSlashIcon
                className="absolute right-3 z-20 ml-2 h-5 w-5 cursor-pointer text-gray-700 dark:text-gray-300"
                onClick={toggleViewPasswordOnHold}
              />
            ) : (
              <EyeIcon
                className="absolute right-3 z-20 ml-2 h-5 w-5 cursor-pointer text-gray-700 dark:text-gray-300"
                onClick={toggleViewPasswordOnHold}
              />
            )}
          </div>

          {errors.password && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
              <span className="font-medium">{t("common:oops")}</span>{" "}
              {errors?.password?.message ? t("login:passwordRequired") : null}
            </p>
          )}
        </div>
        {errorMessage?.status_code === 401 ? (
          <div className="flex items-center justify-between">
            <Links
              className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
              to={FORGOT_PASSWORD}>
              {t("login:forgetYourPassword")}
            </Links>
          </div>
        ) : null}
        <div className="flex flex-col items-center gap-3">
          <Button
            buttonType="primary"
            widthFull
            size="large"
            isLoading={isLoading}
            type="submit">
            <span className="text-white">{t("login:signIn")}</span>
          </Button>
        </div>
      </form>
    </>
  );
};

export default PasswordAuth;
