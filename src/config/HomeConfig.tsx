import HeroImage from '../assets/HeroBanner.jpeg'
import { RecommendationType } from './Types/ConfigTypes';

export const NavBarConfig = [
  {
    title: "Personal",
    redirectTo: "/home",
  },
  {
    title: "Business",
    redirectTo: "/",
  },
];


export const HeaderConfig = [
    {
        title: "V-Hub:Home",
        redirectTo: "/home",
      },
      {
        title: "Advice Centre",
        redirectTo: "/",
      },
]


export const HeroConfig = {
    title  : 'Business Advice Centre',
    description : 'Insightful articles to help you run and grow your business',
    background : HeroImage,
    buttonText : 'Read the latest article',
    onClickButtonRedirect : '/search',
    
}


export const MainRecommendationConfig : RecommendationType= {

  title : 'Recommendations',
  description : "Here are your personalized recommendations",
  numberOfResults: 6,
  imageField : 'sfimage_url__c',
  pipeline : 'Homepage',
  id : 'Recommendation'
}

export const VideoRecommendationConfig : RecommendationType  = {

  title : 'Videos',
  description : "Here are your personalized recommendations",
  numberOfResults: 3,
  imageField : 'ytthumbnailurl',
  pipeline : 'Video Rec Sidebar',
  id : 'Recommendation'
}