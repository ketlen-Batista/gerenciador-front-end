// import { useEffect, useState } from 'react';
// import axios from 'axios';
// const useAuth = () => {
//   const API_GIC_ENDPOINT = `http://localhost:3333`;
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [loading, setLoading] = useState(true);
//   useEffect(() => {
//     // Verifique a autenticação no carregamento do componente
//     const checkAuthStatus = async () => {
//       try {
//         const token = localStorage.getItem('authToken');
//         if (token) {
//           setIsAuthenticated(true);
//         }
//       } catch (error) {
//         console.error('Erro ao verificar o token:', error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     checkAuthStatus();
//   }, []);
//   const login = async (email, password) => {
//     try {
//       const response = await axios.post(`${API_GIC_ENDPOINT}/sessions`, {
//         email,
//         password,
//       });
//       const { token } = response.data;
//       localStorage.setItem('authToken', token);
//       setIsAuthenticated(true);
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
//       const response = await axios.patch(
//         `${API_GIC_ENDPOINT}/token/refresh`,
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
//   return { isAuthenticated, loading, login, logout, refreshToken };
// };
// export default useAuth;
import { useEffect, useState } from 'react';

import axios from 'axios';

const useAuth = () => {
  const API_GIC_ENDPOINT = `http://localhost:3333`;

  const [loading, setLoading] = useState(true);

  // Função para verificar se o usuário está autenticado
  const checkAuthStatus = () => {
    const token = localStorage.getItem('authToken');
    const isAuthenticated = !!token; // Converte para booleano
    console.log('Token recuperado:', token);
    console.log('isAuthenticated:', isAuthenticated);
    return isAuthenticated;
  };

  const [isAuthenticated, setIsAuthenticated] = useState(checkAuthStatus());

  useEffect(() => {
    // Verifique a autenticação no carregamento do componente
    const verifyToken = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (token) {
          setIsAuthenticated(true);
          startTokenRenewal();
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Erro ao verificar o token:', error);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    verifyToken();

    return () => {
      // Limpa o intervalo ao desmontar o componente
      stopTokenRenewal();
    };
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${API_GIC_ENDPOINT}/sessions`, {
        email,
        password,
      });
      const { token } = response.data;
      console.log('Token recebido:', token);
      localStorage.setItem('authToken', token); // Salva o token no localStorage
      setIsAuthenticated(true);
      setLoading(false); // Adicione esta linha para garantir que o loading seja definido como false após o login
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
  };

  const refreshToken = async () => {
    try {
      const response = await axios.patch(
        `${API_GIC_ENDPOINT}/token/refresh`,
        {},
        { withCredentials: true },
      );
      const { token } = response.data;
      localStorage.setItem('authToken', token);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Erro ao atualizar o token:', error);
      logout();
    }
  };

  let tokenRenewalInterval = null;

  const startTokenRenewal = () => {
    if (tokenRenewalInterval) return; // Evita múltiplos intervalos
    tokenRenewalInterval = setInterval(refreshToken, 480000); // 480000 ms = 8 minutos
  };

  const stopTokenRenewal = () => {
    if (tokenRenewalInterval) {
      clearInterval(tokenRenewalInterval);
      tokenRenewalInterval = null;
    }
  };

  return { isAuthenticated, loading, login, logout, refreshToken };
};

export default useAuth;
