import { CssBaseline, PaletteColorOptions, ThemeProvider, createTheme } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import '../src/assets/boilerplate.scss';
import '../src/assets/custom.scss';
import '../src/i18n/i18n';

declare module '@mui/material/styles' {
  interface CustomPalette {
    google: PaletteColorOptions;
    facebook: PaletteColorOptions;
  }
  interface Palette extends CustomPalette {}
  interface PaletteOptions extends CustomPalette {}
}

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#45AD1C',
    },
    secondary: {
      main: '#0D3296',
    },
    google: {
      main: '#ff6060',
    },
    facebook: {
      main: '#009dff',
    },
  },
  typography: {
    htmlFontSize: 17,
  },
});

export const withMuiTheme = (Story, context) => (
  <SnackbarProvider maxSnack={5}>
    <HelmetProvider data-rh='true' ata-react-helmet='true'>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Story {...context} />
      </ThemeProvider>
    </HelmetProvider>
  </SnackbarProvider>
);

export const decorators = [withMuiTheme];

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
