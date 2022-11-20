import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import React, { useEffect } from "react";
import { setTheme } from "@/features/preference/preferenceSlice";
import { RootState } from "@/app/store/store";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
// import { IRootState } from "@/types/types";

const ThemeToggler = () => {
  const { theme } = useAppSelector((state: RootState) => ({ theme: state.root.preference.theme }));
  const dispatch = useAppDispatch();

  console.log(`theme`, theme);

  useEffect(() => {
    const root = document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  const onThemeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      dispatch(setTheme("dark"));
    } else {
      dispatch(setTheme("light"));
    }
  };

  return (
    <label
      className="dark:hover:bg-indigo-1000 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-gray-200
      bg-gray-100 hover:bg-indigo-100 dark:border-indigo-900 dark:bg-indigo-900"
      title={theme === "dark" ? "Toggle Light Theme" : "Toggle Dark Theme"}>
      <input
        className="hidden"
        checked={theme === "dark"}
        type="checkbox"
        id="theme"
        onChange={onThemeChange}
        name="theme-switch"
        hidden
      />
      {theme === "dark" ? (
        <MoonIcon className="text-xl text-[cyan]" />
      ) : (
        <SunIcon className="text-xl text-orange-400" />
      )}
    </label>
  );
};

export default ThemeToggler;
