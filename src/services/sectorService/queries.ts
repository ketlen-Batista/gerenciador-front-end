import useCustomMutation, { type HandleReturn } from '@hooks/useCustomMutation';

import * as API from './api';

export function useGetSectors(handleReturn?: HandleReturn) {
  return useCustomMutation({
    key: 'getSectors',
    request: API.getSectors,
    handleReturn,
  });
}

export function useCreateSector(handleReturn?: HandleReturn) {
  return useCustomMutation({
    key: 'createSector',
    request: API.createSector,
    handleReturn,
  });
}

export function useUpdateSector(handleReturn?: HandleReturn) {
  return useCustomMutation({
    key: 'updateSector',
    request: API.updateSector,
    handleReturn,
  });
}

export function useDeleteSector(handleReturn?: HandleReturn) {
  return useCustomMutation({
    key: 'deleteSector',
    request: API.deleteSector,
    handleReturn,
  });
}
