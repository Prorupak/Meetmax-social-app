import React from "react";
import { Link } from "react-router-dom";
import { usePageTitle } from "@/hooks";

const SocialAuthFailed = () => {
  usePageTitle("Authentication Failed");

  return (
    <div className="contain h-full pt-14">
      <h1 className="mt-8 text-2xl dark:text-white laptop:text-4xl">
        Failed to authenticate
      </h1>
      <br />
      <h4 className="text-gray-600 dark:text-gray-400">Possible cause(s):</h4>
      <ul className="text-gray-500">
        <li className="ml-8 list-disc">
          Same email/username has been already linked to other social login eg:
          Google
        </li>
        <li className="ml-8 list-disc">
          User has cancelled the authentication.
        </li>
      </ul>

      <Link className="button mt-8 inline-flex" to="/">
        Back to Login
      </Link>
    </div>
  );
};

export default SocialAuthFailed;
