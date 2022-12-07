import * as yup from "yup";

const Schema = yup.object({
  username: yup.string().required("Username or Email is required."),
  password: yup.string().required("Password is required."),
});
export const simpleAuthSchema = yup.object({
  username: yup.string().required("Username or Email is required."),
});
export const forgottenPasswordSchema = yup.object({
  email: yup
    .string()
    .required("Email is required.")
    .matches(
      /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
      "Invalid email address.",
    ),
});
export const resetPasswordSchema = yup.object({
  password: yup
    .string()
    .required("Password is required.")
    .min(6, "Password must be at least 6 characters."),
});
export const RegSchema = yup.object({
  password: yup
    .string()
    .required("required")
    .min(6, "minLength")
    .max(20, "maxLength"),
  username: yup
    .string()
    .required("required")
    .min(3, "min")
    .max(20, "max")
    // accept only letters, numbers and underscore
    .matches(/^[a-zA-Z0-9_]+$/, "alphanumeric")
    // accept first letter of username must be a letter
    .matches(/^[a-zA-Z]/, "firstLetter"),
  firstName: yup.string().required("First Name is required."),
  lastName: yup.string().required("Last Name is required."),
  email: yup
    .string()
    .email("Invalid email address.")
    .required("Email is required."),
});

export default Schema;
