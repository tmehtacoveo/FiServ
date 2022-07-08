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