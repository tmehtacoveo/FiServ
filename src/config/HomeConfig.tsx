import HeroImage from "../assets/Hero.jpg";
import { RecommendationType } from "./Types/ConfigTypes";

export const NavBarConfig = [
  {
    title: "Overview",
    redirectTo: "/home",
  },
  {
    title: "Strategy",
    redirectTo: "/",
  },
  {
    title: "Our company",
    redirectTo: "/",
  },
  {
    title: "Our business",
    redirectTo: "/",
  },
];

export const HeaderConfig = [
  {
    title: "Innovation",
    redirectTo: "/home",
  },
  {
    title: "Products & Services",
    redirectTo: "/",
  },
  {
    title: "About",
    redirectTo: "/",
  },
  {
    title: "Investors",
    redirectTo: "/",
  },
  {
    title: "Sustainability",
    redirectTo: "/",
  },
];

export const HeroConfig = {
  title: "Pioneers of Power",
  description: "We are one of the world's leading global power groups",
  background: HeroImage,
  buttonText: "Vision",
  onClickButtonRedirect: "/search",
};

export const MainRecommendationConfig: RecommendationType = {
  title: "Recommendations",
  description: "Inside Rolls-Royce.",
  numberOfResults: 6,
  imageField: "sfimage_url__c",
  pipeline: "Homepage",
  id: "Recommendation",
};

export const VideoRecommendationConfig: RecommendationType = {
  title: "Videos",
  description: "Latest Stories.",
  numberOfResults: 3,
  imageField: "ytthumbnailurl",
  pipeline: "Video Rec Sidebar",
  id: "Recommendation",
};

export const EnableAuthentication = false;
