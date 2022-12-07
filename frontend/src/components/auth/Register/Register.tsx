import React, { lazy, Suspense } from "react";
import { useForm } from "react-hook-form";
import { useRegisterMutation } from "@/features/auth/authApiSlice";
import { CustomError, ILogin } from "@/types/types";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { LOGIN } from "@/constants/routes";
import {
  AtSymbolIcon,
  LockClosedIcon,
  UserCircleIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { yupResolver } from "@hookform/resolvers/yup";
import { RegSchema } from "@/validations/authValidations";

import { usePageTitle } from "@/hooks";
import { RequiredFieldBadge } from "@/components/common";
import StandAloneLayout from "@/components/layout/standAloneLayout/StandALoneLayout";
import RegisterModal from "@/components/common/main/modal/RegisterModal";

const Logo = lazy(() => import("@/components/common/shared/logo/Logo"));

const Register = () => {
  return (
    <>
      <RegisterModal />
    </>
  );
};

export default Register;
