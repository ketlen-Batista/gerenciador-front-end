import { api } from '@src/lib/axios';

export async function getItemsCountHome() {
  try {
    const { data } = await api.get(`/home/items/count`);
    return data;
  } catch (error) {
    console.error('Erro ao obter quantidade de itens:', error);
    throw error;
  }
}

export async function getStatusCountHome() {
  try {
    const { data } = await api.get(`/home/status/count`);
    return data;
  } catch (error) {
    console.error('Erro ao obter quantidade de status:', error);
    throw error;
  }
}
