export interface UploadDocumentDTO {
  file: File;
  documentName: string;
  // senderId?: string;
  // recipientId?: string;
  // received?: boolean;
  // visa?: boolean;
}

export interface LinkDocumentToUsersDTO {
  documentId: number;
  senderId?: string;
  recipientId?: string[];
  received?: boolean;
  visa?: boolean;
  documentName?: string;
}
