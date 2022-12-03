import { Button, ConditionallyRender, Input } from "@/components/common";
import Links from "@/components/common/utility/Links";
import StandAloneLayout from "@/components/layout/standAloneLayout/StandALoneLayout";
import { LOGIN } from "@/constants/routes";
import { useRecoverAccountMutation } from "@/features/auth/authApiSlice";
import { forgottenPasswordSchema } from "@/validations/authValidations";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { BsCheck2Circle, BsPerson } from "react-icons/bs";

interface ISubmitProps {
  email: string;
}

interface ISimpleAuth {
  redirect: string;
}

const ForgottenPassword = () => {
  const [attempted, setAttempted] = useState(false);
  const [attemptedEmail, setAttemptedEmail] = useState("");
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<ISubmitProps>({
    resolver: yupResolver(forgottenPasswordSchema),
  });
  const { email } = getValues();

  const [forgottenPassword, { error }] = useRecoverAccountMutation();
  console.log("error", error);

  const { t } = useTranslation();

  const onSubmit = handleSubmit(async ({ email }: ISubmitProps) => {
    try {
      await forgottenPassword(email);
      console.log("test");
      setAttempted(true);
      setAttemptedEmail(email);
    } catch (e: unknown) {
      console.log(e);
    }
  });
  return (
    <StandAloneLayout>
      <div className="flex w-full flex-col">
        <div className="flex flex-col items-center">
          <h2>Forgotten Password</h2>
          <ConditionallyRender
            condition={attempted}
            show={
              <div
                className="mx-5 mb-4 mt-4 flex items-start rounded-lg bg-green-100 p-4 text-start text-sm leading-snug text-green-700 dark:bg-green-200 dark:text-green-800"
                role="alert">
                <BsCheck2Circle className="mr-2 -mt-4 h-14 w-14 font-bold" />
                <div>
                  <span className="font-medium text-green-900">
                    Attempted to send email!
                  </span>
                  <br />
                  We&apos;ve attempted to send a reset password email to: <br />
                  <span className="font-medium text-green-900">{email}</span>
                  <br />
                  If you did not receive an email, please verify that you typed
                  in the correct email, and contact your administrator to make
                  sure that you are in the system.
                </div>
              </div>
            }
          />
          <span className="mt-6 text-center font-light leading-tight text-gray-700">
            Please provide your email address. If it exists in the system
            we&apos;ll send a new reset link.
          </span>
        </div>
        <form
          className="mt-6 flex flex-col items-center space-y-4"
          onSubmit={onSubmit}>
          <div className="w-full">
            <div className="relative flex items-center">
              <BsPerson className="absolute z-20 ml-2 h-5 w-5 text-gray-700 dark:text-gray-300" />
              <Input
                className="pl-8 placeholder:text-sm placeholder:text-gray-700"
                size="large"
                type="email"
                {...register("email")}
                placeholder="Enter your email"
              />
            </div>
            <ConditionallyRender
              condition={Boolean(errors.email)}
              show={
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                  <span className="font-medium">{t("common:oops")}</span>{" "}
                  {t("login:emailRequired")}
                </p>
              }
            />
          </div>
          <Button
            type="submit"
            buttonType="primary"
            size="medium"
            className="w-[50%]">
            <ConditionallyRender
              condition={!attempted}
              show={<span className="text-white">Submit</span>}
              elseShow={<span className="text-white">Resend</span>}
            />
          </Button>
        </form>
        <div>
          <div className="inline-flex w-full items-center justify-center">
            <hr className="my-8 h-px w-full border-0 bg-gray-200 dark:bg-gray-700" />
            <span className="absolute  bg-white px-3 font-medium text-gray-500 dark:bg-gray-800 dark:text-white">
              Or login
            </span>
          </div>
          <Button type="submit" buttonType="primary" size="medium">
            <Links to={LOGIN} className="text-white">
              Login
            </Links>
          </Button>
        </div>
      </div>
    </StandAloneLayout>
  );
};

export default ForgottenPassword;
