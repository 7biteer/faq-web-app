import React, { useMemo } from "react";
import {
  CssBaseline,
  StyledEngineProvider,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import componentsOverride from "./overrides";
import { breakpoints } from "./base";

const ThemeCustomization = ({ children }: { children: React.ReactNode }) => {
  const themeOptions = useMemo(
    () => ({
      breakpoints,
      mode: "dark",
      palette: {
        primary: {
          main: "#00ff7f",
        },
        secondary: {
          main: "#006838",
        },
        background: {
          paper: "#222327",
          default: "#121314",
        },
        text: {
          primary: "#efefef",
        },
      },
    }),
    []
  );

  const theme = createTheme(themeOptions);
  theme.components = componentsOverride(theme);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default ThemeCustomization;
