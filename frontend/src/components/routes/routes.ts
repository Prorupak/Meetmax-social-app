import { SOCIAL_AUTH_FAILED } from "./../../constants/routes";
import { HOME, LOGIN, PUBLIC_FEEDS } from "@/constants/routes";
import { IRoutes } from "@/types/types";
import { Login } from "../auth";
import Homepage from "../home/Homepage";
import PublicFeeds from "../publicFeeds/PublicFeeds";
import SocialAuthFailed from "../auth/SocialAuth/SocialAuthFailed";

export const routes: IRoutes[] = [
  {
    path: HOME,
    title: "Meetmax",
    component: Homepage,
    type: "protected",
    menu: {},
    isStandalone: true,
  },
  {
    path: LOGIN,
    title: "Log in",
    component: Login,
    type: "public",
    menu: {},
    isStandalone: true,
  },
  {
    path: PUBLIC_FEEDS,
    title: "Feeds",
    component: PublicFeeds,
    type: "public",
    menu: {},
  },
  {
    path: SOCIAL_AUTH_FAILED,
    title: "Social Auth Failed",
    component: SocialAuthFailed,
    type: "public",
    menu: {},
    isStandalone: true,
  },
];

export const getRoute = (path: string) => {
  return routes.find(route => route.path === path);
};

export const baseRoutes = routes.filter(route => !route.hidden);

const computedRoutes = () => {
  const mainNavRoutes = baseRoutes.filter(route => route.menu.advanced);
  const mobileRoutes = baseRoutes.filter(route => route.menu.mobile);

  const computedRoutes = {
    mainNavRoutes,
    mobileRoutes,
  };
  return () => computedRoutes;
};

export const getRoutes = computedRoutes();
