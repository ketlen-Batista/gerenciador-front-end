import useCustomMutation, { type HandleReturn } from '@hooks/useCustomMutation';

import * as API from './api';

export function useGetSectors(handleReturn?: HandleReturn) {
  return useCustomMutation({
    key: 'getSectors',
    request: API.getSectors,
    handleReturn,
  });
}
