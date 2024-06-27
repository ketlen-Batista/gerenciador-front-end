// import { formatObjectToSearchParams } from '@/utils/functions';
import { apiGic } from '.';

import * as DTO from './dto';

const API_GIC_ENDPOINT = `http://localhost:3333`;

export async function getUsers() {
  try {
    const { data } = await apiGic.get(`${API_GIC_ENDPOINT}/users`);
    return data;
  } catch (error) {
    console.error('Erro ao obter usuários:', error);
    throw error;
  }
}

export async function getUser(params: DTO.GetUser) {
  // try {
  const { data } = await apiGic.get(`${API_GIC_ENDPOINT}/user`, {
    params: {
      userId: params.userId,
    },
  });
  return data;
  // } catch (error) {
  //   console.error('Erro ao obter usuários:', error);
  //   throw error;
  // }
}
