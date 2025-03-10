import { api } from '@src/lib/axios';

import { PermissionsUpdate } from './dto';

export async function getPermissions(jobPositionId: number) {
  try {
    const { data } = await api.get(`/permissions/${jobPositionId}`);
    return data;
  } catch (error) {
    console.error('Erro ao obter permissões:', error);
    throw error;
  }
}

export async function updatePermissions(dataPermission: PermissionsUpdate) {
  try {
    const { data } = await api.patch(
      `/permissions/${dataPermission.jobId}`,
      dataPermission,
    );
    return data;
  } catch (error) {
    console.error('Erro ao atualizar permissões:', error);
    throw error;
  }
}
