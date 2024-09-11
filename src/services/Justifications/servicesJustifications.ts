import { api } from '@src/lib/axios';

import * as DTO from './dto';

export async function createJustification({
  userId,
  pointType,
  justificationMessage,
  dateJustification,
}: DTO.CreateJustificationDTO) {
  try {
    const { data } = await api.post('/justification/create', {
      userId,
      pointType,
      justificationMessage,
      dateJustification,
    });

    return data;
  } catch (error) {
    console.error('Error creating justification:', error);
    throw error;
  }
}

export async function getJustificationById(id?: number) {
  try {
    const { data } = await api.get(`/justification/${id}`);
    return data;
  } catch (error) {
    console.error('Error fetching justification:', error);
    throw error;
  }
}

export async function getJustificationsList(params: DTO.listDTO) {
  try {
    const { data } = await api.patch(`/justification/list`, params);
    return data;
  } catch (error) {
    console.error('Error fetching justification:', error);
    throw error;
  }
}

export async function updateJustification({
  id,
  userId,
  pointType,
  justificationMessage,
  dateJustification,
  approve,
}: DTO.UpdateJustificationDTO & { id: string }) {
  try {
    const { data } = await api.patch(`/documents/add/${id}`, {
      userId,
      pointType,
      justificationMessage,
      dateJustification,
      approve,
    });

    return data;
  } catch (error) {
    console.error('Error updating justification:', error);
    throw error;
  }
}
