// import React, { createContext, useEffect, useState } from 'react';
// import { UserDTO } from '@dtos/UserDTO';
// import { api } from '@src/lib/axios';
// import { useGetPermissions } from '@src/services/permissions/queries';
// import {
//   storageAuthTokenGet,
//   storageAuthTokenRemove,
//   storageAuthTokenSave,
// } from '@storage/storageAuthToken';
// import {
//   storageUserGet,
//   storageUserRemove,
//   storageUserSave,
// } from '@storage/storageUser';
// import { getImageUrlServer } from '@utils/functions';
// export type AuthContextDataProps = {
//   user: UserDTO;
//   signIn: (email: string, password: string) => Promise<void>;
//   isLoadingStorageData: boolean;
//   signOut: () => Promise<void>;
//   userPhoto: string;
//   permissions: any;
// };
// type AuthContextProviderProps = {
//   children: React.ReactNode;
// };
// export const AuthContext = createContext<AuthContextDataProps>(
//   {} as AuthContextDataProps,
// );
// export function AuthContextProvider({ children }: AuthContextProviderProps) {
//   const [user, setUser] = useState<UserDTO>({} as UserDTO);
//   const [isLoadingStorageData, setIsLoadingStorageData] = useState(true);
//   const [userPhoto, setUserPhoto] = useState<string>('');
//   const [permissions, setPermissions] = useState<any>();
//   async function headerUserAndTokenUpdate(userData: UserDTO, token: string) {
//     api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//     setUser(userData);
//   }
//   async function storageUserAndTokenSave(
//     userData: UserDTO,
//     token: string,
//     refreshToken: string,
//   ) {
//     try {
//       await storageUserSave(userData);
//       await storageAuthTokenSave({ token, refresh_token: refreshToken });
//     } catch (error) {
//       console.error('Error saving user and token:', error);
//     }
//   }
//   async function signIn(email: string, password: string) {
//     try {
//       setIsLoadingStorageData(true);
//       const response = await api.post('/sessions', { email, password });
//       const { token, refreshToken, user: userData } = response.data;
//       if (userData && token && refreshToken) {
//         await storageUserAndTokenSave(userData, token, refreshToken);
//         headerUserAndTokenUpdate(userData, token);
//       }
//     } catch (error) {
//       console.error('Error during sign-in:', error);
//     } finally {
//       setIsLoadingStorageData(false);
//     }
//   }
//   async function signOut() {
//     try {
//       setIsLoadingStorageData(true);
//       setUser({} as UserDTO);
//       await storageUserRemove();
//       await storageAuthTokenRemove();
//     } catch (error) {
//       console.error('Error during sign-out:', error);
//     } finally {
//       setIsLoadingStorageData(false);
//     }
//   }
//   async function loadUserData() {
//     try {
//       setIsLoadingStorageData(true);
//       const userLogged = await storageUserGet();
//       const { token } = await storageAuthTokenGet();
//       if (token && userLogged) {
//         await headerUserAndTokenUpdate(userLogged, token);
//       }
//     } catch (error) {
//       console.error('Error loading user data:', error);
//     } finally {
//       setIsLoadingStorageData(false);
//     }
//   }
//   function getPhotoUser(imageAvatarId: number) {
//     setUserPhoto(getImageUrlServer(imageAvatarId));
//   }
//   async function getPermissions(jobPositionId: number) {
//     try {
//       const { data } = await api.get(`/permissions/${jobPositionId}`);
//       setPermissions(data);
//     } catch (error) {
//       console.error('Erro ao obter permissões:', error);
//       throw error;
//     }
//   }
//   useEffect(() => {
//     if (user.photo_avatar_id) {
//       getPhotoUser(user.photo_avatar_id);
//     }
//   }, [user.photo_avatar_id]);
//   useEffect(() => {
//     loadUserData();
//   }, []);
//   useEffect(() => {
//     const unsubscribe = api.registerInterceptTokenManager(signOut);
//     return () => {
//       unsubscribe();
//     };
//   }, [signOut]);
//   useEffect(() => {
//     if (user.jobPosition_id) {
//       getPermissions(Number(user.jobPosition_id));
//     }
//   }, [user]);
//   return (
//     <AuthContext.Provider
//       value={{
//         isLoadingStorageData,
//         user,
//         signIn,
//         signOut,
//         userPhoto,
//         permissions,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// }
import React, { createContext, useEffect, useState } from 'react';

import { UserDTO } from '@dtos/UserDTO';
import { api } from '@src/lib/axios';
import { useGetPermissions } from '@src/services/permissions/queries';
import { useGetUser } from '@src/services/users/queries';
import {
  storageAuthTokenGet,
  storageAuthTokenRemove,
  storageAuthTokenSave,
} from '@storage/storageAuthToken';
import {
  storageUserGet,
  storageUserRemove,
  storageUserSave,
} from '@storage/storageUser';

import { getImageUrlServer } from '@utils/functions';

export type AuthContextDataProps = {
  user: UserDTO;
  signIn: (cpf: string, password: string) => Promise<void>;
  isLoadingStorageData: boolean;
  signOut: () => Promise<void>;
  userPhoto: string;
  permissions: any;
  // updateUserGeneral: () => void;
};

type AuthContextProviderProps = {
  children: React.ReactNode;
};

