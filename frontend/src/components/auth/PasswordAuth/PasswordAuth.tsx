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
import { Button, ConditionallyRender, Input } from "@/components/common";
import toast from "react-hot-toast";
import { BsEye, BsEyeSlash, BsLock, BsPerson } from "react-icons/bs";

interface IPasswordAuth {
  redirect: string;
}

interface ISubmitProps {
  username: string;
  password: string;
}

const PasswordAuth: FC<IPasswordAuth> = ({ redirect }) => {
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [login, { isError, isLoading, error }] = useLoginMutation();
  const errorMessage = (error as CustomError)?.data;
  const query = useQueryParams();
  const auth_details = query.get("auth_details") as string;

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

  const togglePasswordVisible = () => {
    setPasswordVisible(prev => !prev);
  };
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

        <div className="  w-full">
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <BsPerson className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              type="text"
              name="username"
              label="username"
              register={register}
              required
              className="p-2.5 pl-10 text-start placeholder:text-sm"
              readOnly={isLoading}
              placeholder="Username or Email Address"
            />
          </div>
          <ConditionallyRender
            condition={Boolean(errors.username)}
            show={
              <p className="mt-2 ml-3 text-sm text-red-600 dark:text-red-500">
                <span className="font-medium">{t("common:oops")}</span>
                <ConditionallyRender
                  condition={Boolean(errors.username?.message)}
                  show={t("login:passwordRequired")}
                />
              </p>
            }
          />
        </div>
        <div className="  w-full">
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <BsLock className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              type={isPasswordVisible ? "text" : "password"}
              name="password"
              label="password"
              register={register}
              required
              className="p-2.5 pl-10 text-start placeholder:text-sm"
              readOnly={isLoading}
              placeholder="New Password"
            />
            <button
              type="button"
              className="absolute inset-y-0  right-0  flex cursor-pointer items-center pr-3"
              onClick={togglePasswordVisible}>
              <ConditionallyRender
                condition={isPasswordVisible}
                show={<BsEye className="h-6 w-6 text-gray-500" />}
                elseShow={<BsEyeSlash className="h-6 w-6 text-gray-500" />}
              />
            </button>
          </div>
          {errors.password && (
            <p className="mt-2 ml-3 text-sm text-red-600 dark:text-red-500">
              <span className="font-medium">{t("common:oops")}</span>{" "}
              {errors?.password?.message ? t("login:passwordRequired") : null}
            </p>
          )}
        </div>
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
