import React, { forwardRef } from "react";

interface IProps {
  type?:
    | "text"
    | "password"
    | "email"
    | "number"
    | "tel"
    | "search"
    | "file"
    | "checkbox"
    | "radio"
    | "hidden"
    | undefined;
  size?: "small" | "medium" | "large";
  placeholder?: string;
  className?: string;
  [props: string]: any;
}

const Input = forwardRef<HTMLInputElement, IProps>(
  ({ type, size, className, ...props }, ref) => {
    const small = size === "small" && "px-2 py-1 text-xs";
    const medium = size === "medium" && "px-3 py-[0.7rem] text-sm";
    const large = size === "large" && "px-4 py-3 text-base";
    const searchInput =
      type === "search" &&
      "ring-1 dark:ring-gray-500 ring-gray-300 focus-visible:ring-2 focus-visible:ring-blue-500";
    return (
      <input
        ref={ref}
        className={`${small} ${medium} ${large} ${searchInput}  w-full rounded-md border-none bg-gray-100  px-3 py-2 text-sm outline-none placeholder:text-xs placeholder:font-thin placeholder:leading-loose placeholder:text-gray-500 placeholder:opacity-70 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:placeholder:text-gray-300 ${className}`}
        type={type || "text"}
        {...props}
      />
    );
  },
);

export default Input;
