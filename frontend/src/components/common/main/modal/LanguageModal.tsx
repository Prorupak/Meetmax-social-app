import { Button } from "@/components/common";
import { useModal } from "@/hooks";
import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import { useTranslation } from "react-i18next";
import { BsGlobe, BsX } from "react-icons/bs";

const languageList = [
  {
    key: "en",
    value: "English",
  },
  {
    key: "np",
    value: "नेपाली",
  },
  {
    key: "fr",
    value: "Français",
  },
  {
    key: "ko",
    value: "한국어",
  },
  {
    key: "es",
    value: "Español",
  },

  {
    key: "jp",
    value: "日本語",
  },
];

const LanguageModal = () => {
  const { closeModal, isOpen, openModal } = useModal();

  // const { handleChangeLanguage } = useChangeLanguage();

  const { t, i18n } = useTranslation();

  const handleChangeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  const [currentLang, setCurrentLang] = React.useState<string>(
    i18n.language || "en",
  );

  const handleSelectLanguage = React.useCallback((lang: string) => {
    setCurrentLang(lang);
  }, []);

  const defaultHandler = async () => {
    closeModal();
    handleChangeLanguage("en");
    setCurrentLang("en");
  };

  const handleSubmit = React.useCallback(() => {
    closeModal();
    handleChangeLanguage(currentLang);
  }, [currentLang]);

  return (
    <>
      <button className="flex items-center gap-1 p-1" onClick={openModal}>
        <span className="text-base font-medium uppercase">{i18n.language}</span>
        <BsGlobe className="text-base text-gray-500" />
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0">
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto bg-gray-700/25">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95">
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white  p-6 text-left align-middle shadow-xl transition-all dark:bg-dark-200">
                  <div className="flex items-center justify-between">
                    <Dialog.Title
                      as="h3"
                      className=" between text-light-text dark:text-dark-textColor text-lg font-medium leading-6">
                      Choose your language
                    </Dialog.Title>
                    <button
                      onClick={closeModal}
                      className="rounded-full p-1 hover:bg-gray-300 hover:dark:bg-gray-700">
                      <BsX
                        className={`h-6 w-6 cursor-pointer text-gray-800 dark:text-white`}
                      />
                    </button>
                  </div>
                  <hr className={`my-2 border-gray-400 dark:border-gray-700`} />

                  <div className="my-6 flex w-full flex-wrap items-center justify-center gap-5">
                    {languageList.map(language => (
                      <div className="relative" key={language.key}>
                        <button
                          onClick={() => {
                            handleSelectLanguage(language.key);
                          }}
                          className="flex items-center  gap-2 rounded-lg border border-gray-300 px-3 py-2 text-left transition-all delay-75 hover:bg-gray-100 dark:hover:bg-dark-100  ">
                          <span>{language.key.toUpperCase()}</span>
                          <span>{language.value}</span>
                        </button>
                        {currentLang === language.key && i18n.language && (
                          <span className="dark:bg-dark-700 absolute -top-[13px] -right-[15px] mr-2 inline-flex items-center rounded-full bg-green-500 p-1 text-sm font-semibold text-gray-800 dark:text-gray-300">
                            <svg
                              aria-hidden="true"
                              className="h-3 w-3"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg">
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"></path>
                            </svg>
                            <span className="sr-only">Icon description</span>
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                  <span className="text-sm">{t("modal:support")}</span>
                  <hr className={`my-2 border-gray-400 dark:border-gray-700`} />

                  <div className="mt-3 flex space-x-3">
                    <Button
                      buttonType="primary"
                      size="medium"
                      type="submit"
                      onClick={handleSubmit}>
                      <span className="text-white">
                        {t("modal:changeLanguage")}
                      </span>
                    </Button>
                    <Button
                      buttonType="ghost"
                      size="medium"
                      type="button"
                      onClick={defaultHandler}>
                      {t("common:default")}
                    </Button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default React.memo(LanguageModal);
