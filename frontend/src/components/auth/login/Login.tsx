import React from "react";
import { HOME } from "@/constants/routes";

import { useAppSelector, usePageTitle, useQueryParams } from "@/hooks";
import StandAloneLayout from "@/components/layout/standAloneLayout/StandALoneLayout";
import { ConditionallyRender } from "@/components/common";
import Authentication from "../authentication/Authentication";
import SocialAuth from "../SocialAuth/SocialAuth";
import { RootState } from "@/app/store/store";
import { Navigate } from "react-router-dom";
import { parseRedirectParams } from "./parseRedirectParams";

const Login = () => {
  const query = useQueryParams();
  const user = useAppSelector(({ root }: RootState) => root.auth)?.id;
  const resetPassword = query.get("reset") === "true";
  const redirect = query.get("redirect") || HOME;
  usePageTitle("Sign in | NextGen");

  if (user) {
    return <Navigate to={parseRedirectParams(redirect)} />;
  }

  return (
    <StandAloneLayout>
      <ConditionallyRender condition={resetPassword} show={<h1>Success</h1>} />
      <SocialAuth />

      <Authentication redirect={redirect} />
    </StandAloneLayout>
  );
};

export default Login;
