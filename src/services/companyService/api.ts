import { api } from '@src/lib/axios';

import * as DTO from './dto'

export async function getCompany() {
  const { data } = await api.get(`/company`);
  return data;
};

export async function registerCompany( dataReq: DTO.CompanyPost) {
  const { data } = await api.post(`/company`, dataReq);
  return data;
};

export async function updateCompany(companyId: string, dataReq: DTO.CompanyPost) {
  const { data } = await api.patch(`/company/${companyId}`, dataReq);
  return data;
};
