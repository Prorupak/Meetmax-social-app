import { Button, ConditionallyRender, Input } from "@/components/common";
import StandAloneLayout from "@/components/layout/standAloneLayout/StandALoneLayout";
import { LOGIN } from "@/constants/routes";
import { useResetPasswordMutation } from "@/features/auth/authApiSlice";
import { useQueryParams } from "@/hooks";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { BsEye, BsEyeSlash, BsLock } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { usePageTitle } from "@/hooks";

import * as Yup from "yup";

interface IResetPasswordProps {
  password: string;
  token: string;
  user_id: string;
}

interface ISubmitProps {
  password: string;
  repeatPassword: string;
}

const PasswordReset: FC = () => {
  const formSchema = Yup.object().shape({
    password: Yup.string()
      .required("Password is required.")
      .min(6, "Password must be at 6 char long")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
        "Password must contain at least 1 uppercase, 1 lowercase, 1 number and 1 special character.",
      ),
    repeatPassword: Yup.string()
      .required("Password is required.")
      .oneOf([Yup.ref("password")], "Passwords does not match"),
  });
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const params = useQueryParams();

  const { t } = useTranslation();
  const navigate = useNavigate();
  usePageTitle("Recover Password | NextGen");

  const {
    register,
    handleSubmit,
    setFocus,
    reset,
    formState: { errors },
  } = useForm<ISubmitProps>({
    mode: "onChange",
    resolver: yupResolver(formSchema),
  });

  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const onSubmit = handleSubmit(async ({ password }: ISubmitProps) => {
    try {
      const token = params.get("token");
      const user_id = params.get("user_id");
      if (token && user_id) {
        await resetPassword({
          password,
          token,
          user_id,
        } as IResetPasswordProps);
        toast.promise(
          resetPassword({
            password,
            token,
            user_id,
          } as IResetPasswordProps),
          {
            loading: "Resetting password...",
            success: "Password reset successfully",
            error: "Error resetting password",
          },
        );
        navigate(LOGIN);
      } else {
        toast.error("Error resetting password");
      }
    } catch (error) {
      console.log("error", error);
    }
  });

  useEffect(() => {
    setFocus("password", {
      shouldSelect: true,
    });
  }, []);

  const togglePasswordVisible = () => {
    setPasswordVisible(prev => !prev);
  };

  return (
    <StandAloneLayout>
      <div className="flex w-full flex-col">
        <div className="flex flex-col items-center">
          <h2>Reset Password</h2>

          <span className="mt-6 text-center font-light leading-tight text-gray-700">
            Please provide your email address. If it exists in the system
            we&apos;ll send a new reset link.
          </span>
        </div>
        <form
          className="mt-6 flex flex-col items-center space-y-4"
          onSubmit={onSubmit}>
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
                {errors?.password?.message}
              </p>
            )}
          </div>

          <div className="  w-full">
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <BsLock className="h-5 w-5 text-gray-400" />
              </div>
              <Input
                type="password"
                name="repeatPassword"
                label="repeatPassword"
                register={register}
                required
                className="p-2.5 pl-10 text-start placeholder:text-sm"
                readOnly={isLoading}
                placeholder="Repeat New Password"
              />
            </div>
            {errors.repeatPassword && (
              <p className="mt-2 ml-3 text-sm text-red-600 dark:text-red-500">
                <span className="font-medium">{t("common:oops")}</span>
                {errors?.repeatPassword?.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full"
            isLoading={isLoading}
            buttonType="primary"
            size="medium"
            disabled={
              isLoading ||
              (Boolean(errors.password) && Boolean(errors.repeatPassword))
            }>
            <span className="text-white">Reset Password</span>
          </Button>
        </form>
      </div>
    </StandAloneLayout>
  );
};

export default PasswordReset;
