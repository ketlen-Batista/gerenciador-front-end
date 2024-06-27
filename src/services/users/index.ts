// import axios, { AxiosHeaders } from 'axios';
// const API_GIC_ENDPOINT = `http://localhost:3333`;
// export const apiGic = axios.create({
//   baseURL: API_GIC_ENDPOINT,
//   headers: { accept: '*/*' },
// });
// // * Response Interceptors
// apiGic.interceptors.response.use((response) => {
//   const removeEmptyDataResponse = () => {
//     return {
//       ...response,
//       data: response?.data === '' ? undefined : response?.data,
//     };
//   };
//   return removeEmptyDataResponse();
// });
// apiGic.interceptors.request.use(async (request) => {
//   const { data, params } = request;
//   const requestInfo = data || params;
//   const keycloakToken =
//     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiTUVNQkVSIiwic3ViIjoiMjkyMTA3ODQtNjI5Zi00YTY4LWE5MmQtNjlhNWVkMjNjMmFlIiwiaWF0IjoxNzE5MzI4MjIzLCJleHAiOjE3MTkzMjg4MjN9.1BRifUNyIPq4G1Lom20C2JJ1mjicaC3_Y0sKqyGtAts';
//   if (!keycloakToken) {
//     throw new axios.Cancel('Invalid Keycloak Token');
//   }
//   console.log('Request:', request);
//   if (keycloakToken) {
//     (request.headers as AxiosHeaders).set(
//       'Authorization',
//       `Bearer ${keycloakToken}`,
//     );
//   }
//   if (!requestInfo) return request;
//   return request;
// });
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
