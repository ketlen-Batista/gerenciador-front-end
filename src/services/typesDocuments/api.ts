import { api } from '@src/lib/axios';

import * as DTO from './dto';

export async function listTypesDocuments() {
  try {
    const { data } = await api.get(`/types-documents`);
    return data;
  } catch (error) {
    console.error('Erro ao obter tipos de documentos:', error);
    throw error;
  }
}

export async function updateDocumentData({
  id,
  recipientId,
  senderId,
  typeDocumentValue,
  dateStartCertificate,
  dateEndCertificate,
  approve,
}: DTO.UpdateDocumentDTO) {
  try {
    const { data } = await api.patch(`/documents/update/${id}`, {
      recipientId,
      senderId,
      typeDocumentValue,
      dateStartCertificate,
      dateEndCertificate,
      approve,
    });

    return data;
  } catch (error) {
    console.error('Error linking document to users:', error);
    throw error;
  }
}
