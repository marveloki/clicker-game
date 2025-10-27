import { createTheme } from "@mui/material/styles";
export const colorPalette = {
  baseBlue: "#0052FF", // Base main blue
  baseDark: "#001F8A", // Base dark blue
  baseLight: "#4285FF", // Base light blue
  white: "#FFFFFF",
  gray: "#F5F5F5",
  darkGray: "#666666",
  red: "#ff3737",
  orange: "#f28705", // Orange color
  peach: "#f2b680", // Peach color
  indigo: "#531aa5", // Indigo color
  yellow: "#ffb604", // Yellow color
};

export const MuiTheme = createTheme({
  typography: {
    fontFamily: '"Poppins", sans-serif',
  },
  palette: {
    primary: {
      main: colorPalette.baseBlue,
    },
    secondary: {
      main: colorPalette.baseLight,
    },
    error: {
      main: colorPalette.red,
    },
  },
});
