export interface CreateUserCheckpointDTO {
  photoId?: number;
  timestamp?: string;
  latitude?: number;
  longitude?: number;
  checkpointType: string;
  status_value?: number;
  justification?: string;
  medicalCertificate?: File;
  userId: string;
}

export interface UpdateUserCheckpointDTO {
  timestamp?: Date;
  latitude?: number;
  longitude?: number;
  checkpointType?: string;
  status?: string;
  justification?: string;
  medicalCertificate?: File;
}

export interface UserCheckpointFiltersDTO {
  userId?: string;
  sectorId?: number;
  startDate?: string;
  endDate?: string;
  contractId?: number;
  jobId?: number;
}
