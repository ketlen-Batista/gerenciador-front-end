// import React, { ReactNode, createContext, useContext } from 'react';
// import isPropValid from '@emotion/is-prop-valid';
// import { ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
// import { router } from '@routes/router';
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { RouterProvider } from 'react-router-dom';
// import {
//   StyleSheetManager,
//   ThemeProvider as StyledThemeProvider,
// } from 'styled-components';
// import useAuth from '@hooks/useAuth';
// // Caminho correto para seus temas
// import './global.css';
// import { queryClient } from './lib/react-query';
// // Caminho correto para seu arquivo de rotas
// import { defaultMUITheme, defaultStyledTheme } from './styles/theme';
// // O caminho correto para o hook de autenticação
// interface AuthContextProps {
//   isAuthenticated: boolean;
//   loading: boolean;
//   login: (email: string, password: string) => Promise<void>;
//   logout: () => void;
//   refreshToken: () => Promise<void>;
// }
// interface AuthProvider {
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
// const AuthProvider = ({ children }: AuthProvider) => {
//   const auth = useAuth();
//   return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
// };
// export const useAuthContext = () => useContext(AuthContext);
// function App() {
//   return (
//     <QueryClientProvider client={queryClient}>
//       <AuthProvider>
//         <MUIThemeProvider theme={defaultMUITheme}>
//           <StyleSheetManager
//             enableVendorPrefixes
//             shouldForwardProp={(propName, elementToBeRendered) => {
//               return typeof elementToBeRendered === 'string'
//                 ? isPropValid(propName)
//                 : true;
//             }}
//           >
//             <StyledThemeProvider theme={defaultStyledTheme}>
//               <RouterProvider router={router} />
//             </StyledThemeProvider>
//           </StyleSheetManager>
//         </MUIThemeProvider>
//       </AuthProvider>
//     </QueryClientProvider>
//   );
// }
// export default App;
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

import useAuth from '@hooks/useAuth';

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

interface AuthProviderProps {
  children: ReactNode;
}

const defaultAuthContext: AuthContextProps = {
  isAuthenticated: false,
  loading: true,
  login: async () => {},
  logout: () => {},
  refreshToken: async () => {},
};

const AuthContext = createContext<AuthContextProps>(defaultAuthContext);

const AuthProvider = ({ children }: AuthProviderProps) => {
  const auth = useAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SnackbarProvider maxSnack={3}>
        <AuthProvider>
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
        </AuthProvider>
      </SnackbarProvider>
    </QueryClientProvider>
  );
}

export default App;
