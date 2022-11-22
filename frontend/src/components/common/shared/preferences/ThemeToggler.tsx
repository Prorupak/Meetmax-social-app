import { RootState } from "@/app/store/store";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import React, { Fragment, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  ComputerDesktopIcon,
  MoonIcon,
  SunIcon,
} from "@heroicons/react/24/outline";
import { Menu, Transition } from "@headlessui/react";
import { setTheme } from "@/features/preference/preferenceSlice";

const ThemeToggler = () => {
  //* get current theme of system and return boolean if dark or not
  const selectCurrentTheme = () =>
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [currentTheme, setCurrentTheme] = React.useState(selectCurrentTheme());
  const mqListenter = (e: MediaQueryListEvent) => setCurrentTheme(e.matches);
  React.useMemo(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    mq.addEventListener("change", mqListenter);
    return () => mq.removeEventListener("change", mqListenter);
  }, []);
  //* ------

  const dispatch = useAppDispatch();
  const { theme } = useAppSelector(({ root }: RootState) => root.preference);
  const { t } = useTranslation();

  const themes = [
    {
      name: t("common:dark"),
      key: "dark",
      icon: MoonIcon,
    },
    {
      name: t("common:light"),
      key: "light",
      icon: SunIcon,
    },
    {
      name: t("common:system"),
      key: "system",
      icon: ComputerDesktopIcon,
    },
  ];

  const [selectedTheme, setSelectedTheme] = React.useState(themes[2]);
  const effectRan = React.useRef(false);
  console.log("theme", theme);
  useEffect(() => {
    const root = document.documentElement;
    if (effectRan.current === true) {
      (() => {
        dispatch(setTheme(currentTheme ? "dark" : "light"));
      })();
    }
    if (theme === "dark") {
      setSelectedTheme(themes[0]);
      root.classList.add("dark");
    } else if (theme === "light") {
      setSelectedTheme(themes[1]);
      root.classList.remove("dark");
      dispatch(setTheme("light"));
    } else {
      if (currentTheme) {
        dispatch(setTheme("dark"));
        setSelectedTheme(themes[0]);
      } else {
        dispatch(setTheme("light"));
        setSelectedTheme(themes[1]);
      }
    }
    return () => {
      effectRan.current = true;
    };
  }, [theme]);

  const handleThemeChange = (key: string) => {
    if (key === "dark") {
      setSelectedTheme(themes[0]);
      dispatch(setTheme("dark"));
    } else if (key === "light") {
      setSelectedTheme(themes[1]);
      dispatch(setTheme("light"));
    } else {
      if (currentTheme) {
        dispatch(setTheme("dark"));
        setSelectedTheme(themes[0]);
      } else {
        dispatch(setTheme("light"));
        setSelectedTheme(themes[1]);
      }
    }
  };

  return (
    <>
      <Menu className="relative" as="div">
        {() => (
          <>
            <Menu.Button
              type="button"
              className=" cursor-pointer rounded-lg border border-gray-400 px-2 py-1 shadow-sm outline-none hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-700">
              <selectedTheme.icon className="h-6 w-6 text-primary-200" />
            </Menu.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1">
              <Menu.Items className="absolute -left-[5rem]  z-10  mt-4 w-28 transform  rounded-lg bg-white px-1 shadow-md dark:bg-dark-200 tablet:-left-[9rem] tablet:-translate-x-10 tablet:px-1 laptop:left-0 laptop:max-w-3xl">
                <div className="w-full overflow-hidden rounded-lg">
                  <div className="relative  gap-8 ">
                    {themes.map((item) => (
                      <Menu.Item key={item.key}>
                        {() => (
                          <button
                            type="button"
                            className=" flex w-full items-center   space-x-2 rounded-md bg-transparent p-2 text-left hover:bg-gray-100 dark:hover:bg-dark-100"
                            onClick={() => handleThemeChange(item.key)}>
                            <item.icon className="h-6 w-6 text-gray-800 dark:text-white tablet:h-6 tablet:w-6" />

                            <p className="font-hindMadurai font-medium capitalize text-gray-900 dark:text-white">
                              {item.name}
                            </p>
                          </button>
                        )}
                      </Menu.Item>
                    ))}
                  </div>
                </div>
              </Menu.Items>
            </Transition>
          </>
        )}
      </Menu>
    </>
  );
};

export default React.memo(ThemeToggler);
