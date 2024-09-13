import { api } from '@src/lib/axios';

import * as DTO from './dto';

// Função para listar os horários de um usuário específico
export async function getUserSchedules(userId: string) {
  try {
    const response = await api.get(`/schedule/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao obter horários do usuário:', error);
    throw error;
  }
}

// Função para criar ou atualizar os horários de um usuário
export async function createOrUpdateSchedule(data: DTO.ScheduleData) {
  try {
    const response = await api.post(`/schedule/user`, data);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar/atualizar horários:', error);
    throw error;
  }
}
