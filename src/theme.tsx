import {createTheme} from '@mui/material/styles';
import {red} from '@mui/material/colors';
import CompanyLogo from "./assets/VodafoneLogo.svg";
import Cart from "./assets/Cart.svg";

export const Theme = {
  primaryText : '#666666FF',
  secondaryText: '#FFFFFF',
  HeroBannerText: "#000000",
  cardTitle: "#333333",
  primary : '#062D70',
  secondary: '#004990',
  selection : '#e60000FF',
  link: '#FFFFFF',
  navbar: '#4a4d4e',
  background: '#E5E5E5',
  button : '#e60000FF',
  footer: '#333',
  resultLink: '#1372EC',
  excerpt : '#333333',
  headerIconColor : "grey",
  companyLogo: CompanyLogo,
  bodyBackground: "#f4f4f4",
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
    fontFamily: '"Vodafone Lt Regular", Arial, Helvetica, sans-serif',
    // Material-UI uses rem units for the font size. This will change the base size for the entire search page
    // More info at https://material-ui.com/customization/typography/#font-size
    fontSize: 16,
    fontWeightRegular : '300',
    fontWeightMedium : '400'
  },
});

export default theme;