export const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps,
);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<UserDTO>({} as UserDTO);
  const [isLoadingStorageData, setIsLoadingStorageData] = useState(true);
  const [userPhoto, setUserPhoto] = useState<string>('');
  const [permissions, setPermissions] = useState<any>();

  // const {
  //   mutateAsync: getDataUser,
  //   data: dataUser,
  //   isSuccess: isSuccessGetUser,
  //   isPending: isPendingGetUser,
  // } = useGetUser();

  // async function updateUserGeneral() {
  //   // loadUserData();
  //   getDataUser({
  //     userId: user?.id,
  //   });
  // }

  // console.log({ user });

  async function headerUserAndTokenUpdate(userData: UserDTO, token: string) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setUser(userData);
  }

  async function storageUserAndTokenSave(
    userData: UserDTO,
    token: string,
    refreshToken: string,
  ) {
    try {
      await storageUserSave(userData);
      await storageAuthTokenSave({ token, refresh_token: refreshToken });
    } catch (error) {
      console.error('Error saving user and token:', error);
    }
  }

  function sanitizeCPF(cpf: string): string {
    // Remove pontos, hífens e outros caracteres que não sejam números
    return cpf.replace(/\D/g, '');
  }

  async function signIn(cpf: string, password: string) {
    try {
      setIsLoadingStorageData(true);

      const sanitizedCPF = sanitizeCPF(cpf);

      const response = await api.post('/sessions', {
        cpf: sanitizedCPF,
        password,
      });

      // const response = await api.post('/sessions', { cpf, password });

      const { token, refreshToken, user: userData } = response.data;

      if (userData && token && refreshToken) {
        await storageUserAndTokenSave(userData, token, refreshToken);
        headerUserAndTokenUpdate(userData, token);
      }
    } catch (error) {
      console.error('Error during sign-in:', error);
    } finally {
      setIsLoadingStorageData(false);
    }
  }

  // async function signIn(cpf: string, password: string) {
  //   try {
  //     setIsLoadingStorageData(true);
  //     const response = await api.post('/sessions', { cpf, password });

  //     const { token, refreshToken, user: userData } = response.data;

  //     // setMustChangePassword(response?.data?.mustChangePassword);

  //     if (userData && token && refreshToken) {
  //       await storageUserAndTokenSave(userData, token, refreshToken);
  //       headerUserAndTokenUpdate(userData, token);
  //     }
  //   } catch {
  //     console.log('error');
  //   } finally {
  //     setIsLoadingStorageData(false);
  //   }
  // }

  async function signOut() {
    try {
      setIsLoadingStorageData(true);

      setUser({} as UserDTO);
      await storageUserRemove();
      await storageAuthTokenRemove();
    } catch (error) {
      console.error('Error during sign-out:', error);
    } finally {
      setIsLoadingStorageData(false);
    }
  }

  async function loadUserData() {
    try {
      setIsLoadingStorageData(true);
      const userLogged = await storageUserGet();
      const { token } = await storageAuthTokenGet();

      if (token && userLogged) {
        await headerUserAndTokenUpdate(userLogged, token);
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    } finally {
      setIsLoadingStorageData(false);
    }
  }

  async function getPhotoUser(imageAvatarId: number) {
    if (imageAvatarId) {
      const imageAvatarUrl = await getImageUrlServer(imageAvatarId);
      setUserPhoto(imageAvatarUrl); // A URL é retornada com o campo 'photoUrl' do banco de dados
      return;
    }
    setUserPhoto(`${api.defaults.baseURL}/photos/serve/${imageAvatarId}`);
  }

  async function getPermissions(jobPositionId: number) {
    try {
      const { data } = await api.get(`/permissions/${jobPositionId}`);
      setPermissions(data);
    } catch (error) {
      console.error('Erro ao obter permissões:', error);
      throw error;
    }
  }

  useEffect(() => {
    if (user.photo_avatar_id) {
      getPhotoUser(user.photo_avatar_id);
    }
  }, [user.photo_avatar_id]);

  useEffect(() => {
    loadUserData();
  }, []);

  // useEffect(() => {
  //   setUser(dataUser);
  // }, []);

  useEffect(() => {
    const unsubscribe = api.registerInterceptTokenManager(signOut);
    return () => {
      unsubscribe();
    };
  }, [signOut]);

  const TOKEN_EXPIRATION_TIME = 12 * 3600 * 1000; // 12 horas em milissegundos

  useEffect(() => {
    let logoutTimer: NodeJS.Timeout;

    async function initializeLogoutTimer() {
      const { token } = await storageAuthTokenGet();
      console.log({ token });
      if (token) {
        // Calcular o tempo restante
        const expirationTime = TOKEN_EXPIRATION_TIME; // 12 horas
        logoutTimer = setTimeout(() => {
          signOut(); // Deslogar após o tempo limite
        }, expirationTime);
      }
    }

    initializeLogoutTimer();

    return () => {
      clearTimeout(logoutTimer); // Limpar timer ao desmontar o componente
    };
  }, [signOut]);

  useEffect(() => {
    if (user.jobPosition_id) {
      getPermissions(Number(user.jobPosition_id));
    }
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        isLoadingStorageData,
        user,
        signIn,
        signOut,
        userPhoto,
        permissions,
        // updateUserGeneral,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
