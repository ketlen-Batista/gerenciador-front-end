// import { useEffect, useState } from 'react';

// import { api } from '@src/lib/axios';

// const useAuth = () => {
//   const [loading, setLoading] = useState(true);

//   const checkAuthStatus = () => {
//     const token = localStorage.getItem('authToken');
//     return !!token;
//   };

//   const [isAuthenticated, setIsAuthenticated] = useState(checkAuthStatus());

//   useEffect(() => {
//     const verifyToken = async () => {
//       try {
//         const token = localStorage.getItem('authToken');
//         if (token) {
//           setIsAuthenticated(true);
//           startTokenRenewal();
//         } else {
//           setIsAuthenticated(false);
//         }
//       } catch (error) {
//         console.error('Erro ao verificar o token:', error);
//         setIsAuthenticated(false);
//       } finally {
//         setLoading(false);
//       }
//     };

//     verifyToken();

//     return () => {
//       stopTokenRenewal();
//     };
//   }, []);

//   const login = async (email, password) => {
//     try {
//       const response = await api.post(`/sessions`, { email, password });
//       const { token } = response.data;
//       localStorage.setItem('authToken', token);
//       setIsAuthenticated(true);
//       setLoading(false);
//     } catch (error) {
//       console.error('Erro ao fazer login:', error);
//       throw error;
//     }
//   };

//   const logout = () => {
//     localStorage.removeItem('authToken');
//     setIsAuthenticated(false);
//   };

//   const refreshToken = async () => {
//     try {
//       const response = await api.patch(
//         `/token/refresh`,
//         {},
//         { withCredentials: true },
//       );
//       const { token } = response.data;
//       localStorage.setItem('authToken', token);
//       setIsAuthenticated(true);
//     } catch (error) {
//       console.error('Erro ao atualizar o token:', error);
//       logout();
//     }
//   };

//   let tokenRenewalInterval = null;

//   const startTokenRenewal = () => {
//     if (tokenRenewalInterval) return;
//     // Definir intervalo de 8 horas (28800000 milissegundos)
//     const eightHoursInMilliseconds = 8 * 60 * 60 * 1000;
//     tokenRenewalInterval = setInterval(refreshToken, eightHoursInMilliseconds);
//   };

//   const stopTokenRenewal = () => {
//     if (tokenRenewalInterval) {
//       clearInterval(tokenRenewalInterval);
//       tokenRenewalInterval = null;
//     }
//   };

//   return { isAuthenticated, loading, login, logout, refreshToken };
// };

// export default useAuth;


import { useContext } from "react";
import { AuthContext } from "@contexts/AuthContext";

export function useAuth() {
  return useContext(AuthContext);
}
