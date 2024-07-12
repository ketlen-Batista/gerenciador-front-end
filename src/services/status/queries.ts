import useCustomMutation, { type HandleReturn } from '@hooks/useCustomMutation';

import * as API from './api';

export function useGetStatus(handleReturn?: HandleReturn) {
  return useCustomMutation({
    key: 'getStatus',
    request: API.getStatus,
    handleReturn,
  });
}
