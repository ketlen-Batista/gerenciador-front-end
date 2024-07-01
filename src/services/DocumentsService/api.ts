// import { formatObjectToSearchParams } from '@/utils/functions';
import { apiGic } from '.';

import * as DTO from './dto';

const API_GIC_ENDPOINT = `http://localhost:3333`;

export async function uploadDocument({
  file,
  documentName,
}: DTO.UploadDocumentDTO) {
  try {
    const formData = new FormData();
    formData.append('document', file);
    formData.append('documentName', documentName);

    const { data } = await apiGic.post(
      `${API_GIC_ENDPOINT}/documents/upload`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );

    return data;
  } catch (error) {
    console.error('Erro ao fazer upload do arquivo:', error);
    throw error;
  }
}

export async function listDocuments() {
  try {
    const { data } = await apiGic.get(
      `${API_GIC_ENDPOINT}/documents/listDocuments`,
    );
    return data;
  } catch (error) {
    console.error('Erro ao listar documentos:', error);
    throw error;
  }
}

export async function getDocumentById(documentId: number) {
  try {
    const { data } = await apiGic.get(
      `${API_GIC_ENDPOINT}/documents/get/id/${documentId}`,
    );
    return data;
  } catch (error) {
    console.error(`Erro ao buscar documento com ID ${documentId}:`, error);
    throw error;
  }
}

export async function deleteDocument(documentId: number) {
  try {
    await apiGic.delete(
      `${API_GIC_ENDPOINT}/documents/delete/id/${documentId}`,
    );
  } catch (error) {
    console.error(`Erro ao deletar documento com ID ${documentId}:`, error);
    throw error;
  }
}

export async function linkDocumentToUsers(
  dataRequest: DTO.LinkDocumentToUsersDTO,
) {
  try {
    const { data } = await apiGic.put(
      `${API_GIC_ENDPOINT}/documents/link-document-to-users`,
      dataRequest,
    );
    return data;
  } catch (error) {
    console.error('Erro ao vincular documento aos usuários:', error);
    throw error;
  }
}
