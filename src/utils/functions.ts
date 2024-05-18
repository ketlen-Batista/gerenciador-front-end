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
