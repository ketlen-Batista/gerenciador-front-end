// api/userCheckpoints.ts
import axios from 'axios';

import { apiGic } from '.';

import * as DTO from './dto';

const API_GIC_ENDPOINT = `http://localhost:3333`;

export async function createUserCheckpoint(data: DTO.CreateUserCheckpointDTO) {
  try {
    const { data: responseData } = await apiGic.post(
      `${API_GIC_ENDPOINT}/user-checkpoints/create`,
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
    await apiGic.put(
      `${API_GIC_ENDPOINT}/user-checkpoints/update/${userCheckpointId}`,
      data,
    );
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
    await apiGic.delete(
      `${API_GIC_ENDPOINT}/user-checkpoints/delete/${userCheckpointId}`,
    );
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
    const { data } = await apiGic.get(`${API_GIC_ENDPOINT}/list-checkpoints`, {
      params: filters,
    });
    return data;
  } catch (error) {
    console.error('Erro ao listar pontos batidos:', error);
    throw error;
  }
}

export async function getUserCheckpointById(userCheckpointId: number) {
  try {
    const { data } = await apiGic.get(
      `${API_GIC_ENDPOINT}/user-checkpoints/${userCheckpointId}`,
    );
    return data;
  } catch (error) {
    console.error(
      `Erro ao buscar ponto batido com ID ${userCheckpointId}:`,
      error,
    );
    throw error;
  }
}
