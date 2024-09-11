import useCustomMutation, { type HandleReturn } from '@hooks/useCustomMutation';

import * as API from './api';
import * as DTO from './dto';

export function useGetStatus(handleReturn?: HandleReturn) {
  return useCustomMutation({
    key: 'getStatus',
    request: API.getStatus,
    handleReturn,
  });
}

export function useCreateStatus(handleReturn?: HandleReturn) {
  return useCustomMutation({
    key: 'createStatus',
    request: (data: DTO.CreateStatus) => API.createStatus(data),
    handleReturn,
  });
}

export function useUpdateStatus(handleReturn?: HandleReturn) {
  return useCustomMutation({
    key: 'updateStatus',
    request: (data: DTO.UpdateStatus) => API.updateStatus(data),
    handleReturn,
  });
}

export function useDeleteStatus(handleReturn?: HandleReturn) {
  return useCustomMutation({
    key: 'deleteStatus',
    request: (id: number) => API.deleteStatus(id),
    handleReturn,
  });
}
