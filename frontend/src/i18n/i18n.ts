import i18n from "i18next";
import Backend from "i18next-xhr-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

const fallbackLng: string[] = ["en"];

const isProduction = process.env.NODE_ENV === "production";

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    backend: {
      // translation file path
      loadPath: "/public/assets/i18n/{{ns}}/{{lng}}.json",
    },
    fallbackLng,
    debug: !isProduction,
    // can have multiple namespace, in case you want to divide a huge translation into smaller pieces and load them on demand
    ns: ["login", "common", "modal", "posts", "profile", "notifications"],
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
      formatSeparator: ",",
    },
    react: {
      useSuspense: true,
    },
    saveMissing: !isProduction,
  });

export default i18n;
