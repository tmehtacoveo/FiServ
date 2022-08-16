import HeroImage from '../assets/VodafonePTHeroBanner.jpeg'
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
        title: "V-Hub",
        redirectTo: "/home",
      },
      {
        title: "Espaço de conhecimento",
        redirectTo: "/",
      },
]


export const HeroConfig = {
    title  : 'Estudos',
    description : 'Artigos perspicazes para ajudá-lo a administrar e expandir seus negócios\n',
    background : HeroImage,
    buttonText : 'Leia o artigo mais recente',
    onClickButtonRedirect : '/search',
    
}


export const MainRecommendationConfig : RecommendationType= {

  title : 'Recomendações',
  description : "Aqui estão suas recomendações personalizadas",
  numberOfResults: 6,
  imageField : 'sfimage_url__c',
  pipeline : 'Vodafone PT',
  id : 'Recommendation'
}

export const VideoRecommendationConfig : RecommendationType  = {

  title : 'Vídeos',
  description : "Aqui estão suas recomendações personalizadas",
  numberOfResults: 3,
  imageField : 'ytthumbnailurl',
  pipeline : 'Youtube PT',
  id : 'Recommendation'
}