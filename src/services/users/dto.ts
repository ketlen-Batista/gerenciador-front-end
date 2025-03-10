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
  cep?: string;
  emergencyContact?: string;
  city?: string;
  state?: string;
  guardian?: string;
  supervisor?: string;
  registration?: string;
  dateOfBirth?: string;
  status_value?: number;
  jobPosition_id?: number;
  sector_value?: number;
  contracts_value?: number;
  photo_avatar_id?: number;
  password?: string;
}
