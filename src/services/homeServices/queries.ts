import useCustomMutation, { type HandleReturn } from '@hooks/useCustomMutation';

import * as API from './api';

export function useGetItemsCountHome(handleReturn?: HandleReturn) {
  return useCustomMutation({
    key: 'getItemsCountHome',
    request: API.getItemsCountHome,
    handleReturn,
  });
}

export function useGetStatusCountHome(handleReturn?: HandleReturn) {
  return useCustomMutation({
    key: 'getStatusCountHome',
    request: API.getStatusCountHome,
    handleReturn,
  });
}
