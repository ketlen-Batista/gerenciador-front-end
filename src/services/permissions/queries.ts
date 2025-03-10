import useCustomMutation, { type HandleReturn } from '@hooks/useCustomMutation';

import * as API from './api';
import { PermissionsUpdate } from './dto';

export function useGetPermissions(handleReturn?: HandleReturn) {
  return useCustomMutation({
    key: 'getPermissions',
    request: API.getPermissions,
    handleReturn,
  });
}

export function useUpdatePermissions(handleReturn?: HandleReturn) {
  return useCustomMutation({
    key: 'updatePermissions',
    request: (data: PermissionsUpdate) => API.updatePermissions(data),
    handleReturn,
  });
}
