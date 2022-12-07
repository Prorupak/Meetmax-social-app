import { FORGOT_PASSWORD, REGISTER } from "@/constants/routes";
import React from "react";
import Link from "@/components/common/utility/Links";
import { useTranslation } from "react-i18next";
import Links from "@/components/common/utility/Links";
import RegisterModal from "@/components/common/main/modal/RegisterModal";
import Register from "../Register/Register";

const SecondaryLoginActions = () => {
  const { t } = useTranslation();
  return (
    <div className="container mt-3 flex flex-col items-center justify-center">
      <Link className="text-[14px] underline" to={FORGOT_PASSWORD}>
        {t("login:forgetYourPassword")}
      </Link>
      <div className="flex items-center gap-1 text-[13px]">
        <p className="text-[13px] font-light text-gray-500 dark:text-gray-400">
          {t("login:noAccount")}
        </p>
        <Register />
      </div>
    </div>
  );
};

export default SecondaryLoginActions;
