export interface ListDocumentsDTO {
  senderId?: string;
  recipientId?: string;
  startDate?: string;
  endDate?: string;
  typeDocumentValue?: number;
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
  file?: File;
  documentName?: string;
  senderId?: string;
  received?: boolean;
  visa?: boolean;
  recipientId?: string | string[];
}

export interface GetDocumentDTO {
  documentId: number;
}

// export interface UploadDocumentDTO {
//   file: File;
//   documentName: string;
//   // senderId?: string;
//   // recipientId?: string;
//   // received?: boolean;
//   // visa?: boolean;
// }

// export interface LinkDocumentToUsersDTO {
//   documentId: number;
//   senderId?: string;
//   recipientId?: string[];
//   received?: boolean;
//   visa?: boolean;
//   documentName?: string;
// }
