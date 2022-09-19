import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

export const Theme = {
  primaryText: "#000000",
  secondaryText: "#FFFFFF",
  primary: "#3c8705",
  secondary: "#004990",
  selection: "#3c8705",
  link: "#3c8705",
  navbar: "#bc9770",
  background: "#FFFF00",
  button: "#000000",
  footer: "#bc9770",
  resultLink: "#000000",
  excerpt: "#626971",
  headerIconColor: "grey",
};

const theme = createTheme({
  palette: {
    mode: "light",
    text: {
      primary: Theme.primaryText,
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
      default: "#fff",
    },
  },
  typography: {
    fontFamily:
      "Nespresso Lucas, Gibson,Noto Sans, Avenir, Helvetica, Arial, sans-serif",
    // Material-UI uses rem units for the font size. This will change the base size for the entire search page
    // More info at https://material-ui.com/customization/typography/#font-size
    fontSize: 16,
    fontWeightRegular: "300",
    fontWeightMedium: "400",
  },
});

export default theme;
