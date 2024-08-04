// import { env } from '@src/env';
// import {useAuth} from '@src/hooks/useAuth';
// import axios from 'axios';

// export const api = axios.create({
//   baseURL: env.VITE_API_URL,
//   withCredentials: true,
// });

// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('authToken');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error),
// );

// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;
//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       try {
//         const response = await api.patch(
//           '/token/refresh',
//           {},
//           { withCredentials: true },
//         );
//         const { token } = response.data;
//         localStorage.setItem('authToken', token);
//         originalRequest.headers.Authorization = `Bearer ${token}`;
//         return axios(originalRequest);
//       } catch (refreshError) {
//         // useAuth().logout();
//       }
//     }
//     return Promise.reject(error);
//   },
// );


////////////////////////////////////////////

import { env } from '@src/env';

import axios, {AxiosError, AxiosInstance} from "axios";
import { AppError } from "@utils/AppError";
import { storageAuthTokenGet, storageAuthTokenSave } from "@storage/storageAuthToken";

type SignOut = () => void;

type APIInstanceProps = AxiosInstance & {
  registerInterceptTokenManager: (signOut: SignOut) => () => void;
}

type PromisseType = {
  onSuccess: (token: string) => void;
  onFailure: (error: AxiosError) => void;
}

const api = axios.create({
  baseURL: env.VITE_API_URL,
  withCredentials: true,
}) as APIInstanceProps;

let failedQueue: Array<PromisseType> = [];
let isRefreshing = false;

api.registerInterceptTokenManager = signOut => {
  const interceptTokenManager = api.interceptors.response.use(
    (response) => response,
   async (requestError) => {

      if(requestError?.response?.status === 401){
        if(
          requestError.response?.data?.message === 'Não Autorizado, token inválido.' || 
          requestError.response?.data?.message === 'token.expired' || 
          requestError.response?.data?.message === 'token.invalid'
        ) {
          const {refresh_token} = await storageAuthTokenGet();
console.log("pegando refresh token", refresh_token)
          if(!refresh_token) {
            signOut();
            return Promise.reject(new AppError('Token expirado, faça login novamente.'));
          }

          const originalRequestConfig = requestError.config

          if(isRefreshing){
            return new Promise((resolve, reject) => {
              failedQueue.push({
                onSuccess: (token: string) => {
                  originalRequestConfig.headers = {'Authorization': `Bearer ${token}`};
                  resolve(api(originalRequestConfig))
                },
                onFailure: (error: AxiosError) => {
                  reject(error)
                }
              })
            })
          }
          isRefreshing = true;

          return new Promise(async(resolv, reject) => {
            try{
              const {data} = await api.post('/token/refresh', {refresh_token});

              await storageAuthTokenSave({token: data?.token , refresh_token: data.refreshToken})

              if(originalRequestConfig.data) {
                originalRequestConfig.data = JSON.parse(originalRequestConfig.data)
              }

              originalRequestConfig.headers = {'Authorization': `Bearer ${data.token}`};
              api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;

              failedQueue.forEach(request => {
                request.onSuccess(data.token)
              })

              console.log("TOKEN ATUALIZADO")

              resolv(api(originalRequestConfig))

            } catch(error: any) {
              failedQueue.forEach(request => {
                request.onFailure(error)
              })

              signOut()
              reject(error);

            } finally {
              isRefreshing = false;
              failedQueue = []
            }
          })
        }

        signOut();
      }

      if (requestError.response && requestError.response.data) {
        return Promise.reject(new AppError(requestError.response.data.message));
      } else return Promise.reject(new AppError(requestError));
    }
  );

  return () => {
    api.interceptors.response.eject(interceptTokenManager)
  }
}

// api.interceptors.request.use(
//     (config) => {
//         return config
// },
// (error) => {
// return Promise.reject(error)
// })



export { api };

