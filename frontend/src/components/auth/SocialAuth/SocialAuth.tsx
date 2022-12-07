import React, { MouseEvent } from "react";
// @ts-ignore
import { ReactComponent as GoogleSvg } from "@/assets/icon/Google.svg";
import { Button } from "@/components/common";
import { useTranslation } from "react-i18next";
import { useGoogleOAuthMutation } from "@/features/auth/authApiSlice";

const SocialAuth = () => {
  const [OAuth, { isLoading }] = useGoogleOAuthMutation();
  const { t } = useTranslation();
  const apiURL = import.meta.env.VITE_NEXTGEN_URL;
  const onClickSocialLogin = (e: MouseEvent<HTMLAnchorElement>) => {
    if (isLoading) {
      e.preventDefault();
    }

    const data = OAuth(`${apiURL}/api/v1/auth/google`).unwrap();
    console.log(`data`, data);
  };
  return (
    <>
      <a href={`${apiURL}/api/v1/auth/google`} onClick={onClickSocialLogin}>
        <Button
          type="button"
          size="medium"
          buttonType="ghostWithBorder"
          isLoading={isLoading}
          widthFull>
          <GoogleSvg className="h-7 w-7" />
          <span>{t("login:signInGoogle")}</span>
        </Button>
      </a>
      <div className="inline-flex w-full items-center justify-center">
        <hr className="my-8 h-px w-full border-0 bg-gray-200 dark:bg-gray-700" />
        <span className="absolute  bg-white px-3 font-medium text-gray-500 dark:bg-gray-800 dark:text-white">
          or
        </span>
      </div>
    </>
  );
};

export default SocialAuth;
