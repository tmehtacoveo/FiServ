import HeroImage from '../assets/VodafoneHUHeroBanner.png'
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
        title: "V-Hub:Kezdőlap",
        redirectTo: "/home",
      },
      {
        title: "Tudástér",
        redirectTo: "/",
      },
]


export const HeroConfig = {
    title  : 'Digitális Tudástér',
    description : 'Értelmes cikkek, amelyek segítenek vállalkozása működtetésében és fejlesztésében',
    background : HeroImage,
    buttonText : 'Olvassa el a legújabb cikket',
    onClickButtonRedirect : '/search',
    
}


export const MainRecommendationConfig : RecommendationType= {

  title : 'Ajánlások',
  description : "Itt vannak az Ön személyre szabott ajánlásai",
  numberOfResults: 6,
  imageField : 'sfimage_url__c',
  pipeline : 'Vodafone HU',
  id : 'Recommendation'
}

export const VideoRecommendationConfig : RecommendationType  = {

  title : 'Videók',
  description : "Itt vannak az Ön személyre szabott ajánlásai",
  numberOfResults: 3,
  imageField : 'ytthumbnailurl',
  pipeline : 'Youtube HU',
  id : 'Recommendation'
}