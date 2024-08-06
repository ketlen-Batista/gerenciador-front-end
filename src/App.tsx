import React from 'react';

import isPropValid from '@emotion/is-prop-valid';
import { ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
import { router } from '@routes/router';
import { QueryClientProvider } from '@tanstack/react-query';
import { SnackbarProvider } from 'notistack';
import { RouterProvider } from 'react-router-dom';
import {
  StyleSheetManager,
  ThemeProvider as StyledThemeProvider,
} from 'styled-components';

// import { useAuth } from '@hooks/useAuth';
import { AuthContextProvider } from './contexts/AuthContext';
import './global.css';
import { queryClient } from './lib/react-query';

import { defaultMUITheme, defaultStyledTheme } from './styles/theme';

function App() {
  return (
    <AuthContextProvider>
      <QueryClientProvider client={queryClient}>
        <SnackbarProvider maxSnack={3}>
          <MUIThemeProvider theme={defaultMUITheme}>
            <StyleSheetManager
              enableVendorPrefixes
              shouldForwardProp={(propName, elementToBeRendered) => {
                return typeof elementToBeRendered === 'string'
                  ? isPropValid(propName)
                  : true;
              }}
            >
              <StyledThemeProvider theme={defaultStyledTheme}>
                <RouterProvider router={router} />
              </StyledThemeProvider>
            </StyleSheetManager>
          </MUIThemeProvider>
        </SnackbarProvider>
      </QueryClientProvider>
    </AuthContextProvider>
  );
}

export default App;
