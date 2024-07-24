import { api } from '@src/lib/axios';

export async function listTypesDocuments() {
  try {
    const { data } = await api.get(`/types-documents`);
    return data;
  } catch (error) {
    console.error('Erro ao obter tipos de documentos:', error);
    throw error;
  }
}
