import { api } from '@src/lib/axios';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export const formatDate = ({
  dateTime,
  formatType = '',
  capitalize = false,
}: {
  dateTime: number;
  formatType?: string;
  capitalize?: boolean;
}) => {
  const value = format(new Date(dateTime), formatType, { locale: ptBR });

  if (!capitalize) return value;

  return value.charAt(0).toUpperCase() + value.slice(1);
};

export function getImageUrlServer(idPhoto: number) {
  return `${api.defaults.baseURL}/photos/serve/${idPhoto}`;
}

export function getPdfUrlServer(idPdf: number) {
  return `${api.defaults.baseURL}/documents/serve/${idPdf}`;
}