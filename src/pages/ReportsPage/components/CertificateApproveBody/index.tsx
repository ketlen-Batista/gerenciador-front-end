import React, { useState } from 'react';
import { useEffect } from 'react';

import { Box } from '@mui/material';
import {
  useCreateOrUpdateSchedule,
  useGetUserSchedules,
} from '@src/services/schedule/queries';
import { schedulesTimeList } from '@src/utils/constants';
import { format, formatDate } from 'date-fns';
import { enUS, ptBR } from 'date-fns/locale';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import SwitchWithHoursSelectComponent from '@src/components/HourSchedule/SwitchWithHoursSelect/SwitchWithHoursSelectComponent';
import Select from '@src/components/Select';

// import { Container } from './styles';

const validationSchema = Yup.object({
  userId: Yup.string().required('User ID é obrigatório'),
  mondayWork: Yup.boolean(),
  mondayEntryTime: Yup.string().nullable(),
  mondayPauseTime: Yup.string().nullable(),
  mondayReturnTime: Yup.string().nullable(),
  mondayExitTime: Yup.string().nullable(),
  tuesdayWork: Yup.boolean(),
  tuesdayEntryTime: Yup.string().nullable(),
  tuesdayPauseTime: Yup.string().nullable(),
  tuesdayReturnTime: Yup.string().nullable(),
  tuesdayExitTime: Yup.string().nullable(),
  wednesdayWork: Yup.boolean(),
  wednesdayEntryTime: Yup.string().nullable(),
  wednesdayPauseTime: Yup.string().nullable(),
  wednesdayReturnTime: Yup.string().nullable(),
  wednesdayExitTime: Yup.string().nullable(),
  thursdayWork: Yup.boolean(),
  thursdayEntryTime: Yup.string().nullable(),
  thursdayPauseTime: Yup.string().nullable(),
  thursdayReturnTime: Yup.string().nullable(),
  thursdayExitTime: Yup.string().nullable(),
  fridayWork: Yup.boolean(),
  fridayEntryTime: Yup.string().nullable(),
  fridayPauseTime: Yup.string().nullable(),
  fridayReturnTime: Yup.string().nullable(),
  fridayExitTime: Yup.string().nullable(),
  saturdayWork: Yup.boolean(),
  saturdayEntryTime: Yup.string().nullable(),
  saturdayPauseTime: Yup.string().nullable(),
  saturdayReturnTime: Yup.string().nullable(),
  saturdayExitTime: Yup.string().nullable(),
  sundayWork: Yup.boolean(),
  sundayEntryTime: Yup.string().nullable(),
  sundayPauseTime: Yup.string().nullable(),
  sundayReturnTime: Yup.string().nullable(),
  sundayExitTime: Yup.string().nullable(),
});

interface CertificateApproveBodyProps {
  employeeId: string;
  dateInitCertificate: string;
  dateEndCertificate: string;
}

type DatesProps = {
  date: string;
  dayOfWeekEN: string;
  dayOfWeekPT: string;
};

// const CertificateApproveBody: CertificateApproveBodyProps = ({ employeeId }) =>

