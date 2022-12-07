import React from "react";
import { ReactComponent as GoogleSvg } from "@/assets/icon/Google.svg";

const PasswordForm = () => {
  return (
    <a
      className="button w-full border border-gray-300 bg-gray-100 text-gray-800 hover:bg-gray-200"
      href={`${apiURL}/api/v1/auth/google`}
      onClick={onClickSocialLogin}>
      <GoogleSvg className="absolute left-8 top-0 bottom-0 my-auto text-lg" />
      <span className="inline-block">Google</span>
    </a>
  );
};

export default PasswordForm;
