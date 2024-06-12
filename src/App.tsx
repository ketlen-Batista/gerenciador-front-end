import React from 'react';

import isPropValid from '@emotion/is-prop-valid';
import { ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
import { router } from '@routes/router';
import { RouterProvider } from 'react-router-dom';
import {
  StyleSheetManager,
  ThemeProvider as StyledThemeProvider,
} from 'styled-components';

import {
  antdThemeConfig,
  defaultMUITheme,
  defaultStyledTheme,
} from '@styles/theme';

import './global.css';

function App() {
  return (
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
  );
}

export default App;
