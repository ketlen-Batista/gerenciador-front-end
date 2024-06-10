import React, { useRef } from 'react';

import DefaultPage from '@src/templates/DefaultPage';
import { INIT_DATE_RANGE } from '@src/utils/dates';

import DateFilter, { type DateFilterHandles } from '@src/components/DateFilter';
import { DateRange } from '@src/components/DateFilter/interfaces';

const ReportsPage = () => {
  const ref = useRef<DateFilterHandles>(null);

  const handleCloseFilter = () => ref?.current?.closeFilter();

  const handleOnFilter = (value: DateRange) => {
    const formattedDateRange = {
      startDate: value?.startDate ?? INIT_DATE_RANGE.startDate,
      endDate: value?.endDate ?? INIT_DATE_RANGE.endDate,
    };

    // setPayloadFilter((oldValues) => ({
    //   ...oldValues,
    //   startDate: formattedDateRange.startDate,
    //   endDate: formattedDateRange.endDate,
    // }));

    handleCloseFilter();
  };

  return (
    <DefaultPage pageTitle="Relatórios">
      <div>
        <DateFilter
          // ref={ref}
          onFilter={handleOnFilter}
          initialRange={INIT_DATE_RANGE}
        />
        <div>Aqui é a o Relatório fii ou fia</div>
      </div>
    </DefaultPage>
  );
};

export default ReportsPage;
