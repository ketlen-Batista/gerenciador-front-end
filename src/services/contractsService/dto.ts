export interface GetUser {
  userId: string;
}

export interface CreateContractRequest {
  name: string;
}

export interface UpdateContractRequest {
  id: number;
  name: string;
}

export interface DeleteContractRequest {
  id: number;
}
