export interface GetUser {
  userId: string;
}

export interface CreateContractRequest {
  name: string;
  status?: string;
  validity?: string;
}

export interface UpdateContractRequest {
  id: number;
  name: string;
  status?: string;
  validity?: string;
}

export interface DeleteContractRequest {
  id: number;
}
