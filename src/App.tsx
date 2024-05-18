// import React, { useState } from 'react';
// import './global.css';
// import Dashboard from './pages/Dashboard';
// function App() {
//   const [isDark, setIsDark] = useState(false);
//   const handleThemeMode = () => {
//     setIsDark(!isDark);
//   };
//   return (
//     <div theme-mode={isDark ? 'dark' : 'ligth'}>
//       <Dashboard isDark={isDark} handleThemeMode={handleThemeMode} />
//     </div>
//   );
// }
// export default App;
import React, { useState } from 'react';

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
  // const [isDark, setIsDark] = useState(false);

  // const handleThemeMode = () => {
  //   setIsDark(!isDark);
  // };

  return (
    // <div theme-mode={isDark ? 'dark' : 'ligth'}>
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
    // </div>
  );
}

export default App;
