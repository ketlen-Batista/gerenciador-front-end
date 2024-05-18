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