const CertificateApproveBody = ({
  employeeId,
  dateInitCertificate,
  dateEndCertificate,
}: CertificateApproveBodyProps) => {
  const { mutateAsync: getUserSchedules, data: scheduleData } =
    useGetUserSchedules();
  const { mutateAsync: createOrUpdateSchedule } = useCreateOrUpdateSchedule();

  const [dates, setDates] = useState<DatesProps[]>([]);

  const handleSubmit = async (values: any) => {
    try {
      await createOrUpdateSchedule(values);
    } catch (error) {
      console.error('Erro ao enviar os dados:', error);
    }
  };

  const formik = useFormik({
    initialValues: {
      userId: employeeId,
      mondayWork: false,
      mondayEntryTime: '',
      mondayPauseTime: '',
      mondayReturnTime: '',
      mondayExitTime: '',
      tuesdayWork: false,
      tuesdayEntryTime: '',
      tuesdayPauseTime: '',
      tuesdayReturnTime: '',
      tuesdayExitTime: '',
      wednesdayWork: false,
      wednesdayEntryTime: '',
      wednesdayPauseTime: '',
      wednesdayReturnTime: '',
      wednesdayExitTime: '',
      thursdayWork: false,
      thursdayEntryTime: '',
      thursdayPauseTime: '',
      thursdayReturnTime: '',
      thursdayExitTime: '',
      fridayWork: false,
      fridayEntryTime: '',
      fridayPauseTime: '',
      fridayReturnTime: '',
      fridayExitTime: '',
      saturdayWork: false,
      saturdayEntryTime: '',
      saturdayPauseTime: '',
      saturdayReturnTime: '',
      saturdayExitTime: '',
      sundayWork: false,
      sundayEntryTime: '',
      sundayPauseTime: '',
      sundayReturnTime: '',
      sundayExitTime: '',
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const getDaysBetweenDates = (
    startDate: string,
    endDate: string,
  ): { date: string; dayOfWeekPT: string; dayOfWeekEN: string }[] => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const dates = [];

    // Adiciona a data inicial
    dates.push({
      date: format(start, 'yyyy-MM-dd'),
      dayOfWeekPT: format(start, 'EEEE', { locale: ptBR }),
      dayOfWeekEN: format(start, 'EEEE', { locale: enUS }),
    });

    // Itera pelos dias intermediários
    while (start < end) {
      start.setDate(start.getDate() + 1); // Incrementa um dia
      if (start <= end) {
        dates.push({
          date: format(new Date(start), 'yyyy-MM-dd'),
          dayOfWeekPT: format(new Date(start), 'EEEE', { locale: ptBR }),
          dayOfWeekEN: format(new Date(start), 'EEEE', { locale: enUS }),
        });
      }
    }

    // Adiciona a data final somente se for diferente da inicial
    if (
      format(new Date(startDate), 'yyyy-MM-dd') !==
      format(new Date(endDate), 'yyyy-MM-dd')
    ) {
      dates.push({
        date: format(end, 'yyyy-MM-dd'),
        dayOfWeekPT: format(end, 'EEEE', { locale: ptBR }),
        dayOfWeekEN: format(end, 'EEEE', { locale: enUS }),
      });
    }
    setDates(dates);
    return dates;
  };

  useEffect(() => {
    const days = getDaysBetweenDates(dateInitCertificate, dateEndCertificate);
    console.log('Dias entre as datas:', days);
  }, [dateInitCertificate, dateEndCertificate]);

  useEffect(() => {
    getUserSchedules(employeeId)?.then((response) => {
      const schedule = response;
      console.log({ schedule });
      if (schedule) {
        formik.setValues({
          userId: schedule?.[0]?.userId,
          mondayWork: schedule?.[0]?.mondayWork,
          mondayEntryTime: schedule?.[0]?.mondayEntryTime,
          mondayPauseTime: schedule?.[0]?.mondayPauseTime,
          mondayReturnTime: schedule?.[0]?.mondayReturnTime,
          mondayExitTime: schedule?.[0]?.mondayExitTime,
          tuesdayWork: schedule?.[0]?.tuesdayWork,
          tuesdayEntryTime: schedule?.[0]?.tuesdayEntryTime,
          tuesdayPauseTime: schedule?.[0]?.tuesdayPauseTime,
          tuesdayReturnTime: schedule?.[0]?.tuesdayReturnTime,
          tuesdayExitTime: schedule?.[0]?.tuesdayExitTime,
          wednesdayWork: schedule?.[0]?.wednesdayWork,
          wednesdayEntryTime: schedule?.[0]?.wednesdayEntryTime,
          wednesdayPauseTime: schedule?.[0]?.wednesdayPauseTime,
          wednesdayReturnTime: schedule?.[0]?.wednesdayReturnTime,
          wednesdayExitTime: schedule?.[0]?.wednesdayExitTime,
          thursdayWork: schedule?.[0]?.thursdayWork,
          thursdayEntryTime: schedule?.[0]?.thursdayEntryTime,
          thursdayPauseTime: schedule?.[0]?.thursdayPauseTime,
          thursdayReturnTime: schedule?.[0]?.thursdayReturnTime,
          thursdayExitTime: schedule?.[0]?.thursdayExitTime,
          fridayWork: schedule?.[0]?.fridayWork,
          fridayEntryTime: schedule?.[0]?.fridayEntryTime,
          fridayPauseTime: schedule?.[0]?.fridayPauseTime,
          fridayReturnTime: schedule?.[0]?.fridayReturnTime,
          fridayExitTime: schedule?.[0]?.fridayExitTime,
          saturdayWork: schedule?.[0]?.saturdayWork,
          saturdayEntryTime: schedule?.[0]?.saturdayEntryTime,
          saturdayPauseTime: schedule?.[0]?.saturdayPauseTime,
          saturdayReturnTime: schedule?.[0]?.saturdayReturnTime,
          saturdayExitTime: schedule?.[0]?.saturdayExitTime,
          sundayWork: schedule?.[0]?.sundayWork,
          sundayEntryTime: schedule?.[0]?.sundayEntryTime,
          sundayPauseTime: schedule?.[0]?.sundayPauseTime,
          sundayReturnTime: schedule?.[0]?.sundayReturnTime,
          sundayExitTime: schedule?.[0]?.sundayExitTime,
        });
      }
    });
  }, []);

  return (
    <Box>
      {dates?.map((day) => (
        <SwitchWithHoursSelectComponent
          key={day.date}
          label={`${format(day.date, 'dd/MM/yyyy')} - ${day.dayOfWeekPT}`}
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
        />
      ))}
    </Box>
  );
};

export default CertificateApproveBody;
