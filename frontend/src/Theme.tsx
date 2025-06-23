import { createTheme, CssBaseline, ThemeProvider as MuiThemeProvider, type LinkProps, type ThemeOptions } from "@mui/material";
import { Link as RouterLink, type LinkProps as RouterLinkProps } from "react-router";
import { forwardRef, type ReactElement } from "react";
import { roRO as roLocale } from "@mui/material/locale";
import { roRO as roDataGrid } from "@mui/x-data-grid/locales";
import { roRO as roDatePickers } from "@mui/x-date-pickers/locales";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { ro } from "date-fns/locale/ro";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

const LinkBehavior = forwardRef<HTMLAnchorElement, Omit<RouterLinkProps, "to"> & { href: RouterLinkProps["to"] }>((props, ref) => {
  const { href, ...other } = props;
  // Map href (Material UI) -> to (react-router)
  return <RouterLink ref={ref} to={href} {...other} />;
});

const baseTheme: ThemeOptions = {
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        "*": {
          boxSizing: "border-box",
        },
        "html, body, #root": {
          height: "100%",
        },
      },
    },
    MuiLink: {
      defaultProps: {
        component: LinkBehavior,
      } as LinkProps,
    },
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: LinkBehavior,
      },
    },
  },
  palette: {
    mode: "dark",
  },
};

export const ThemeProvider = ({ children }: { children: ReactElement }) => {
  const roTranslations = [roLocale, roDataGrid, roDatePickers];

  const darkTheme = createTheme(baseTheme, ...roTranslations);

  return (
    <MuiThemeProvider theme={darkTheme}>
      <LocalizationProvider adapterLocale={ro} dateAdapter={AdapterDateFns}>
        <CssBaseline />
        {children}
      </LocalizationProvider>
    </MuiThemeProvider>
  );
};
