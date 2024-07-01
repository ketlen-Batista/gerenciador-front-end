import useCustomMutation, { type HandleReturn } from '@hooks/useCustomMutation';

import * as API from './api';
import * as DTO from './dto';

export function useUploadDocument(handleReturn?: HandleReturn) {
  return useCustomMutation({
    key: 'uploadDocument',
    request: (data: DTO.UploadDocumentDTO) => API.uploadDocument(data),
    handleReturn,
  });
}

export function useListDocuments(handleReturn?: HandleReturn) {
  return useCustomMutation({
    key: 'listDocuments',
    request: API.listDocuments,
    handleReturn,
  });
}

export function useGetDocumentById(handleReturn?: HandleReturn) {
  return useCustomMutation({
    key: 'getDocumentById',
    request: (documentId: number) => API.getDocumentById(documentId),
    handleReturn,
  });
}

export function useDeleteDocument(handleReturn?: HandleReturn) {
  return useCustomMutation({
    key: 'deleteDocument',
    request: (documentId: number) => API.deleteDocument(documentId),
    handleReturn,
  });
}

export function useLinkDocumentToUsers(handleReturn?: HandleReturn) {
  return useCustomMutation({
    key: 'linkDocumentToUsers',
    request: (data: DTO.LinkDocumentToUsersDTO) =>
      API.linkDocumentToUsers(data),
    handleReturn,
  });
}
