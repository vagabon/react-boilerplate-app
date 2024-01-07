import { CssBaseline, PaletteColorOptions, ThemeProvider, createTheme } from '@mui/material';
import React from 'react';
import '../config';
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
      main: '#afafaf',
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
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Story {...context} />
  </ThemeProvider>
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
