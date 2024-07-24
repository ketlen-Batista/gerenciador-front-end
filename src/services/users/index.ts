import useAuth from '@src/hooks/useAuth';
import axios from 'axios';

const API_GIC_ENDPOINT = 'http://localhost:3333';

export const apiGic = axios.create({
  baseURL: API_GIC_ENDPOINT,
  withCredentials: true, // Garante que os cookies sejam enviados
});

apiGic.interceptors.request.use(
  async (config) => {
    const keycloakToken = localStorage.getItem('authToken');
    if (keycloakToken) {
      config.headers.Authorization = `Bearer ${keycloakToken}`;
    } else {
      throw new axios.Cancel('Invalid Keycloak Token');
    }
    return config;
  },
  (error) => Promise.reject(error),
);

apiGic.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const response = await apiGic.patch(
          '/token/refresh',
          {},
          { withCredentials: true },
        );
        const { token } = response.data;
        localStorage.setItem('authToken', token);
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return axios(originalRequest);
      } catch (refreshError) {
        useAuth().logout();
      }
    }
    return Promise.reject(error);
  },
);

export default apiGic;
