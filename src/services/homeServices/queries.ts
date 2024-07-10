import useCustomMutation, { type HandleReturn } from '@hooks/useCustomMutation';

import * as API from './api';

export function useGetItemsCountHome(handleReturn?: HandleReturn) {
  return useCustomMutation({
    key: 'getItemsCountHome',
    request: API.getItemsCountHome,
    handleReturn,
  });
}
