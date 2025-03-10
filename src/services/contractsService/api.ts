import { api } from '@src/lib/axios';

import * as DTO from './dto';

export async function getContracts() {
  try {
    const { data } = await api.get(`/contracts`);
    return data;
  } catch (error) {
    console.error('Erro ao obter contratos:', error);
    throw error;
  }
}

export async function createContract(params: DTO.CreateContractRequest) {
  try {
    const { data } = await api.post(`/contracts`, {
      name: params.name,
      status: params.status,
      validity: params.validity,
    });
    return data;
  } catch (error) {
    console.error('Erro ao criar contrato:', error);
    throw error;
  }
}

export async function updateContract(params: DTO.UpdateContractRequest) {
  try {
    const { data } = await api.patch(`/contracts/${params.id}`, {
      name: params.name,
      status: params.status,
      validity: params.validity,
    });
    return data;
  } catch (error) {
    console.error('Erro ao atualizar contrato:', error);
    throw error;
  }
}

export async function deleteContract(params: DTO.DeleteContractRequest) {
  try {
    const { data } = await api.delete(`/contracts/${params.id}`);
    return data;
  } catch (error) {
    console.error('Erro ao excluir contrato:', error);
    throw error;
  }
}
