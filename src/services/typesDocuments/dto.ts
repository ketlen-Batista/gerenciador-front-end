import { ReactNode } from 'react';

export interface ListDocumentsDTO {
  senderId?: string;
  recipientId?: string;
  startDate?: string;
  endDate?: string;
  typeDocumentValue?: Array<number>;
}

export interface LinkDocumentToUsersDTO {
  documentId: number;
  senderId?: string;
  recipientId: string[];
  received?: boolean;
  visa?: boolean;
  documentName?: string;
  typeDocumentValue?: number;
}

export interface UploadDocumentDTO {
  documentName?: string;
  senderId?: string;
  received?: boolean;
  visa?: boolean;
  recipientId?: string | string[];
}

export interface GetDocumentDTO {
  documentId: number;
}

export interface AddDocumentDTO {
  file?: File | any;
  documentName?: string;
  senderId?: string;
  received?: boolean;
  visa?: boolean;
  recipientId?: string;
  typeDocumentValue?: number;
  dateJustification?: string;
  dateStartCertificate?: string;
  dateEndCertificate?: string;
}

export interface UpdateDocumentDTO {
  id: number;
  documentName?: string;
  senderId?: string;
  // received?: boolean;
  // visa?: boolean;
  recipientId?: string[];
  typeDocumentValue?: number;
  dateJustification?: string;
  dateStartCertificate?: string;
  dateEndCertificate?: string;
  approve?: boolean;
}
