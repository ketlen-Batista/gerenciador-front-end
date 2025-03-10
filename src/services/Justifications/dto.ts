export interface CreateJustificationDTO {
  userId: string;
  pointType?: string;
  justificationMessage?: string;
  dateJustification?: string;
}

export interface UpdateJustificationDTO {
  userId?: string;
  pointType?: string;
  justificationMessage?: string;
  dateJustification?: string;
  approve?: boolean;
}

export interface listDTO {
  userId?: string;
  sectorValue?: number;
  contractValue?: number;
  jobId?: number;
  startDate?: string;
  endDate?: string;
}
