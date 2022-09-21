import HeroImage from "../assets/Hero.jpg";
import { RecommendationType } from "./Types/ConfigTypes";

export const NavBarConfig = [
  {
    title: "FAQ",
    redirectTo: "/home",
  },
  {
    title: "Easy Order",
    redirectTo: "/",
  },
  {
    title: "Store Locator",
    redirectTo: "/",
  },
  {
    title: "Shipping & Returns",
    redirectTo: "/",
  },
];

export const HeaderConfig = [
  {
    title: "Coffee",
    redirectTo: "/home",
  },
  {
    title: "Machines",
    redirectTo: "/",
  },
  {
    title: "Accessories",
    redirectTo: "/",
  },
  {
    title: "Recycling",
    redirectTo: "/",
  },
  {
    title: "For Business",
    redirectTo: "/",
  },
];

export const HeroConfig = {
  title: "",
  description: "",
  background: HeroImage,
  buttonText: "Learn More",
  onClickButtonRedirect: "/search",
};

export const MainRecommendationConfig: RecommendationType = {
  title: "TRENDING NOW",
  description: "Here are your personalized recommendations",
  numberOfResults: 6,
  imageField: "nes_image",
  pipeline: "default with nes_image rule - test",
  id: "Recommendation",
};

export const VideoRecommendationConfig: RecommendationType = {
  title: "Videos",
  description: "Here are your personalized recommendations",
  numberOfResults: 3,
  imageField: "ytthumbnailurl",
  pipeline: "Youtube",
  id: "Recommendation",
};

export const EnableAuthentication = false;
