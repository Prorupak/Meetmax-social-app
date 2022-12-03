import { ConditionallyRender } from "@/components/common";
import { SIGN_IN } from "@/constants/routes";
import { useQueryParams } from "@/hooks";
import React, { FC } from "react";
import { Navigate } from "react-router-dom";
import PasswordAuth from "../PasswordAuth/PasswordAuth";
import SecondaryLoginActions from "../SecondaryLoginActions/SecondaryLoginActions";
import SimpleAuth from "../simpleAuth/SimpleAuth";
import SocialAuth from "../SocialAuth/SocialAuth";

interface IAuthentication {
  redirect: string;
}

const Authentication: FC<IAuthentication> = ({ redirect }) => {
  const params = useQueryParams();
  console.log(`params`, params);
  const error = params.get("error");
  let content;

  // if (!params.get("auth_details")) return <Navigate to={SIGN_IN} />;

  if (params.get("auth_details")) {
    content = (
      <>
        <PasswordAuth redirect={redirect} />
        <SecondaryLoginActions />
      </>
    );
  } else {
    content = (
      <>
        <SimpleAuth redirect={redirect} />
        <SecondaryLoginActions />
      </>
    );
  }

  return (
    <>
      <div>
        <ConditionallyRender
          condition={Boolean(error)}
          show={
            <div>
              <h1>There was an error</h1>
              <p>{error}</p>
            </div>
          }
        />
      </div>
      {content}
    </>
  );
};

export default Authentication;
