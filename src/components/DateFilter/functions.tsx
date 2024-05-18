import { formatDate } from '@utils/functions';

import { DateRange } from './interfaces';

export const formatInputInfo = ({
  dateRange,
  formatType = 'dd/MM/yy',
}: {
  dateRange: DateRange;
  formatType?: string;
}) => {
  let inputInfo = '';

  if (dateRange.startDate && dateRange.endDate) {
    const getFormattedDate = (dateTime: number) => {
      return formatDate({ dateTime, formatType });
    };
    inputInfo = `${getFormattedDate(dateRange.startDate)} - ${getFormattedDate(
      dateRange.endDate,
    )}`;
  }

  return inputInfo;
};
