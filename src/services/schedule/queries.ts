import useCustomMutation, { type HandleReturn } from '@hooks/useCustomMutation';

import * as API from './api';
import * as DTO from './dto';

// Hook para buscar horários de um usuário
export function useGetUserSchedules(handleReturn?: HandleReturn) {
  return useCustomMutation({
    key: 'getUserSchedules',
    request: (userId: string) => API.getUserSchedules(userId),
    handleReturn,
  });
}

// Hook para criar ou atualizar os horários de um usuário
export function useCreateOrUpdateSchedule(handleReturn?: HandleReturn) {
  return useCustomMutation({
    key: 'createOrUpdateSchedule',
    request: (data: DTO.ScheduleData) => API.createOrUpdateSchedule(data),
    handleReturn,
  });
}
