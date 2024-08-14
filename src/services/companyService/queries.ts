import useCustomMutation, { type HandleReturn } from '@hooks/useCustomMutation';

import * as DTO from './dto'

import * as API from './api';

export function useGetCompany(handleReturn?: HandleReturn) {
  return useCustomMutation({
    key: 'getCompany',
    request: API.getCompany,
    handleReturn,
  });
}

export function useRegisterCompany(handleReturn?: HandleReturn) {
  return useCustomMutation({
    key: 'registerCompany',
    request: (params: DTO.CompanyResponse) =>
      API.registerCompany(params),
    handleReturn,
  });
}

export function useUpdateCompany(handleReturn?: HandleReturn) {
  return useCustomMutation({
    key: 'updateCompany',
    request: (params: DTO.CompanyResponse) =>
      API.updateCompany(params.id, params),
    handleReturn,
  });
}