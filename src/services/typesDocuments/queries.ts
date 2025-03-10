import useCustomMutation, { type HandleReturn } from '@hooks/useCustomMutation';

import * as API from './api';
import * as DTO from './dto';

export function useListTypesDocuments(handleReturn?: HandleReturn) {
  return useCustomMutation({
    key: 'listTypesDocuments',
    request: API.listTypesDocuments,
    handleReturn,
  });
}

export function useUpdateDocument(handleReturn?: HandleReturn) {
  return useCustomMutation({
    key: 'updateDocumentData',
    request: (data: DTO.UpdateDocumentDTO) => API.updateDocumentData(data),
    handleReturn,
  });
}
