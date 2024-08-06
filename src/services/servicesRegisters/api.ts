import { api } from '@src/lib/axios';
import * as DTO from './dto'

export async function getServiceRegister({
  id,
  endDate,
  startDate,
  userId,
  sectorValue
}: DTO.GetServicesRegisterProps) {
  try {
    const { data } = await api.patch(`/services-registers/search`, {
      id,
      endDate,
      startDate,
      userId,
      sectorValue
    });
    return data;
  } catch (error) {
    console.error('Erro ao obter registros de serviços:', error);
    throw error;
  }
}
