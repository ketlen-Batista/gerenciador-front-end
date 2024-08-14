// import { formatObjectToSearchParams } from '@/utils/functions';
import { api } from '@src/lib/axios';

import * as DTO from './dto';

export async function getSectors() {
  try {
    const { data } = await api.get(`/sectors/search`);
    return data;
  } catch (error) {
    console.error('Erro ao obter setores:', error);
    throw error;
  }
}

export async function createSector(params: DTO.CreateSector) {
  try {
    const { data } = await api.post(`/sector`, {
      name: params.name,
      contracts_value: params.contracts_value,
      description: params.description,
      phone: params.phone,
      email: params.email,
      signatureDate: params.signatureDate,
      linkLocation: params.linkLocation,
      latitude: params.latitude,
      longitude: params.longitude,
    });
    return data;
  } catch (error) {
    console.error('Erro ao obter setores:', error);
    throw error;
  }
}
export async function updateSector(params: DTO.UpdateSector) {
  try {
    const { data } = await api.patch(`/sector/${params.id}`, {
      name: params.name,
      contracts_value: params.contracts_value,
      description: params.description,
      phone: params.phone,
      email: params.email,
      signatureDate: params.signatureDate,
      linkLocation: params.linkLocation,
      latitude: params.latitude,
      longitude: params.longitude,
    });
    return data;
  } catch (error) {
    console.error('Erro ao obter setores:', error);
    throw error;
  }
}

export async function deleteSector(params: DTO.DeleteSector) {
  try {
    const { data } = await api.delete(`/sector/${params.id}`);
    return data;
  } catch (error) {
    console.error('Erro ao obter setores:', error);
    throw error;
  }
}
