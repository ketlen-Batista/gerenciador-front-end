import { api } from '@src/lib/axios';

export async function getJobPositions() {
  try {
    const { data } = await api.get(`/job-positions`);
    return data;
  } catch (error) {
    console.error('Erro ao obter cargos:', error);
    throw error;
  }
}

export async function createJobPosition(name: string) {
  try {
    const { data } = await api.post(`/job-positions`, { name });
    return data;
  } catch (error) {
    console.error('Erro ao criar cargo:', error);
    throw error;
  }
}

export async function updateJobPosition(id: number, name: string) {
  try {
    const { data } = await api.patch(`/job-positions/${id}`, { name });
    return data;
  } catch (error) {
    console.error('Erro ao atualizar cargo:', error);
    throw error;
  }
}

export async function deleteJobPosition(id: number) {
  try {
    await api.delete(`/job-positions/${id}`);
  } catch (error) {
    console.error('Erro ao deletar cargo:', error);
    throw error;
  }
}
