export interface CreateSector {
  name: string;
  contracts_value?: number | string;
  description?: string;
  phone?: string;
  linkLocation?: string;
  latitude?: number;
  longitude?: number;
}

export interface UpdateSector {
  name?: string;
  id: number;
  contracts_value?: number | string;
  description?: string;
  phone?: string;
  linkLocation?: string;
  latitude?: number;
  longitude?: number;
}

export interface DeleteSector {
  id: number;
}
