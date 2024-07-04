export interface GetUser {
  userId: string;
}

export interface UpdateUser {
  id?: string;
  name?: string;
  email?: string;
  phone?: string;
  cpf?: string;
  address?: string;
  registration?: string;
  dateOfBirth?: string;
  status?: string;
  jobPosition_id?: number;
  sector_value?: number;
  contracts_value?: number;
  password?: string;
}
