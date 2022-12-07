import React, { FC, ReactNode } from "react";
import StandAloneBanner from "@/components/common/standaloneBanner/StandAloneBanner";
import { ConditionallyRender, LanguageModal, Logo } from "@/components/common";
import { useWindowSize } from "@/hooks";
import { useTranslation } from "react-i18next";

interface IStandAloneLayout {
  children: ReactNode;
  BannerComponent?: JSX.Element | null;
  ShowMenu?: boolean;
}
const StandAloneLayout: FC<IStandAloneLayout> = ({
  children,
  BannerComponent,
}) => {
  const { isMobile, isTablet } = useWindowSize();
  const isMobileOrTablet = Boolean(isMobile || isTablet);

  let banner = <StandAloneBanner title="NextGen" />;
  if (BannerComponent) {
    banner = BannerComponent;
  }
  const { t } = useTranslation();
  return (
    <section className="h-screen">
      <div
        className="relative h-full w-screen bg-[#030306] bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url(/assets/bg-1.webp)",
        }}>
        {/* --------------COMPONENTS SECTION--------------------  */}
        <div className="flex h-full flex-col items-center justify-center  shadow-lg">
          <div className="flex  max-w-screen-mobile justify-center rounded-lg bg-white dark:bg-gray-800  laptop:max-w-screen-laptop">
            <main className="h-full w-[30rem] space-y-10 p-10">
              <div className="flex items-center justify-between">
                <Logo className="h-7 w-7" logo />
                <LanguageModal />
              </div>
              <div>{children}</div>
            </main>
            {/* -------------------SIDE BANNER------------- */}
            <ConditionallyRender
              condition={!isMobileOrTablet}
              show={
                <>
                  <hr className="h-full border border-gray-300 dark:border-gray-700" />
                  <header className=" h-full w-[30rem] px-10 py-10">
                    {banner}
                  </header>
                </>
              }
            />
          </div>
          {/* --------COPYRIGHT SECTION ------------------ */}
          <div className="mt-5">
            <div className="flex items-center justify-center py-5">
              <span className="text-sm font-thin text-white">
                © 2021 NextGen. All rights reserved.
              </span>

              <span className="text-sm font-thin text-white">
                Made with ❤️ by{" "}
                <a
                  href="https://www.linkedin.com/in/rupak401/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm font-thin text-white underline">
                  Rupak Sapkota
                </a>
              </span>
            </div>
          </div>
        </div>
        {/* ----------------OWNER'S COPYRIGHT------------- */}
        <div className="absolute bottom-6 left-5">
          <span className="text-xs font-thin text-gray-600">Photo by:</span>{" "}
          <a
            href="https://unsplash.com/@still_loony?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
            className="text-xs font-thin text-gray-600 underline">
            Nadiia Ploshchenko 🇺🇦
          </a>
        </div>
      </div>
    </section>
  );
};

export default StandAloneLayout;
