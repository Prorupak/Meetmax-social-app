import React, { lazy, Suspense } from "react";
import Logo from "../logo/Logo";

const LanguageModal = lazy(() => import("../../main/modal/LanguageModal"));
const ThemeToggler = lazy(() => import("../preferences/ThemeToggler"));

const LoginNavbar: React.FC = () => {
  return (
    <>
      <div className="sticky top-0 h-16 bg-white dark:bg-gray-800">
        <div className="flex items-center justify-between px-5  py-3 tablet:px-8 laptop:px-12">
          <div className="flex items-center space-x-2">
            <Logo className="h-8 w-8   laptop:h-10 laptop:w-10" />
          </div>
          <ul className="flex h-[37px] items-center space-x-5">
            <li className="rounded-lg  shadow-sm outline-none dark:border-gray-700">
              <Suspense
                fallback={
                  <div className=" h-[32px]  w-[58px] animate-pulse rounded-md bg-gray-50 dark:bg-gray-800 "></div>
                }>
                <LanguageModal />
              </Suspense>
            </li>
            <li className="">
              <Suspense
                fallback={
                  <div className=" h-[32px]  w-[42px] animate-pulse rounded-md bg-gray-50 dark:bg-gray-800 "></div>
                }>
                <ThemeToggler />
              </Suspense>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default LoginNavbar;
