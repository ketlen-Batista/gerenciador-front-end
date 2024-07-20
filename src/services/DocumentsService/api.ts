// import { formatObjectToSearchParams } from '@/utils/functions';
import { api } from '@src/lib/axios';

import { apiGic } from '.';

import * as DTO from './dto';

export async function uploadDocument({
  file,
  documentName,
}: DTO.UploadDocumentDTO) {
  try {
    const formData = new FormData();
    formData.append('document', file);
    formData.append('documentName', documentName);

    const { data } = await apiGic.post(`/documents/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return data;
  } catch (error) {
    console.error('Erro ao fazer upload do arquivo:', error);
    throw error;
  }
}

export async function listDocuments({
  senderId,
  recipientId,
  startDate,
  endDate,
  typeDocumentValue,
}: DTO.ListDocumentsDTO) {
  try {
    const { data } = await api.patch(`/documents/listDocuments`, {
      senderId,
      recipientId,
      startDate,
      endDate,
      typeDocumentValue,
    });
    return data;
  } catch (error) {
    console.error('Erro ao listar documentos:', error);
    throw error;
  }
}

export async function getDocumentById(documentId: number) {
  try {
    const { data } = await apiGic.get(`/documents/get/id/${documentId}`);
    return data;
  } catch (error) {
    console.error(`Erro ao buscar documento com ID ${documentId}:`, error);
    throw error;
  }
}

export async function deleteDocument(documentId: number) {
  try {
    await apiGic.delete(`/documents/delete/id/${documentId}`);
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
      `/documents/link-document-to-users`,
      dataRequest,
    );
    return data;
  } catch (error) {
    console.error('Erro ao vincular documento aos usuários:', error);
    throw error;
  }
}
