import React, { FC, ReactNode } from "react";
// import Gradient from "../Gradient/Gradient";
import ConditionallyRender from "../conditionallyRender/ConditionallyRender";
import { useWindowSize } from "@/hooks";
import Gradient from "../Gradient/Gradient";
import { useTranslation } from "react-i18next";
import Logo from "../shared/logo/Logo";
import Slider from "react-slick";
import { ReactComponent as Thoughts } from "@/assets/img/thoughts.svg";
import { ReactComponent as Influencer } from "@/assets/img/influencer.svg";
import { ReactComponent as Fun } from "@/assets/img/fun.svg";

import Links from "../utility/Links";
import { PUBLIC_FEEDS } from "@/constants/routes";

interface IStandAloneBanner {
  children?: ReactNode;
  title?: string;
}

const slickData = [
  {
    title: "Share your thoughts",
    description:
      "lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet",
    image: Thoughts,
  },
  {
    title: "Become an influencer",
    description:
      "lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet",
    image: Influencer,
  },
  {
    title: "Messaging made fun",
    description:
      "lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet",
    image: Fun,
  },
];

const StandAloneBanner: FC<IStandAloneBanner> = ({ children, title }) => {
  const { isMobile } = useWindowSize();
  const { t } = useTranslation();
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    arrows: false,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 4000,
  };
  return (
    <div className=" w-[26rem]">
      <Slider {...settings}>
        {slickData.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center">
            <div className="flex flex-col items-center">
              <item.image className="h-48 w-48" />
              <h1 className="mt-5 text-xl font-semibold text-gray-800 dark:text-white">
                {item.title}
              </h1>
              <p className="mt-3 text-center text-sm font-light text-gray-500 dark:text-gray-300">
                {item.description}
              </p>
            </div>
            <Links
              to={PUBLIC_FEEDS}
              className="my-3 rounded-full bg-blue-400/30 px-4 py-2 text-[13px]">
              Public Feeds
            </Links>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default StandAloneBanner;
