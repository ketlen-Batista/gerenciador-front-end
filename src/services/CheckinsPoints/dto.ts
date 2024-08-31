export interface CreateUserCheckpointDTO {
  photoFile: File;
  timestamp: Date;
  latitude: number;
  longitude: number;
  checkpointType: string;
  status: string;
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
