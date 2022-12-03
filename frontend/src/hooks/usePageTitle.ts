import { useEffect } from "react";
import { DEFAULT_PAGE_TITLE } from "@/constants/constants";

export const usePageTitle = (title?: string) => {
  useEffect(() => {
    if (title) {
      document.title = title;
      return () => {
        document.title = DEFAULT_PAGE_TITLE;
      };
    }
  }, [title]);
};
