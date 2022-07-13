import HeroImage from '../assets/Hero.jpg'

export const NavBarConfig = [
  {
    title: "Personal",
    redirectTo: "/home",
  },
  {
    title: "Business",
    redirectTo: "/",
  },
  {
    title: "Commerical",
    redirectTo: "/",
  },
  {
    title: "About",
    redirectTo: "/",
  },
];


export const HeaderConfig = [
    {
        title: "Bank Account",
        redirectTo: "/home",
      },
      {
        title: "Credit Card",
        redirectTo: "/",
      },
      {
        title: "Mortgages",
        redirectTo: "/",
      },
      {
        title: "Investment",
        redirectTo: "/",
      },
      {
        title: "Insurance",
        redirectTo: "/",
      },
]


export const HeroConfig = {
    title  : 'Life changes fast',
    description : 'A BTEP Mortgage gives you the flexibility to use the equity from your home when you need it.',
    background : HeroImage,
    buttonText : 'Learn More',
    onClickButtonRedirect : '/search',
    
}


export const MainRecommendationConfig = {

  title : 'Recommendations',
  description : "Here are your personalized recommendations",
  numberOfResults: 6,
  imageField : 'sfimage_url__c',
  pipeline : 'Homepage',
  id : 'Recommendation'
}

export const VideoRecommendationConfig = {

  title : 'Videos',
  description : "Here are your personalized recommendations",
  numberOfResults: 3,
  imageField : 'ytthumbnailurl',
  pipeline : 'Video Rec Sidebar',
  id : 'Recommendation'
}