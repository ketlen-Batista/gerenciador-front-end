// import { formatObjectToSearchParams } from '@/utils/functions';
import { api } from '@src/lib/axios';

import * as DTO from './dto';

export async function createStatus(data: DTO.CreateStatus) {
  try {
    const response = await api.post(`/status`, data);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar status:', error);
    throw error;
  }
}

export async function updateStatus(data: DTO.UpdateStatus) {
  try {
    const response = await api.put(`/status`, data);
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar status:', error);
    throw error;
  }
}

export async function deleteStatus(id: number) {
  try {
    await api.delete(`/status/delete`, { data: { id } });
  } catch (error) {
    console.error('Erro ao deletar status:', error);
    throw error;
  }
}
export async function getStatus() {
  try {
    const { data } = await api.get(`/status`);
    return data;
  } catch (error) {
    console.error('Erro ao obter status:', error);
    throw error;
  }
}
