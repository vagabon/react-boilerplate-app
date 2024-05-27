import { JSONObject } from '@vagabond-inc/react-boilerplate-md/dist/dto/api/ApiDto';
import { ThemeContextProvider } from '@vagabond-inc/react-boilerplate-md/dist/theme/context/ThemeContext';
import React, { PropsWithChildren, memo } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { AppScroll } from '../../../app/scroll/component/AppScroll';
import { SnackbarProvider } from '../snackbar/provider/SnackbarProvider';

export interface IAppThemeProps extends PropsWithChildren {
  palette: JSONObject;
}

export const AppTheme: React.FC<IAppThemeProps> = memo(({ palette, children }) => {
  return (
    <HelmetProvider data-rh='true' data-react-helmet='true'>
      <AppScroll />
      <ThemeContextProvider palette={palette}>
        <div className={'flex heigth100'}>{children}</div>
      </ThemeContextProvider>
      <SnackbarProvider />
    </HelmetProvider>
  );
});
