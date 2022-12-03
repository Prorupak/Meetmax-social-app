import React, { lazy, Suspense } from "react";
import { useForm } from "react-hook-form";
import { useRegisterMutation } from "@/features/auth/authApiSlice";
import { CustomError, ILogin } from "@/types/types";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { LOGIN } from "@/constants/routes";
import {
  AtSymbolIcon,
  LockClosedIcon,
  UserCircleIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { yupResolver } from "@hookform/resolvers/yup";
import { RegSchema } from "@/validations/authValidations";

import { usePageTitle } from "@/hooks";
import { RequiredFieldBadge } from "@/components/common";
import StandAloneLayout from "@/components/layout/standAloneLayout/StandALoneLayout";

const Logo = lazy(() => import("@/components/common/shared/logo/Logo"));

const Register = () => {
  return (
    <StandAloneLayout>
      <section className="mx-auto w-screen max-w-screen-laptop laptop:w-screen">
        <div className="mx-auto flex flex-col items-center justify-center px-6 py-8 laptop:py-5">
          <Link
            className="mb-6 flex items-center space-x-2 text-2xl font-semibold text-gray-900 dark:text-white"
            to="/">
            <Suspense
              fallback={
                <div className="h-10 w-10 animate-pulse rounded-full bg-dark-200"></div>
              }>
              <Logo className="h-10 w-10" />
            </Suspense>
            <h1 className="text-2xl font-medium">Meetmax</h1>
          </Link>
          <div className="w-full max-w-screen-tablet rounded-lg bg-white shadow-sm dark:border dark:border-gray-700 dark:bg-dark-100/25 tablet:mt-0 desktop:p-0">
            <div className="space-y-4 p-6 tablet:space-y-6 laptop:space-y-6">
              <div className="flex flex-col items-center">
                <h4 className="text-center text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white tablet:text-2xl">
                  {t("login:gettingStarted")}
                </h4>
                <span className="text-center text-base">
                  {t("login:subHeading")}
                </span>
              </div>
              <form className="space-y-4" onSubmit={onSubmit}>
                <hr className="my-5 h-px w-full border-0 bg-gray-600 dark:bg-gray-700" />

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
                      {errorMessage?.message ? t("login:loginError") : null}
                    </div>
                  </div>
                )}

                <div>
                  <label
                    className="mb-2 block text-sm font-medium capitalize text-gray-900 dark:text-white"
                    htmlFor="username">
                    {t("common:username")}
                    <RequiredFieldBadge />
                  </label>
                  <div className="relative flex items-center">
                    <UserIcon className="absolute z-20 ml-2 h-5 w-5 text-gray-700 dark:text-gray-300" />
                    <input
                      className="block w-full rounded-lg border border-gray-300 bg-gray-100 p-3 px-3 py-2 pl-8 text-sm  text-gray-900 focus:border-primary-200 focus:ring-primary-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                      type="text"
                      {...register("username")}
                      placeholder="John_doe or John123"
                    />
                  </div>
                  {errors.username && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                      <span className="font-medium">{t("common:oops")}</span>{" "}
                      {errors.username.message === "required"
                        ? t("login:usernameRequired")
                        : errors.username.message === "alphanumeric"
                        ? t("login:usernameCharactersError")
                        : errors.username.message === "min"
                        ? t("login:usernameMinLengthError")
                        : errors.username.message === "max"
                        ? t("login:usernameMaxLengthError")
                        : errors.username.message === "firstLetter"
                        ? t("login:usernameStartsWithLetterError")
                        : null}
                    </p>
                  )}
                </div>
                <div className="flex w-full flex-col items-center  tablet:flex-row tablet:justify-between">
                  <div className="w-full tablet:w-64">
                    <label
                      className="mb-2 block text-sm font-medium capitalize text-gray-900 dark:text-white"
                      htmlFor="firstName">
                      {t("login:firstName")}
                      <RequiredFieldBadge />
                    </label>
                    <div className="relative flex items-center">
                      <UserCircleIcon className="absolute z-20 ml-2 h-5 w-5 text-gray-700 dark:text-gray-300" />
                      <input
                        className="block w-full rounded-lg border border-gray-300 bg-gray-100 p-3 px-3 py-2 pl-8 text-sm  text-gray-900 focus:border-primary-200 focus:ring-primary-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                        type={"text"}
                        {...register("firstName")}
                        placeholder="John"
                      />
                    </div>

                    {errors.firstName && (
                      <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                        <span className="font-medium">{t("common:oops")}</span>{" "}
                        {errors?.firstName?.message
                          ? t("login:firstNameRequired")
                          : null}
                      </p>
                    )}
                  </div>
                  <div className="mt-4 w-full tablet:mt-0 tablet:w-64">
                    <label
                      className="mb-2 block text-sm font-medium capitalize text-gray-900 dark:text-white"
                      htmlFor="lastName">
                      {t("login:lastName")}
                      <RequiredFieldBadge />
                    </label>
                    <div className="relative flex items-center">
                      <UserCircleIcon className="absolute z-20 ml-2 h-5 w-5 text-gray-700 dark:text-gray-300" />
                      <input
                        className="dark:focus-visible::bg-gray-700 block w-full rounded-lg border border-gray-300 bg-gray-100 p-3 px-3 py-2 pl-8  text-sm text-gray-900 focus:border-primary-200 focus:bg-gray-700 focus:ring-primary-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                        type={"text"}
                        {...register("lastName")}
                        placeholder="Doe"
                      />
                    </div>

                    {errors.lastName && (
                      <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                        <span className="font-medium">{t("common:oops")}</span>{" "}
                        {errors?.lastName?.message
                          ? t("login:lastNameRequired")
                          : null}
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <label
                    className="mb-2 block text-sm font-medium capitalize text-gray-900 dark:text-white"
                    htmlFor="password">
                    {t("common:email")}
                    <RequiredFieldBadge />
                  </label>
                  <div className="relative flex items-center">
                    <AtSymbolIcon className="absolute z-20 ml-2 h-5 w-5 text-gray-700 dark:text-gray-300" />
                    <input
                      className="block w-full rounded-lg border border-gray-300 bg-gray-100 p-3 px-3 py-2 pl-8 text-sm  text-gray-900 focus:border-primary-200 focus:ring-primary-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                      type={"email"}
                      {...register("email")}
                      placeholder="johndoe@gmail.com"
                    />
                  </div>

                  {errors.email && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                      <span className="font-medium">{t("common:oops")}</span>{" "}
                      {errors?.email.message === "Email is required."
                        ? t("login:emailRequired")
                        : errors?.email.message === "Invalid email address."
                        ? t("login:invalidEmailAddress")
                        : null}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    className="mb-2 block text-sm font-medium capitalize text-gray-900 dark:text-white"
                    htmlFor="password">
                    {t("common:password")}
                    <RequiredFieldBadge />
                  </label>
                  <div className="relative flex items-center">
                    <LockClosedIcon className="absolute z-20 ml-2 h-5 w-5 text-gray-700 dark:text-gray-300" />
                    <input
                      className="block w-full rounded-lg border border-gray-300 bg-gray-100 p-3 px-3 py-2 pl-8 text-sm  text-gray-900 focus:border-primary-200 focus:ring-primary-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                      type={"text"}
                      {...register("password")}
                      placeholder="••••••••"
                    />
                  </div>

                  {errors.password && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                      <span className="font-medium">{t("common:oops")}</span>{" "}
                      {errors?.password?.message === "required"
                        ? t("login:passwordRequired")
                        : errors?.password?.message === "minLength"
                        ? t("login:passwordMinLength")
                        : errors?.password?.message === "maxLength" &&
                          t("login:passwordMaxLength")}
                    </p>
                  )}
                </div>

                <button
                  className="w-full rounded-lg bg-primary-200 px-5 py-3 text-center text-sm font-medium capitalize text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  type="submit">
                  {isLoading ? (
                    <svg
                      role="status"
                      className="mr-3 inline h-4 w-4 animate-spin text-white"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="#E5E7EB"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentColor"
                      />
                    </svg>
                  ) : (
                    t("login:signUp")
                  )}
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  {t("login:alreadyHaveAccount")}{" "}
                  <Links className="capitalize" to={LOGIN}>
                    {t("login:signIn")}
                  </Links>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </StandAloneLayout>
  );
};

export default Register;
