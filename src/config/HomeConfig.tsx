import { RecommendationType } from './Types/ConfigTypes';
import {Theme} from "../theme";

export const NavBarConfig = [
  {
    title: "Linde",
    redirectTo: "/home",
  },
  {
    title: "About BOC",
    redirectTo: "/",
  },
  {
    title: "Careers",
    redirectTo: "/",
  },
  {
    title: "Sign in | Register",
    redirectTo: "/",
  },
  {
    title: "Store Finder",
    redirectTo: "/",
  },
  {
    title: "Products & Services A-Z",
    redirectTo: "/",
  },
];


export const HeaderConfig = [
    {
        title: "Healthcare",
        redirectTo: "/home",
      },
      {
        title: "Gas A-Z",
        redirectTo: "/",
      },
      {
        title: "Gas by Use",
        redirectTo: "/",
      },
      {
        title: "Gas Regulators",
        redirectTo: "/",
      },
      {
        title: "Equipment & Accessories",
        redirectTo: "/",
      },
  {
    title: "PPE & Workwear",
    redirectTo: "/",
  },

  {
    title: "Training Courses",
    redirectTo: "/",
  },

  {
    title: "Manage My Account",
    redirectTo: "/",
  },
]


export const HeroConfig = {
    title  : 'We are BOC',
    description : 'The largest provider of industrial, medical and special gases in the UK and Ireland',
    background : Theme.HeroBanner,
    buttonText : 'Learn More',
    onClickButtonRedirect : '/search',
    
}


export const MainRecommendationConfig : RecommendationType= {

  title : 'Recommendations',
  description : "Here are your personalized recommendations",
  numberOfResults: 6,
  imageField : 'sfimage_url__c',
  pipeline : 'default',
  id : 'Recommendation'
}

export const VideoRecommendationConfig : RecommendationType  = {

  title : 'Videos',
  description : "Here are your personalized recommendations",
  numberOfResults: 3,
  imageField : 'ytthumbnailurl',
  pipeline : 'BOC Youtube',
  id : 'Recommendation'
}