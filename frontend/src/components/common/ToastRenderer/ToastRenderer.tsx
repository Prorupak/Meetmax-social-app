import React from "react";
import { Toaster } from "react-hot-toast";

const ToastRenderer = () => {
  return (
    <Toaster
      position="bottom-center"
      reverseOrder={false}
      gutter={8}
      containerClassName=""
      containerStyle={{}}
      toastOptions={{
        // Define default options
        className:
          "dark:bg-gray-800 bg-white dark:text-white text-gray-800 text-base",
        duration: 2000,
      }}
    />
  );
};

export default ToastRenderer;
