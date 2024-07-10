import useCustomMutation, { type HandleReturn } from '@hooks/useCustomMutation';

import * as API from './api';

export function useGetContracts(handleReturn?: HandleReturn) {
  return useCustomMutation({
    key: 'getContracts',
    request: API.getContracts,
    handleReturn,
  });
}

export function useCreateContract(handleReturn?: HandleReturn) {
  return useCustomMutation({
    key: 'createContract',
    request: API.createContract,
    handleReturn,
  });
}

export function useUpdateContract(handleReturn?: HandleReturn) {
  return useCustomMutation({
    key: 'updateContract',
    request: API.updateContract,
    handleReturn,
  });
}

export function useDeleteContract(handleReturn?: HandleReturn) {
  return useCustomMutation({
    key: 'deleteContract',
    request: API.deleteContract,
    handleReturn,
  });
}
