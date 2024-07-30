// import React, { ReactNode, createContext, useContext } from 'react';
// import isPropValid from '@emotion/is-prop-valid';
// import { ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
// import { router } from '@routes/router';
// import { QueryClientProvider } from '@tanstack/react-query';
// import { SnackbarProvider } from 'notistack';
// import { RouterProvider } from 'react-router-dom';
// import {
//   StyleSheetManager,
//   ThemeProvider as StyledThemeProvider,
// } from 'styled-components';
// import {useAuth} from '@hooks/useAuth';
// import './global.css';
// import { queryClient } from './lib/react-query';
// import { defaultMUITheme, defaultStyledTheme } from './styles/theme';
// interface AuthContextProps {
//   isAuthenticated: boolean;
//   loading: boolean;
//   login: (email: string, password: string) => Promise<void>;
//   logout: () => void;
//   refreshToken: () => Promise<void>;
// }
// interface AuthProviderProps {
//   children: ReactNode;
// }
// const defaultAuthContext: AuthContextProps = {
//   isAuthenticated: false,
//   loading: true,
//   login: async () => {},
//   logout: () => {},
//   refreshToken: async () => {},
// };
// const AuthContext = createContext<AuthContextProps>(defaultAuthContext);
// const AuthProvider = ({ children }: AuthProviderProps) => {
//   const auth = useAuth();
//   return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
// };
// export const useAuthContext = () => useContext(AuthContext);
// function App() {
//   return (
//     <QueryClientProvider client={queryClient}>
//       <SnackbarProvider maxSnack={3}>
//         <AuthProvider>
//           <MUIThemeProvider theme={defaultMUITheme}>
//             <StyleSheetManager
//               enableVendorPrefixes
//               shouldForwardProp={(propName, elementToBeRendered) => {
//                 return typeof elementToBeRendered === 'string'
//                   ? isPropValid(propName)
//                   : true;
//               }}
//             >
//               <StyledThemeProvider theme={defaultStyledTheme}>
//                 <RouterProvider router={router} />
//               </StyledThemeProvider>
//             </StyleSheetManager>
//           </MUIThemeProvider>
//         </AuthProvider>
//       </SnackbarProvider>
//     </QueryClientProvider>
//   );
// }
// export default App;
///////////////////////////////////////////////////////////
import React, { ReactNode, createContext, useContext } from 'react';

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

interface AuthContextProps {
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  refreshToken: () => Promise<void>;
}

// interface AuthProviderProps {
//   children: ReactNode;
// }

// const defaultAuthContext: AuthContextProps = {
//   isAuthenticated: false,
//   loading: true,
//   login: async () => {},
//   logout: () => {},
//   refreshToken: async () => {},
// };

// const AuthContext = createContext<AuthContextProps>(defaultAuthContext);

// const AuthProvider = ({ children }: AuthProviderProps) => {
//   const auth = useAuth();

//   return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
// };

// export const useAuthContext = () => useContext(AuthContext);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
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
      </AuthContextProvider>
    </QueryClientProvider>
  );
}

export default App;
