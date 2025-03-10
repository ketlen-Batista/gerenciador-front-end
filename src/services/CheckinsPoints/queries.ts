// hooks/useUserCheckpoints.ts
import useCustomMutation, { type HandleReturn } from '@hooks/useCustomMutation';

import * as API from './api';
import * as DTO from './dto';

export function useCreateUserCheckpoint(handleReturn?: HandleReturn) {
  return useCustomMutation({
    key: 'createUserCheckpoint',
    request: (data: DTO.CreateUserCheckpointDTO) =>
      API.createUserCheckpoint(data),
    handleReturn,
  });
}

// Ajuste para passar dois parâmetros para a função request
export function useUpdateUserCheckpoint(handleReturn?: HandleReturn) {
  return useCustomMutation({
    key: 'updateUserCheckpoint',
    request: (params: {
      userCheckpointId: number;
      data: DTO.UpdateUserCheckpointDTO;
    }) => API.updateUserCheckpoint(params.userCheckpointId, params.data),
    handleReturn,
  });
}

export function useDeleteUserCheckpoint(handleReturn?: HandleReturn) {
  return useCustomMutation({
    key: 'deleteUserCheckpoint',
    request: (userCheckpointId: number) =>
      API.deleteUserCheckpoint(userCheckpointId),
    handleReturn,
  });
}

export function useListUserCheckpoints(handleReturn?: HandleReturn) {
  return useCustomMutation({
    key: 'listUserCheckpoints',
    request: (filters: DTO.UserCheckpointFiltersDTO) =>
      API.listUserCheckpoints(filters),
    handleReturn,
  });
}

export function useGetUserCheckpointById(handleReturn?: HandleReturn) {
  return useCustomMutation({
    key: 'getUserCheckpointById',
    request: (userCheckpointId: number) =>
      API.getUserCheckpointById(userCheckpointId),
    handleReturn,
  });
}

export function useGetBankHours(handleReturn?: HandleReturn) {
  return useCustomMutation({
    key: 'getBankHours',
    request: (filters: DTO.UserCheckpointFiltersDTO) =>
      API.getBankHours(filters),
    handleReturn,
  });
}
