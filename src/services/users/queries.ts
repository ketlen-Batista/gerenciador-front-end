import useCustomMutation, { type HandleReturn } from '@hooks/useCustomMutation';

import * as API from './api';
import * as DTO from './dto';

export function useGetUsers(handleReturn?: HandleReturn) {
  return useCustomMutation({
    key: 'getUsers',
    request: API.getUsers,
    handleReturn,
  });
}

export function useGetUser(handleReturn?: HandleReturn) {
  return useCustomMutation({
    key: 'getUser',
    request: API.getUser,
    handleReturn,
  });
}

export function useDeleteUser(handleReturn?: HandleReturn) {
  return useCustomMutation({
    key: 'deleteDocument',
    request: (userId: string) => API.deleteUser(userId),
    handleReturn,
  });
}

export function useRegisterUser(handleReturn?: HandleReturn) {
  return useCustomMutation({
    key: 'registerUser',
    request: (params: DTO.UpdateUser) => API.registerUser(params),
    handleReturn,
  });
}

export function useUpdateUser(handleReturn?: HandleReturn) {
  return useCustomMutation({
    key: 'updateUser',
    request: (params: DTO.UpdateUser) => API.updateUser(params),
    handleReturn,
  });
}
