import React from 'react';
import { createContext, useEffect, useState } from 'react';

import { UserDTO } from '@dtos/UserDTO';
import { api } from '@src/lib/axios';
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
  signIn: (email: string, password: string) => Promise<void>;
  isLoadingStorageData: boolean;
  signOut: () => Promise<void>;
  userPhoto: string;
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
  console.log('entrou');
  async function headerUserAndTokenUpdate(userData: UserDTO, token: string) {
    api.defaults.headers.common['Authorization'] = 'Bearer ' + token;

    setUser(userData);
  }

  async function storageUserAndTokenSave(userData: UserDTO, token: string) {
    try {
      setIsLoadingStorageData(true);

      await storageUserSave(userData);
      await storageAuthTokenSave(token);
    } catch {
      console.log('error storageUserAndTokenSave');
    } finally {
      setIsLoadingStorageData(false);
    }
  }

  async function signIn(email: string, password: string) {
    try {
      setIsLoadingStorageData(true);
      const response = await api.post('/sessions', { email, password });

      const { token, refreshToken, user: userData } = response.data;

      if (userData && token) {
        await storageUserAndTokenSave(userData, token);
        headerUserAndTokenUpdate(userData, token);
      }
    } catch {
      // throw error;
      console.log('error');
    } finally {
      setIsLoadingStorageData(false);
    }
  }

  async function signOut() {
    try {
      setIsLoadingStorageData(true);

      setUser({} as UserDTO);
      await storageUserRemove();
      await storageAuthTokenRemove();
    } catch {
      // throw error;
      console.log('error');
    } finally {
      setIsLoadingStorageData(false);
    }
  }

  async function loadUserData() {
    try {
      setIsLoadingStorageData(true);
      const userLogged = await storageUserGet();
      const token = await storageAuthTokenGet();

      if (token && userLogged) {
        headerUserAndTokenUpdate(userLogged, token);
      }
    } catch {
      console.log('error loadUserData');
    } finally {
      setIsLoadingStorageData(false);
    }
  }

  function getPhotoUser(imageAvatarId: number) {
    setUserPhoto(getImageUrlServer(imageAvatarId));
  }

  useEffect(() => {
    if (user.photo_avatar_id) {
      getPhotoUser(user.photo_avatar_id);
    }
  }, [user.photo_avatar_id]);

  useEffect(() => {
    loadUserData();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoadingStorageData,
        user,
        signIn,
        signOut,
        userPhoto,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
