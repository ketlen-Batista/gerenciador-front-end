import useCustomMutation, { type HandleReturn } from '@hooks/useCustomMutation';

import * as API from './api';

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
