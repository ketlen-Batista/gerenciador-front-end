// import { formatObjectToSearchParams } from '@/utils/functions';
import { api } from '@src/lib/axios';

import * as DTO from './dto';

export async function uploadDocument({
  file,
  documentName,
}: DTO.UploadDocumentDTO) {
  try {
    const formData = new FormData();
    formData.append('document', file);
    formData.append('documentName', documentName);

    const { data } = await api.post(`/documents/upload`, formData, {
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
    const { data } = await api.get(`/documents/get/id/${documentId}`);
    return data;
  } catch (error) {
    console.error(`Erro ao buscar documento com ID ${documentId}:`, error);
    throw error;
  }
}

export async function deleteDocument(documentId: number) {
  try {
    await api.delete(`/documents/delete/id/${documentId}`);
  } catch (error) {
    console.error(`Erro ao deletar documento com ID ${documentId}:`, error);
    throw error;
  }
}

export async function linkDocumentToUsers(
  dataRequest: DTO.LinkDocumentToUsersDTO,
) {
  try {
    const { data } = await api.put(
      `/documents/link-document-to-users`,
      dataRequest,
    );
    return data;
  } catch (error) {
    console.error('Erro ao vincular documento aos usuários:', error);
    throw error;
  }
}

export async function addDocument({
  file,
  recipientId,
  senderId,
  typeDocumentValue,
  dateJustification,
  dateStartCertificate,
  dateEndCertificate,
}: DTO.AddDocumentDTO) {
  console.log('dados', {
    file,
    recipientId,
    senderId,
    typeDocumentValue,
    dateJustification,
    dateStartCertificate,
    dateEndCertificate,
  });

  try {
    const formData = new FormData();
    // if (file) formData.append('file', file);
    

    if (file) {
      // const blob = new Blob([file], { type: 'application/pdf' });

      // Cria um File com o Blob
      // const fileTeste = new File([blob], 'sample.pdf', {
      //   type: 'application/pdf',
      // });
      // Cria um blob a partir da URI do arquivo
      // const fileBlob = await fetch(file.path).then((res) => res.blob());
      // Cria um objeto File com o blob
      // const fileObject = new File([fileBlob], file.name, { type: file.type });
      console.log({ file });
      // Adiciona o arquivo ao FormData
      formData.append('file', file);

      // Adiciona os metadados como um campo separado
      formData.append(
        'fileMeta',
        JSON.stringify({
          id: file.id,
          name: file.name,
          date: file.date,
        }),
      );
    } else {
      console.error('No file provided.');
      return;
    }
    if (recipientId) formData.append('recipientId', recipientId);
    if (senderId) formData.append('senderId', senderId);
    if (typeDocumentValue)
      formData.append('typeDocumentValue', typeDocumentValue.toString());
    if (dateJustification)
      formData.append('dateJustification', dateJustification);
    if (dateStartCertificate)
      formData.append('dateStartCertificate', dateStartCertificate);
    if (dateEndCertificate)
      formData.append('dateEndCertificate', dateEndCertificate);

    await api.post('/documents/add', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return;
  } catch (error) {
    console.error('Error uploading document:', error);
    throw error;
  }
}
