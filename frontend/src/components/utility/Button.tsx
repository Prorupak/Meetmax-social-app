import React from "react";
interface IProps {
  buttonType?: "primary" | "secondary" | "ghost" | "ghostWithBorder";
  size?: "small" | "medium" | "large";
  type?: "button" | "submit" | "reset";
  widthFull?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<IProps> = ({ children, type, buttonType, size, widthFull }) => {
  const primary = buttonType === "primary" && "bg-blue-500 text-white hover:bg-blue-600";
  const secondary = buttonType === "secondary" && "bg-gray-500 hover:bg-gray-600 text-white";
  const ghost =
    buttonType === "ghost" &&
    "bg-transparent hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white text-gray-900";
  const ghostWithBorder =
    buttonType === "ghostWithBorder" &&
    "bg-transparent border border-gray-500 text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white";
  const small = size === "small" && "px-2 py-1 text-xs";
  const medium = size === "medium" && "px-3 py-2 text-sm";
  const large = size === "large" && "px-4 py-3 text-base";
  const defaultButton = "bg-blue-500 text-white px-3 py-2 text-sm";
  const buttonWidth = widthFull ? "w-full" : "";

  return (
    <button
      type={type}
      className={`rounded-md ${defaultButton} ${primary} ${secondary} ${ghost} ${ghostWithBorder} ${small} ${medium} ${large} ${buttonWidth}`}>
      {children}
    </button>
  );
};

export default Button;
