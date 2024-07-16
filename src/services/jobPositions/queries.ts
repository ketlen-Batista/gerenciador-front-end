import useCustomMutation, { type HandleReturn } from '@hooks/useCustomMutation';

import * as API from './api';
import * as DTO from './dto';

export function useGetJobPositions(handleReturn?: HandleReturn) {
  return useCustomMutation({
    key: 'getJobPositions',
    request: API.getJobPositions,
    handleReturn,
  });
}

export function useCreateJobPosition(handleReturn?: HandleReturn) {
  return useCustomMutation({
    key: 'createJobPosition',
    request: (params: DTO.CreateJobPositionParams) =>
      API.createJobPosition(params.name),
    handleReturn,
  });
}

export function useUpdateJobPosition(handleReturn?: HandleReturn) {
  return useCustomMutation({
    key: 'updateJobPosition',
    request: (params: DTO.UpdateJobPositionParams) =>
      API.updateJobPosition(params.id, params.name),
    handleReturn,
  });
}

export function useDeleteJobPosition(handleReturn?: HandleReturn) {
  return useCustomMutation({
    key: 'deleteJobPosition',
    request: (params: DTO.DeleteJobPositionParams) =>
      API.deleteJobPosition(params.id),
    handleReturn,
  });
}
