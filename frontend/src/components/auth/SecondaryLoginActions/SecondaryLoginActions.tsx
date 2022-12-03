import { FORGOT_PASSWORD, REGISTER } from "@/constants/routes";
import React from "react";
import Link from "@/components/common/utility/Links";
import { useTranslation } from "react-i18next";

const SecondaryLoginActions = () => {
  const { t } = useTranslation();
  return (
    <div className="container mt-3 flex flex-col items-center justify-center">
      <Link className="text-[13px] underline" to={FORGOT_PASSWORD}>
        {t("login:forgetYourPassword")}
      </Link>
      <p className="text-xs font-light text-gray-500 dark:text-gray-400">
        {t("login:noAccount")}{" "}
        <Link className="text-xs capitalize" to={REGISTER}>
          {t("login:signUp")}
        </Link>
      </p>
    </div>
  );
};

export default SecondaryLoginActions;
