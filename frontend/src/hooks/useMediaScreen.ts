import { useState, useEffect } from "react";

interface Size {
  width: number;
  height: number;
}

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState<Size>({
    width: 0,
    height: 0,
  });
  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowSize.width && windowSize.width < 640;
  const isTablet =
    windowSize.width && windowSize.width >= 640 && windowSize.width < 768;
  const isLaptop =
    windowSize.width && windowSize.width >= 768 && windowSize.width < 1024;

  return {
    isMobile,
    isTablet,
    isLaptop,
    windowSize,
  };
};

// <section className="mx-auto h-full w-screen max-w-screen-laptop laptop:w-screen">
//   <div className="mx-auto my-16 flex items-center justify-center px-6 py-8 laptop:py-5">
//     <div className="w-full max-w-screen-tablet rounded-lg bg-white shadow-sm dark:border dark:border-gray-700 dark:bg-dark-100/25 tablet:mt-0 desktop:p-0">
//       <div className="space-y-4 p-6 mobile:p-8 tablet:space-y-6 laptop:space-y-6">
//         <div className="inline-flex w-full flex-col items-center justify-center ">
//           <h4 className="text-center text-xl font-medium capitalize leading-tight tracking-wide text-gray-900 dark:text-white tablet:text-2xl">
//             {t("login:signInToYourAccount")}
//           </h4>
//           {isFromRegister && (
//             <span className="text-sm text-red-500">
//               {t("login:pleaseSignInToContinue")}
//             </span>
//           )}
//         </div>
//         <form className="space-y-4" onSubmit={onSubmit}>
//           {isError && (
//             <div
//               className="mb-4 flex rounded-lg bg-red-100 p-4 text-sm text-red-700 dark:bg-red-200 dark:text-red-800"
//               role="alert">
//               <svg
//                 aria-hidden="true"
//                 className="mr-3 inline h-5 w-5 flex-shrink-0"
//                 fill="currentColor"
//                 viewBox="0 0 20 20"
//                 xmlns="http://www.w3.org/2000/svg">
//                 <path
//                   fillRule="evenodd"
//                   d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
//                   clipRule="evenodd"></path>
//               </svg>
//               <span className="sr-only">Info</span>
//               <div>
//                 {errorMessage?.error?.message ? t("login:loginError") : null}
//               </div>
//             </div>
//           )}

//           <div>
//             <label
//               className="mb-2 block text-sm font-medium capitalize text-gray-900 dark:text-white"
//               htmlFor="username">
//               {t("common:usernameOrEmail")}
//             </label>
//             <div className="relative flex items-center">
//               <UserIcon className="absolute z-20 ml-2 h-5 w-5 text-gray-700 dark:text-gray-300" />
//               <Input
//                 className="pl-8"
//                 size="medium"
//                 type="text"
//                 {...register("username")}
//                 placeholder="John_doe, John123 or john_doe123@gmail.com"
//               />
//             </div>
//             {errors.username && (
//               <p className="mt-2 text-sm text-red-600 dark:text-red-500">
//                 <span className="font-medium">{t("common:oops")}</span>{" "}
//                 {errors?.username?.message ? t("login:usernameRequired") : null}
//               </p>
//             )}
//           </div>
//           <div>
//             <label
//               className="mb-2 block text-sm font-medium capitalize text-gray-900 dark:text-white"
//               htmlFor="password">
//               {t("common:password")}
//             </label>
//             <div className="relative flex items-center">
//               <LockClosedIcon className="absolute z-20 ml-2 h-5 w-5 text-gray-700 dark:text-gray-300" />
//               <Input
//                 className="pl-8"
//                 size="medium"
//                 type={showPassword ? "text" : "password"}
//                 {...register("password")}
//                 placeholder="••••••••"
//               />

//               {showPassword ? (
//                 <EyeSlashIcon
//                   className="absolute right-3 z-20 ml-2 h-5 w-5 cursor-pointer text-gray-700 dark:text-gray-300"
//                   onClick={toggleViewPasswordOnHold}
//                 />
//               ) : (
//                 <EyeIcon
//                   className="absolute right-3 z-20 ml-2 h-5 w-5 cursor-pointer text-gray-700 dark:text-gray-300"
//                   onClick={toggleViewPasswordOnHold}
//                 />
//               )}
//             </div>

//             {errors.password && (
//               <p className="mt-2 text-sm text-red-600 dark:text-red-500">
//                 <span className="font-medium">{t("common:oops")}</span>{" "}
//                 {errors?.password?.message ? t("login:passwordRequired") : null}
//               </p>
//             )}
//           </div>
//           {errorMessage?.status_code === 401 ? (
//             <div className="flex items-center justify-between">
//               <Link
//                 className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
//                 to={FORGOT_PASSWORD}>
//                 {t("login:forgetYourPassword")}
//               </Link>
//             </div>
//           ) : null}
//           <div className="flex flex-col items-center gap-3">
//             <Button
//               buttonType="primary"
//               widthFull
//               size="large"
//               // className="w-full rounded-lg bg-blue-600 px-5 py-3 text-center text-sm font-medium capitalize text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//               type="submit">
//               {isLoading ? (
//                 <svg
//                   role="status"
//                   className="mr-3 inline h-4 w-4 animate-spin  text-white"
//                   viewBox="0 0 100 101"
//                   fill="none"
//                   xmlns="http://www.w3.org/2000/svg">
//                   <path
//                     d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
//                     fill="#E5E7EB"
//                   />
//                   <path
//                     d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
//                     fill="currentColor"
//                   />
//                 </svg>
//               ) : (
//                 t("login:signIn")
//               )}
//             </Button>
//             <Button
//               size="large"
//               buttonType="secondary"
//               type="button"
//               className=" mr-2 mb-2 inline-flex w-full   items-center justify-center gap-1 rounded-lg bg-gray-100 px-6 py-2 text-center text-base font-medium text-gray-800  hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-[#3b5998]/50  dark:bg-dark-100 dark:text-white dark:hover:bg-dark-100/75  dark:focus-visible:ring-[#4285F4]">
//               <img src={GoogleLogo} alt="google" className="h-7 w-7" />
//               {t("login:signInGoogle")}
//             </Button>
//           </div>
//         </form>
//       </div>
//     </div>
//   </div>
// </section>;
