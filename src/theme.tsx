import {createTheme} from '@mui/material/styles';
import {red} from '@mui/material/colors';

export const Theme = {
  primary: '#333357',
  secondary: 'white',
  selection : '#1372EC',
  link: '#1372EC',
  navbar: '#062D70',
  background: '#E5E5E5',
  button : '#1372EC',
  footer: '#262646'
}

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2e45ba',
    },
    secondary: {
      main: '#004990',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
  },
  typography: {
    fontFamily: 'Avenir, Helvetica, Arial, sans-serif',
    // Material-UI uses rem units for the font size. This will change the base size for the entire search page
    // More info at https://material-ui.com/customization/typography/#font-size
    fontSize: 17,
  },
});

export default theme;
