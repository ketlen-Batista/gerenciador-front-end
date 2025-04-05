import React, { useState } from 'react';
import { useEffect } from 'react';

import { Box, CircularProgress } from '@mui/material';
import { colors } from '@src/styles/colors';
import { schedulesTimeList } from '@src/utils/constants';
import { format, parseISO } from 'date-fns';

import SwitchWithHoursSelectComponent from '@src/components/HourSchedule/SwitchWithHoursSelect/SwitchWithHoursSelectComponent';

import { useCertificatesContext } from '../../hooks/useCertificatesContext';

interface CertificateApproveBodyProps {
  employeeId: string;
  statusJustificationName: string;
  idCertificate: number;
}
const CertificateApproveBody = ({
  employeeId,
  statusJustificationName,
  idCertificate,
}: CertificateApproveBodyProps) => {
  const { formik, getDaysBetweenDates, getUserSchedules, dates, certificates } =
    useCertificatesContext();

  const dateInitCertificate = certificates?.find(
    (certificate) => certificate?.id === idCertificate,
  )?.dateStartCertificate;
  const dateEndCertificate = certificates?.find(
    (certificate) => certificate?.id === idCertificate,
  )?.dateEndCertificate;

  const [isLoading, setIsLoading] = useState(false);

  const handleGetDaysBetweenDates = () => {
    try {
      setIsLoading(true);
      const days = getDaysBetweenDates(dateInitCertificate, dateEndCertificate);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (dateEndCertificate && dateInitCertificate) {
      handleGetDaysBetweenDates();
    }
  }, [dateInitCertificate, dateEndCertificate]);

  useEffect(() => {
    if (employeeId !== formik.values.userId) {
      getUserSchedules(employeeId);
    }
  }, []);

  if (!formik.values || !dates.length || isLoading) {
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        color={colors.basic.black}
        my={4}
      >
        <CircularProgress color="primary" size={60} />
      </Box>
    );
  }
  return (
    <Box>
      {dates?.map((day) => (
        <SwitchWithHoursSelectComponent
          key={day.date}
          label={`${format(parseISO(day.date), 'dd/MM/yyyy')} - ${day.dayOfWeekPT}`}
          dayOfWeek={day.dayOfWeekEN?.toLocaleLowerCase()}
          active={
            formik?.values?.[`${day.dayOfWeekEN?.toLocaleLowerCase()}Work`]
          }
          EntryTime={
            formik?.values?.[`${day.dayOfWeekEN?.toLocaleLowerCase()}EntryTime`]
          }
          PauseTime={
            formik?.values?.[`${day.dayOfWeekEN?.toLocaleLowerCase()}PauseTime`]
          }
          ReturnTime={
            formik?.values?.[
              `${day.dayOfWeekEN?.toLocaleLowerCase()}ReturnTime`
            ]
          }
          ExitTime={
            formik?.values?.[`${day.dayOfWeekEN?.toLocaleLowerCase()}ExitTime`]
          }
          options={schedulesTimeList}
          onChange={(dayOfWeek, key, value) =>
            formik?.setFieldValue(`${dayOfWeek}${key}`, value)
          }
          onClick={() =>
            formik?.setFieldValue(
              `${day.dayOfWeekEN?.toLocaleLowerCase()}Work`,
              !formik?.values?.[`${day.dayOfWeekEN?.toLocaleLowerCase()}Work`],
            )
          }
          statusJustificationName={statusJustificationName}
        />
      ))}
    </Box>
  );
};
export default React.memo(CertificateApproveBody);
