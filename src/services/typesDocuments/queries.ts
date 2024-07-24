import useCustomMutation, { type HandleReturn } from '@hooks/useCustomMutation';

import * as API from './api';

export function useListTypesDocuments(handleReturn?: HandleReturn) {
  return useCustomMutation({
    key: 'listTypesDocuments',
    request: API.listTypesDocuments,
    handleReturn,
  });
}
