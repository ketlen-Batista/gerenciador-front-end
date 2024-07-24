import { api } from '@src/lib/axios';

import * as DTO from './dto';

export async function getUsers() {
  try {
    const { data } = await api.get(`/users`);
    return data;
  } catch (error) {
    console.error('Erro ao obter usuários:', error);
    throw error;
  }
}

export async function getUser(params: DTO.GetUser) {
  const { data } = await api.get(`/user/${params.userId}`, {});
  return data;
}

export async function deleteUser(userId: string) {
  try {
    await api.delete(`/user/delete/${userId}`);
  } catch (error) {
    console.error(`Erro ao deletar usuário com ID ${userId}:`, error);
    throw error;
  }
}

export async function updateUser(params: DTO.UpdateUser) {
  const { data } = await api.patch(`/user/update`, params);
  return data;
}

export async function registerUser(params: DTO.UpdateUser) {
  const { data } = await api.post(`/user`, params);
  return data;
}
