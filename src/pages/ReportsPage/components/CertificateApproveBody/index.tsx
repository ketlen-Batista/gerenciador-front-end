import React, { useState } from 'react';
import { useEffect } from 'react';

import { Box, CircularProgress } from '@mui/material';
import { useGetUserSchedules } from '@src/services/schedule/queries';
import { colors } from '@src/styles/colors';
import { schedulesTimeList } from '@src/utils/constants';
import { format, parseISO } from 'date-fns';
import { enUS, ptBR } from 'date-fns/locale';

import SwitchWithHoursSelectComponent from '@src/components/HourSchedule/SwitchWithHoursSelect/SwitchWithHoursSelectComponent';

import { useCertificatesContext } from '../../hooks/useCertificatesContext';

interface CertificateApproveBodyProps {
  employeeId: string;
  // dateInitCertificate: string;
  // dateEndCertificate: string;
  statusJustificationName: string;
  idCertificate: number;
}
// type DatesProps = {
//   date: string;
//   dayOfWeekEN: string;
//   dayOfWeekPT: string;
// };
const CertificateApproveBody = ({
  employeeId,
  // dateInitCertificate,
  // dateEndCertificate,
  statusJustificationName,
  idCertificate,
}: CertificateApproveBodyProps) => {
  const {
    formik,
    getDaysBetweenDates,
    getUserSchedules,
    scheduleData,
    dates,
    certificates,
  } = useCertificatesContext();

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
      console.log('Dias entre as datas:', days);
    } catch (error) {
      console.error('Error ao buscar os dias entre as datas:', error);
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

  // useEffect(() => {
  //   if (scheduleData?.[0]?.userId !== employeeId) {
  //     formik.setValues({
  //       userId: scheduleData?.[0]?.userId,
  //       mondayWork: scheduleData?.[0]?.mondayWork,
  //       mondayEntryTime: scheduleData?.[0]?.mondayEntryTime,
  //       mondayPauseTime: scheduleData?.[0]?.mondayPauseTime,
  //       mondayReturnTime: scheduleData?.[0]?.mondayReturnTime,
  //       mondayExitTime: scheduleData?.[0]?.mondayExitTime,
  //       tuesdayWork: scheduleData?.[0]?.tuesdayWork,
  //       tuesdayEntryTime: scheduleData?.[0]?.tuesdayEntryTime,
  //       tuesdayPauseTime: scheduleData?.[0]?.tuesdayPauseTime,
  //       tuesdayReturnTime: scheduleData?.[0]?.tuesdayReturnTime,
  //       tuesdayExitTime: scheduleData?.[0]?.tuesdayExitTime,
  //       wednesdayWork: scheduleData?.[0]?.wednesdayWork,
  //       wednesdayEntryTime: scheduleData?.[0]?.wednesdayEntryTime,
  //       wednesdayPauseTime: scheduleData?.[0]?.wednesdayPauseTime,
  //       wednesdayReturnTime: scheduleData?.[0]?.wednesdayReturnTime,
  //       wednesdayExitTime: scheduleData?.[0]?.wednesdayExitTime,
  //       thursdayWork: scheduleData?.[0]?.thursdayWork,
  //       thursdayEntryTime: scheduleData?.[0]?.thursdayEntryTime,
  //       thursdayPauseTime: scheduleData?.[0]?.thursdayPauseTime,
  //       thursdayReturnTime: scheduleData?.[0]?.thursdayReturnTime,
  //       thursdayExitTime: scheduleData?.[0]?.thursdayExitTime,
  //       fridayWork: scheduleData?.[0]?.fridayWork,
  //       fridayEntryTime: scheduleData?.[0]?.fridayEntryTime,
  //       fridayPauseTime: scheduleData?.[0]?.fridayPauseTime,
  //       fridayReturnTime: scheduleData?.[0]?.fridayReturnTime,
  //       fridayExitTime: scheduleData?.[0]?.fridayExitTime,
  //       saturdayWork: scheduleData?.[0]?.saturdayWork,
  //       saturdayEntryTime: scheduleData?.[0]?.saturdayEntryTime,
  //       saturdayPauseTime: scheduleData?.[0]?.saturdayPauseTime,
  //       saturdayReturnTime: scheduleData?.[0]?.saturdayReturnTime,
  //       saturdayExitTime: scheduleData?.[0]?.saturdayExitTime,
  //       sundayWork: scheduleData?.[0]?.sundayWork,
  //       sundayEntryTime: scheduleData?.[0]?.sundayEntryTime,
  //       sundayPauseTime: scheduleData?.[0]?.sundayPauseTime,
  //       sundayReturnTime: scheduleData?.[0]?.sundayReturnTime,
  //       sundayExitTime: scheduleData?.[0]?.sundayExitTime,
  //     });
  //   }
  // }, [scheduleData?.[0]?.userId]);
  console.log('formik?.values', formik?.values);

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
          // label={`${format(day.date, 'dd/MM/yyyy')} - ${day.dayOfWeekPT}`}
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
