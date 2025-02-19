import { api } from '@src/lib/axios';

import * as DTO from './dto';

export async function createUserCheckpoint(data: DTO.CreateUserCheckpointDTO) {
  try {
    const { data: responseData } = await api.post(
      `/user-checkpoints/create`,
      data,
    );
    return responseData;
  } catch (error) {
    console.error('Erro ao criar ponto batido:', error);
    throw error;
  }
}

export async function updateUserCheckpoint(
  userCheckpointId: number,
  data: DTO.UpdateUserCheckpointDTO,
) {
  try {
    await api.put(`/user-checkpoints/update/${userCheckpointId}`, data);
  } catch (error) {
    console.error(
      `Erro ao atualizar ponto batido com ID ${userCheckpointId}:`,
      error,
    );
    throw error;
  }
}

export async function deleteUserCheckpoint(userCheckpointId: number) {
  try {
    await api.delete(`/user-checkpoints/delete/${userCheckpointId}`);
  } catch (error) {
    console.error(
      `Erro ao deletar ponto batido com ID ${userCheckpointId}:`,
      error,
    );
    throw error;
  }
}

export async function listUserCheckpoints(
  filters: DTO.UserCheckpointFiltersDTO,
) {
  try {
    const { data } = await api.patch(`/list-checkpoints`, {
      startDate: filters.startDate,
      endDate: filters.endDate,
      userId: filters.userId,
      sectorId: filters.sectorId,
      contractId: filters.contractId,
      jobId: filters.jobId,
    });
    return data;
  } catch (error) {
    console.error('Erro ao listar pontos batidos:', error);
    throw error;
  }
}

export async function getUserCheckpointById(userCheckpointId: number) {
  try {
    const { data } = await api.get(`/user-checkpoints/${userCheckpointId}`);
    return data;
  } catch (error) {
    console.error(
      `Erro ao buscar ponto batido com ID ${userCheckpointId}:`,
      error,
    );
    throw error;
  }
}

export async function getBankHours(filters: DTO.UserCheckpointFiltersDTO) {
  try {
    const { data } = await api.patch(`/get-back-hours`, {
      startDate: filters.startDate,
      endDate: filters.endDate,
      userId: filters.userId,
      sectorId: filters.sectorId,
      contractId: filters.contractId,
      jobId: filters.jobId,
    });
    return data;
  } catch (error) {
    console.error('Erro ao listar pontos batidos:', error);
    throw error;
  }
}
