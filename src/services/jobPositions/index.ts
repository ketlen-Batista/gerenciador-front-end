import axios from 'axios';

const API_GIC_ENDPOINT = 'http://localhost:3333';

export const apiGic = axios.create({
  baseURL: API_GIC_ENDPOINT,
  headers: {
    accept: '*/*',
  },
});

// Interceptor para adicionar token de autorização
apiGic.interceptors.request.use(
  async (config) => {
    // Obter o token de autenticação do contexto de autenticação (por exemplo, localStorage)
    const keycloakToken = localStorage.getItem('authToken');

    // Verifica se o token de Keycloak existe
    if (keycloakToken) {
      config.headers.Authorization = `Bearer ${keycloakToken}`;
    } else {
      throw new axios.Cancel('Invalid Keycloak Token');
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Interceptor para tratar a resposta
apiGic.interceptors.response.use(
  (response) => {
    // Remove dados vazios da resposta
    if (response.data === '') {
      return { ...response, data: undefined };
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// export default apiGic;
