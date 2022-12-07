import { ConditionallyRender, Input } from "@/components/common";
import { useRegisterMutation } from "@/features/auth/authApiSlice";
import { CustomError } from "@/types/types";
import { RegSchema } from "@/validations/authValidations";
import { Dialog } from "@headlessui/react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { FC, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { BsFillExclamationTriangleFill, BsX } from "react-icons/bs";
import ReactTooltip from "react-tooltip";

interface IRegisterProps {
  closeModal: () => void;
}

interface ISubmitProps {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  info: {
    birthday: string;
    gender: string;
  };
}

const defaultValues = {
  username: "",
  password: "",
  firstName: "",
  lastName: "",
  email: "",
  info: {
    birthday: "",
    gender: "",
  },
};

const RegisterForm: FC<IRegisterProps> = ({ closeModal }) => {
  const [signUp, { error, isLoading }] = useRegisterMutation();
  const errorMessage = (error as CustomError)?.data?.error;
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    setValue,
    handleSubmit,
    control,
    formState: { errors, dirtyFields, touchedFields },
  } = useForm<ISubmitProps>({
    // mode: "onChange",
    resolver: yupResolver(RegSchema),
    defaultValues,
  });

  const onSubmit = handleSubmit(async data => {
    console.log(data);
  });

  const toggleViewPasswordOnHold = () => {
    setShowPassword(prev => !prev);
  };
  return (
    <>
      <div className="">
        <div className="flex items-center justify-between">
          <Dialog.Title
            as="h3"
            className="text-xl font-medium leading-tight text-gray-900">
            Sign up
          </Dialog.Title>
          <BsX
            className="h-8 w-8 cursor-pointer rounded-full p-[2px] text-gray-400 hover:bg-gray-100"
            onClick={closeModal}
          />
        </div>
        <Dialog.Description className=" text-sm leading-tight text-gray-500">
          It&apos;s quick and easy.
        </Dialog.Description>
      </div>
      <hr className="my-3 bg-gray-200" />
      <form action="flex flex-col gap-2" onSubmit={onSubmit}>
        {/* -------------------USERNAME FIELD-------------- */}
        <div data-tip data-htmlFor="username" className="relative">
          <Input
            type="username"
            name="username"
            label="username"
            error={errors.username}
            register={register}
            required
            className={`bg-gray-200/75 ring-1 ring-gray-400 placeholder:text-[14px] focus-visible:ring-1 focus-visible:ring-blue-500 ${
              !dirtyFields.password && touchedFields.password
                ? "ring-1 ring-red-600"
                : ""
            }`}
            readOnly={isLoading}
            placeholder="Username"
          />
          <ConditionallyRender
            condition={Boolean(!dirtyFields.username && touchedFields.username)}
            show={
              <>
                <BsFillExclamationTriangleFill className="absolute top-2 right-3 h-5 w-5 text-red-600" />
                <ReactTooltip
                  id="username"
                  type="error"
                  className="bg-red-600"
                  effect="solid">
                  <span className="text-white">Choose unique username.</span>
                </ReactTooltip>
              </>
            }
          />
        </div>
        {/* -----------------FIRST NAME FIELD----------------- */}
        <div className="mt-4 flex gap-5">
          <div data-tip data-htmlFor="firstName" className="relative">
            <Input
              type="firstName"
              name="firstName"
              label="firstName"
              register={register}
              required
              className={`bg-gray-200/75 ring-1 ring-gray-400 placeholder:text-[14px] focus-visible:ring-1 focus-visible:ring-blue-500 ${
                !dirtyFields.password && touchedFields.password
                  ? "ring-1 ring-red-600"
                  : ""
              }`}
              readOnly={isLoading}
              placeholder="First name"
            />
            <ConditionallyRender
              condition={Boolean(
                !dirtyFields.firstName && touchedFields.firstName,
              )}
              show={
                <>
                  <BsFillExclamationTriangleFill className="absolute top-2 right-3 h-5 w-5 text-red-600" />
                  <ReactTooltip
                    id="firstName"
                    type="error"
                    className=" bg-red-600"
                    effect="solid">
                    <span className="text-white">
                      what&apos;s your first name?
                    </span>
                  </ReactTooltip>
                </>
              }
            />
          </div>
          {/* --------------LAST NAME FIELD--------------- */}
          <div data-tip data-htmlFor="lastName" className="relative">
            <Input
              type="lastName"
              name="lastName"
              label="lastName"
              register={register}
              required
              className={`bg-gray-200/75 ring-1 ring-gray-400 placeholder:text-[14px] focus-visible:ring-1 focus-visible:ring-blue-500 ${
                !dirtyFields.password && touchedFields.password
                  ? "ring-1 ring-red-600"
                  : ""
              }`}
              readOnly={isLoading}
              placeholder="last name"
            />
            <ConditionallyRender
              condition={Boolean(!dirtyFields.lastName)}
              show={
                <>
                  <BsFillExclamationTriangleFill className="absolute top-2 right-3 h-5 w-5 text-red-600" />
                  <ReactTooltip
                    id="lastName"
                    type="error"
                    className="bg-red-600"
                    effect="solid">
                    <span className="text-white">
                      What&apos;s your last name?
                    </span>
                  </ReactTooltip>
                </>
              }
            />
          </div>
        </div>
        {/* -----------EMAIL FIELD----------------- */}
        <div data-tip data-htmlFor="email" className="relative mt-4">
          <Input
            type="email"
            name="email"
            label="email"
            register={register}
            required
            className={`bg-gray-200/75 ring-1 ring-gray-400 placeholder:text-[14px] focus-visible:ring-1 focus-visible:ring-blue-500 ${
              !dirtyFields.password && touchedFields.password
                ? "ring-1 ring-red-600"
                : ""
            }`}
            readOnly={isLoading}
            placeholder="Email"
          />
          <ConditionallyRender
            condition={Boolean(!dirtyFields.email && touchedFields.email)}
            show={
              <>
                <BsFillExclamationTriangleFill className="absolute top-2 right-3 h-5 w-5 text-red-600" />
                <ReactTooltip
                  id="email"
                  type="error"
                  className="bg-red-600 text-center"
                  effect="solid">
                  <span className=" text-white">
                    You&apos;ll use this when you log in and if you ever need to
                    reset your password.
                  </span>
                </ReactTooltip>
              </>
            }
          />
        </div>
        {/* ----------PASSWORD FIELD----------- */}
        <div data-tip data-htmlFor="password" className="relative mt-4">
          <Input
            placeholder="Password"
            name="password"
            label="password"
            register={register}
            required
            type={showPassword ? "text" : "password"}
            className={`bg-gray-200/75 ring-1 ring-gray-400 placeholder:text-[14px] focus-visible:ring-1 focus-visible:ring-blue-500 ${
              !dirtyFields.password && touchedFields.password
                ? "ring-1 ring-red-600"
                : ""
            }`}
          />
          <ConditionallyRender
            condition={Boolean(!dirtyFields.password && touchedFields.password)}
            show={
              <>
                <BsFillExclamationTriangleFill className="absolute top-2 right-9 h-5 w-5 text-red-600" />
                <ReactTooltip
                  id="password"
                  type="error"
                  className="bg-red-600 text-center"
                  effect="solid">
                  <span className="text-white">
                    Enter a combination of at least six numbers, letters and
                    punctuation marks (like ! and &).
                  </span>
                </ReactTooltip>
              </>
            }
          />
          {showPassword ? (
            <EyeSlashIcon
              className="absolute top-2 right-3 z-20 ml-2 h-5 w-5 cursor-pointer text-gray-700 dark:text-gray-300"
              onClick={toggleViewPasswordOnHold}
            />
          ) : (
            <EyeIcon
              className="absolute top-2 right-3 z-20 ml-2 h-5 w-5 cursor-pointer text-gray-700 dark:text-gray-300"
              onClick={toggleViewPasswordOnHold}
            />
          )}
        </div>

        {/* -------------DATE OF BIRTH SELECTION----------------- */}
        {/* <div data-tip data-htmlFor="email" className="relative mt-4">
          <Input
            placeholder="Date of birth"
            type="date"
            {...register("info.birthday")}
            className={`bg-gray-200/75 ring-1 ring-gray-400 placeholder:text-[14px] focus-visible:ring-1 focus-visible:ring-blue-500 ${
              !dirtyFields.info?.birthday && touchedFields.info?.birthday
                ? "ring-1 ring-red-600"
                : ""
            }`}
          />
          <ConditionallyRender
            condition={Boolean(
              !dirtyFields.info?.birthday && touchedFields.info?.birthday,
            )}
            show={
              <>
                <BsFillExclamationTriangleFill className="absolute top-2 right-3 h-5 w-5 text-red-600" />
                <ReactTooltip
                  id="email"
                  type="error"
                  className="bg-red-600 text-center"
                  effect="solid">
                  <span className=" text-white">
                    You&apos;ll use this when you log in and if you ever need to
                    reset your password.
                  </span>
                </ReactTooltip>
              </>
            }
          />
        </div> */}

        {/* -------GENDER SELECTION------------- */}

        <div className="mt-4">
          <Controller
            control={control}
            name="info.gender"
            render={({ field: { onChange, value } }) => (
              <ul className="mt-4 flex w-full flex-col items-start justify-between gap-3 rounded-lg text-sm font-medium text-gray-900">
                <span className="text-sm text-gray-500">Gender</span>
                <div className="flex w-full items-center gap-3">
                  <li className=" w-full rounded-lg border border-gray-300 bg-gray-50">
                    <div className="flex items-center px-3">
                      <label
                        htmlFor="horizontal-list-radio-male"
                        className="ml-2 w-full py-3 text-sm font-medium text-gray-900">
                        Male
                      </label>
                      <input
                        onChange={e => onChange(e.target.value)}
                        value={value}
                        type="radio"
                      />
                    </div>
                  </li>
                  <li className=" w-full rounded-lg border border-gray-300  bg-gray-50">
                    <div className="flex items-center px-3">
                      <label
                        htmlFor="horizontal-list-radio-female"
                        className="ml-2 w-full py-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                        Female
                      </label>
                      <input
                        type="radio"
                        {...register("info.gender")}
                        value={value}
                      />
                    </div>
                  </li>
                  <li className="w-full rounded-lg border border-gray-300 bg-gray-50">
                    <div className="flex items-center px-3">
                      <label
                        htmlFor="horizontal-list-radio-others"
                        className="ml-2 w-full py-3 text-sm font-medium text-gray-900">
                        Others
                      </label>
                      <input
                        id="horizontal-list-radio-others"
                        type="radio"
                        {...register("info.gender")}
                        name="list-radio"
                        className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 "
                      />
                    </div>
                  </li>
                </div>
              </ul>
            )}
          />
        </div>

        <div>
          <button
            type="submit"
            className="mt-4 w-full rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            Sign Up
          </button>
        </div>

        {/* Radio buttons from Controller */}

        <Controller
          control={control}
          name="info.gender"
          render={({ field: { onChange, value } }) => (
            <label>
              <input
                type="radio"
                onChange={e => onChange(e.target.value)}
                value={value}
              />
            </label>
          )}
        />
      </form>
    </>
  );
};

export default RegisterForm;
