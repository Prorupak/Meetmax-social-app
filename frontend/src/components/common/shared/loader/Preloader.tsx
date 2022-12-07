import React, { FC } from "react";
import NextGenLogo from "@/assets/img/NextGen_logo.svg";
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
          src={NextGenLogo}
          alt="NextGen Logo"
          className="w-14 animate-bounce"
        />
        <h3 className={`${bgText}`}>NextGen</h3>
        <p className={`mt-4 w-[80%] text-sm laptop:w-full ${bgTextQuotes}`}>
          One of the best ways to influence people is to make them feel
          important.
        </p>
      </div>
    </div>
  );
};
export default withTheme(Preloader);
