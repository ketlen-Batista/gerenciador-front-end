import {
  startOfDay,
  endOfDay,
  subDays,
  startOfMonth,
  endOfMonth,
  subMonths,
} from 'date-fns';

interface DateRange {
  startDate: number | null;
  endDate: number | null;
}

export interface RadioGroup {
  title: string;
  options: {
    label: string;
    value: DateRange;
  }[];
}

const today = new Date(Date.now()).getTime();

export const initDateRange: DateRange = {
  startDate: startOfDay(today).getTime(),
  endDate: endOfDay(today).getTime(),
};

export const radioGroups: RadioGroup[] = [
  {
    title: 'Selecionar período',
    options: [
      {
        label: 'Mês atual',
        value: {
          startDate: startOfMonth(today).getTime(),
          endDate: endOfMonth(today).getTime(),
        },
      },
      {
        label: 'Mês anterior',
        value: {
          startDate: subMonths(startOfMonth(today), 1).getTime(),
          endDate: subMonths(endOfMonth(today), 1).getTime(),
        },
      },
    ],
  },
  {
    title: 'Filtrar por',
    options: [
      {
        label: 'Hoje',
        value: {
          startDate: startOfDay(today).getTime(),
          endDate: endOfDay(today).getTime(),
        },
      },
      {
        label: 'Ontem',
        value: {
          startDate: subDays(startOfDay(today), 1).getTime(),
          endDate: subDays(endOfDay(today), 1).getTime(),
        },
      },
      {
        label: 'Ontem + Hoje',
        value: {
          startDate: subDays(startOfDay(today), 1).getTime(),
          endDate: endOfDay(today).getTime(),
        },
      },
      {
        label: '7 dias',
        value: {
          startDate: subDays(startOfDay(today), 7).getTime(),
          endDate: endOfDay(today).getTime(),
        },
      },
      {
        label: '15 dias',
        value: {
          startDate: subDays(startOfDay(today), 15).getTime(),
          endDate: endOfDay(today).getTime(),
        },
      },
      {
        label: '30 dias',
        value: {
          startDate: subDays(startOfDay(today), 30).getTime(),
          endDate: endOfDay(today).getTime(),
        },
      },
      {
        label: '90 dias',
        value: {
          startDate: subDays(startOfDay(today), 90).getTime(),
          endDate: endOfDay(today).getTime(),
        },
      },
    ],
  },
];
