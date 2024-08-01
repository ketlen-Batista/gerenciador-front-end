import { endOfDay, startOfDay, subDays } from 'date-fns';

export const today = new Date(Date.now());

export function subtractDays({ date, days }: { date?: Date; days: number }) {
  const finalDate = date || today;
  return subDays(finalDate, days);
}

// * Default dates
export const TODAY_START_DAY = startOfDay(today);
export const TODAY_END_DAY = endOfDay(today);

export const ONE_WEEK_AGO = subtractDays({ days: 7 });
export const ONE_MONTH_AGO = startOfDay(subtractDays({ days: 30 }));

export const INIT_DATE_RANGE = {
  startDate: ONE_MONTH_AGO.getTime(),
  endDate: TODAY_END_DAY.getTime(),
};

export const timestampToISO = (timestamp: number): string => {
      const date = new Date(timestamp);
      return date.toISOString();
    };


export const formatDate = (isoDate: string) => {
  const date = new Date(isoDate);

  // Obtendo os componentes da data
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Mês começa do zero, por isso soma 1
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  // Formatando no padrão desejado
  const formattedDate = `${day}/${month}/${year} às ${hours}:${minutes}`;

  return formattedDate;
};
