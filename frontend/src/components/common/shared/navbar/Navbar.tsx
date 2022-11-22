import { FORGOT_PASSWORD, LOGIN, PASSWORD_RESET, REGISTER } from "@/constants/routes";
import React from "react";
import { useLocation } from "react-router-dom";
import LoginNavbar from "./LoginNavbar";

const Navbar = () => {
  const { pathname } = useLocation();
  const hideToPathNav = [LOGIN, REGISTER, FORGOT_PASSWORD, PASSWORD_RESET];
  return hideToPathNav.includes(pathname) ? (
    <>
      <LoginNavbar />
    </>
  ) : (
    <></>
  );
};

export default Navbar;
