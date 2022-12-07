import { useState, useEffect } from "react";

interface Size {
  width: number;
  height: number;
}

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState<Size>({
    width: 0,
    height: 0,
  });
  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowSize.width && windowSize.width < 640;
  const isTablet =
    windowSize.width && windowSize.width >= 640 && windowSize.width < 768;
  const isLaptop =
    windowSize.width && windowSize.width <= 768 && windowSize.width < 1024;

  return {
    isMobile,
    isTablet,
    isLaptop,
    windowSize,
  };
};
