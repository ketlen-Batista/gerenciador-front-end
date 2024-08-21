import useCustomMutation, { HandleReturn } from '@hooks/useCustomMutation';
import * as API from '@services/Justifications/servicesJustifications';

import * as DTO from './dto';

export function useCreateJustification(handleReturn?: HandleReturn) {
  return useCustomMutation({
    key: 'createJustification',
    request: (data: DTO.CreateJustificationDTO) =>
      API.createJustification(data),
    handleReturn,
  });
}

export function useUpdateJustification(handleReturn?: HandleReturn) {
  return useCustomMutation({
    key: 'updateJustification',
    request: (data: DTO.UpdateJustificationDTO & { id: string }) =>
      API.updateJustification(data),
    handleReturn,
  });
}

export function useGetJustificationById(handleReturn?: HandleReturn) {
  return useCustomMutation({
    key: 'getJustificationById',
    request: (id?: number) => API.getJustificationById(id),
    handleReturn,
  });
}

export function useGetJustificationsList(handleReturn?: HandleReturn) {
  return useCustomMutation({
    key: 'getJustificationsList',
    request: () => API.getJustificationsList(),
    handleReturn,
  });
}
