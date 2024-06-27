// import { formatObjectToSearchParams } from '@/utils/functions';
import { apiGic } from '.';

import * as DTO from './dto';

const API_GIC_ENDPOINT = `http://localhost:3333`;

export async function getJobPositions() {
  try {
    const { data } = await apiGic.get(`${API_GIC_ENDPOINT}/job-positions`);
    return data;
  } catch (error) {
    console.error('Erro ao obter cargos:', error);
    throw error;
  }
}
