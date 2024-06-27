import useCustomMutation, { type HandleReturn } from '@hooks/useCustomMutation';

import * as API from './api';

export function useGetContracts(handleReturn?: HandleReturn) {
  return useCustomMutation({
    key: 'getContracts',
    request: API.getContracts,
    handleReturn,
  });
}
