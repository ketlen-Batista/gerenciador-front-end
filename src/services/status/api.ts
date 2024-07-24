// import { formatObjectToSearchParams } from '@/utils/functions';
import { api } from '@src/lib/axios';

import * as DTO from './dto';

export async function getStatus() {
  try {
    const { data } = await api.get(`/status`);
    return data;
  } catch (error) {
    console.error('Erro ao obter status:', error);
    throw error;
  }
}
