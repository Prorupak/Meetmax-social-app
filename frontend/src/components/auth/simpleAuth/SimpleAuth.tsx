import React, { FC } from "react";
import { useForm } from "react-hook-form";
import { useEmailLoginMutation } from "@/features/auth/authApiSlice";
import { useNavigate } from "react-router-dom";
import { Button, ConditionallyRender, Input, Logo } from "@/components/common";
import StandAloneLayout from "@/components/layout/standAloneLayout/StandALoneLayout";
import SocialAuth from "../SocialAuth/SocialAuth";
import { BsPerson } from "react-icons/bs";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import { simpleAuthSchema } from "@/validations/authValidations";
import { CustomError } from "@/types/types";
import toast from "react-hot-toast";

interface ISubmitProps {
  username: string;
}

interface ISimpleAuth {
  redirect: string;
}

const SimpleAuth: FC<ISimpleAuth> = ({ redirect }) => {
  const [simpleAuth, { isLoading, error, isError }] = useEmailLoginMutation();
  const errorMessage = (error as CustomError)?.data;

  const { t } = useTranslation();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISubmitProps>({
    resolver: yupResolver(simpleAuthSchema),
  });

  const onSubmit = handleSubmit(async ({ username }: ISubmitProps) => {
    try {
      console.log("error", errorMessage);

      const { redirect } = await simpleAuth({ username }).unwrap();
      navigate(`/login${redirect}`);
    } catch (e: unknown) {
      console.log(e);
      toast.error(errorMessage?.error?.message);
    }
  });

  return (
    <>
      <form
        onSubmit={onSubmit}
        className="flex flex-col items-center space-y-3">
        <ConditionallyRender
          condition={isError}
          show={
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
                {errorMessage?.error?.message
                  ? t("login:simpleLoginError")
                  : null}
              </div>
            </div>
          }
        />
        <div className="w-full">
          <label
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            htmlFor="username">
            {t("common:usernameOrEmail")}
          </label>
          <div className="relative flex items-center">
            <BsPerson className="absolute z-20 ml-2 h-5 w-5 text-gray-700 dark:text-gray-300" />
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

        <Button
          type="submit"
          buttonType="primary"
          widthFull
          isLoading={isLoading}
          size="medium">
          <span className="text-white">Next</span>
        </Button>
      </form>
    </>
  );
};

export default SimpleAuth;
