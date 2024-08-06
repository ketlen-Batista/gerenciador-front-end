import useCustomMutation, { type HandleReturn } from '@hooks/useCustomMutation';

import * as API from './api';

export function useGetServiceRegister(handleReturn?: HandleReturn) {
  return useCustomMutation({
    key: 'getServiceRegister',
    request: API.getServiceRegister,
    handleReturn,
  });
}
