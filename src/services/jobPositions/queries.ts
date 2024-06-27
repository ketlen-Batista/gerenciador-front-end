import useCustomMutation, { type HandleReturn } from '@hooks/useCustomMutation';

import * as API from './api';

export function useGetJobPositions(handleReturn?: HandleReturn) {
  return useCustomMutation({
    key: 'getJobPositions',
    request: API.getJobPositions,
    handleReturn,
  });
}
