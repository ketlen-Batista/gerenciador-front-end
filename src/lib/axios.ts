import { env } from '@src/env';
import {
  storageAuthTokenGet,
  storageAuthTokenSave,
} from '@storage/storageAuthToken';
import axios, { AxiosError, AxiosInstance } from 'axios';

import { AppError } from '@utils/AppError';

type SignOut = () => void;

type APIInstanceProps = AxiosInstance & {
  registerInterceptTokenManager: (signOut: SignOut) => () => void;
};

type PromiseType = {
  onSuccess: (token: string) => void;
  onFailure: (error: AxiosError) => void;
};

const api = axios.create({
  baseURL: env.VITE_API_URL,
  withCredentials: true,
}) as APIInstanceProps;

let failedQueue: Array<PromiseType> = [];
let isRefreshing = false;

api.registerInterceptTokenManager = (signOut) => {
  const interceptTokenManager = api.interceptors.response.use(
    (response) => response,
    async (requestError) => {
      if (requestError?.response?.status === 401) {
        const originalRequestConfig = requestError.config;

        if (
          [
            'Não Autorizado, token inválido.',
            'token.expired',
            'token.invalid',
          ].includes(requestError.response?.data?.message)
        ) {
          const { refresh_token } = await storageAuthTokenGet();

          if (!refresh_token) {
            signOut();
            return Promise.reject(
              new AppError('Token expirado, faça login novamente.'),
            );
          }

          if (isRefreshing) {
            return new Promise((resolve, reject) => {
              failedQueue.push({
                onSuccess: (token: string) => {
                  originalRequestConfig.headers['Authorization'] =
                    `Bearer ${token}`;
                  resolve(api(originalRequestConfig));
                },
                onFailure: (error: AxiosError) => {
                  reject(error);
                },
              });
            });
          }

          isRefreshing = true;

          return new Promise(async (resolve, reject) => {
            try {
              const { data } = await api.post('/token/refresh', {
                refresh_token,
              });

              await storageAuthTokenSave({
                token: data.token,
                refresh_token: data.refreshToken,
              });

              api.defaults.headers.common['Authorization'] =
                `Bearer ${data.token}`;
              originalRequestConfig.headers['Authorization'] =
                `Bearer ${data.token}`;

              failedQueue.forEach((request) => request.onSuccess(data.token));

              resolve(api(originalRequestConfig));
              return;
            } catch (error: any) {
              failedQueue.forEach((request) => request.onFailure(error));
              signOut();
              reject(error);
            } finally {
              isRefreshing = false;
              failedQueue = [];
            }
          });
        }

        signOut();
      }

      if (requestError.response && requestError.response.data) {
        return Promise.reject(new AppError(requestError.response.data.message));
      } else {
        return Promise.reject(new AppError(requestError));
      }
    },
  );

  return () => {
    api.interceptors.response.eject(interceptTokenManager);
  };
};

export { api };
