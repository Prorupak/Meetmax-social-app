import React from "react";
import { Path, UseFormRegister } from "react-hook-form";

type InputProps = {
  label: Path<any>;
  register: UseFormRegister<any>;
  required: boolean;
  size?: "sm" | "md" | "lg";
  error?: any;
  className?: string;
  [prop: string]: any;
};

const Input = ({
  label,
  register,
  size = "md",
  required,
  error,
  className,
  ...rest
}: InputProps) => {
  return (
    <div className="flex w-full flex-col justify-start">
      <input
        {...register(label, { required })}
        {...rest}
        className={`block rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 ${className} ${
          error
            ? "!focus:border-red-600 !focus:ring-red-500 !border-red-300"
            : ""
        }`}
      />
      {/* {error && typeof error === "string" && (
        <span className="ml-4 mt-1 text-xs text-red-500">{error}</span>
      )} */}
    </div>
  );
};

export default Input;
