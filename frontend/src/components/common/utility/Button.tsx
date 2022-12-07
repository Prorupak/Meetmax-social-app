import React, { FC, ReactNode } from "react";
interface IProps {
  buttonType?:
    | "primary"
    | "secondary"
    | "ghost"
    | "ghostWithBorder"
    | "disabled";
  size?: "small" | "medium" | "large";
  type?: "button" | "submit" | "reset";
  widthFull?: boolean;
  children: ReactNode;
  className?: string;
  isLoading?: boolean;
  loadingText?: string;
  [props: string]: any;
}

const Button: FC<IProps> = ({
  children,
  type,
  buttonType,
  size,
  className,
  widthFull,
  isLoading,
  loadingText,
  ...props
}) => {
  const primary =
    buttonType === "primary" &&
    "border-gray-200 bg-[#4285F4] disabled:bg-[#4285F4]/70 disabled:hover:bg-[#4285F4]/50 text-white dark:focus-visible:ring-[#4285F4]/55 text-white hover:bg-[#4285F4]/90  focus:ring-[#4285F4]/50 focus:ring-blue-70";
  const secondary =
    buttonType === "secondary" && "bg-gray-300 hover:bg-gray-200";
  const ghost =
    buttonType === "ghost" &&
    "bg-transparent hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white text-gray-900";
  const disabledButton =
    buttonType === "disabled" &&
    "border-gray-200 bg-[#4285F4]/70 text-white dark:focus-visible:ring-[#4285F4]/55 text-white hover:bg-[#4285F4]/90  focus:ring-[#4285F4]/50 focus:ring-blue-70";
  const ghostWithBorder =
    buttonType === "ghostWithBorder" &&
    "bg-transparent border border-gray-500 text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white";
  const small = size === "small" && "px-2 py-1 text-xs";
  const medium = size === "medium" && "px-3 py-2 text-sm";
  const large = size === "large" && "px-4 py-3 text-base";
  const buttonWidth = widthFull ? "w-full" : "";

  return (
    <button
      disabled={isLoading}
      type={type}
      className={` hover:bg-gray- mr-2 mb-2 rounded-lg border font-medium text-white focus:z-10  focus:outline-none disabled:text-gray-900 dark:border-gray-600 dark:hover:text-white dark:disabled:bg-gray-800 dark:disabled:text-gray-400 dark:disabled:hover:bg-gray-700 ${small} ${medium} ${large} ${primary} ${secondary} ${ghost} ${ghostWithBorder} ${disabledButton} ${buttonWidth} ${className}`}
      {...props}>
      <span
        className="space flex w-full items-center justify-center
       text-center">
        {isLoading ? (
          <>
            <svg
              aria-hidden="true"
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
            <span className="text-white">{loadingText || "loading...."}</span>
          </>
        ) : (
          children
        )}
      </span>
    </button>
  );
};

export default Button;
