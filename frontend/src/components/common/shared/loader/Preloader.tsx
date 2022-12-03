import React, { FC } from "react";
import meetmaxLogo from "@/assets/img/meetmax_logo.svg";
import withTheme from "../../HOC/withTheme";
import { useTranslation } from "react-i18next";

const Preloader: FC<{ theme: string }> = ({ theme }) => {
  const bgDark = theme === "dark" ? "bg-gray-900" : "bg-white";
  const bgTextQuotes = theme === "dark" ? "text-gray-400" : "text-gray-500";
  const bgText = theme === "dark" ? "text-white" : "text-gray-800";
  const { t } = useTranslation();

  return (
    <div className={`h-screen w-full ${bgDark}`}>
      <div
        className={`animate-fade z-50 flex h-full  w-full flex-col items-center justify-center  text-center`}>
        <img
          src={meetmaxLogo}
          alt="Meetmax Logo"
          className="w-14 animate-bounce"
        />
        <h3 className={`${bgText}`}>Meetmax</h3>
        <p className={`mt-4 w-[80%] text-sm laptop:w-full ${bgTextQuotes}`}>
          “{t("common:preloaderQuotes")}“
        </p>
      </div>
    </div>
  );
};
export default withTheme(Preloader);
