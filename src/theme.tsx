import {createTheme} from '@mui/material/styles';
import {red} from '@mui/material/colors';
import HeaderBG from "./assets/HeaderBG.jpeg";
import BOCHeroBanner from "./assets/BOCHeroBanner.png";
import BOCLogo from "./assets/BOCLogo.png";

export const Theme = {
  primaryText : '#586060',
  secondaryText: '#586060',
  primary : '#062D70',
  secondary: '#004990',
  selection : '#FFFFFF',
  link: '#ff0000FF',
  navbar: '#f7f2eb',
  background: '#E5E5E5',
  button : '#ff0000FF',
  footer: '#f3ebde',
  resultLink: '#1372EC',
  excerpt : '#626971',
  headerIconColor : "grey",
  HeaderBG: HeaderBG,
  HeroBanner: BOCHeroBanner,
  CompanyLogo: BOCLogo,
}

const theme = createTheme({
  palette: {
    mode: 'light',
    text :{
      primary : Theme.primaryText
    },
    primary: {
      main: Theme.primary,
    },
    secondary: {
      main: Theme.secondary,
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
  },
  typography: {
    fontFamily: 'Linde Dax Lig,Arial,sans-serif',
    // Material-UI uses rem units for the font size. This will change the base size for the entire search page
    // More info at https://material-ui.com/customization/typography/#font-size
    fontSize: 16,
    fontWeightRegular : '300',
    fontWeightMedium : '400'
  },
});

export default theme;
