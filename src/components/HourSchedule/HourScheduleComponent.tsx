import React, { useEffect } from 'react';

import { Button } from '@material-ui/core';
import { Grid } from '@mui/material';
import { ScheduleData } from '@src/services/schedule/dto';
import {
  useCreateOrUpdateSchedule,
  useGetUserSchedules,
} from '@src/services/schedule/queries';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import SwitchWithHoursSelectComponent from './SwitchWithHoursSelect/SwitchWithHoursSelectComponent';

const schedulesTimeList = [
  { label: 'Nenhum horário', value: '' },
  { label: '00:00', value: '00:00' },
  { label: '00:30', value: '00:30' },
  { label: '01:00', value: '01:00' },
  { label: '01:30', value: '01:30' },
  { label: '02:00', value: '02:00' },
  { label: '02:30', value: '02:30' },
  { label: '03:00', value: '03:00' },
  { label: '03:30', value: '03:30' },
  { label: '04:00', value: '04:00' },
  { label: '04:30', value: '04:30' },
  { label: '05:00', value: '05:00' },
  { label: '05:30', value: '05:30' },
  { label: '06:00', value: '06:00' },
  { label: '06:30', value: '06:30' },
  { label: '07:00', value: '07:00' },
  { label: '07:30', value: '07:30' },
  { label: '08:00', value: '08:00' },
  { label: '08:30', value: '08:30' },
  { label: '09:00', value: '09:00' },
  { label: '09:30', value: '09:30' },
  { label: '10:00', value: '10:00' },
  { label: '10:30', value: '10:30' },
  { label: '11:00', value: '11:00' },
  { label: '11:30', value: '11:30' },
  { label: '12:00', value: '12:00' },
  { label: '12:30', value: '12:30' },
  { label: '13:00', value: '13:00' },
  { label: '13:30', value: '13:30' },
  { label: '14:00', value: '14:00' },
  { label: '14:30', value: '14:30' },
  { label: '15:00', value: '15:00' },
  { label: '15:30', value: '15:30' },
  { label: '16:00', value: '16:00' },
  { label: '16:30', value: '16:30' },
  { label: '17:00', value: '17:00' },
  { label: '17:30', value: '17:30' },
  { label: '18:00', value: '18:00' },
  { label: '18:30', value: '18:30' },
  { label: '19:00', value: '19:00' },
  { label: '19:30', value: '19:30' },
  { label: '20:00', value: '20:00' },
  { label: '20:30', value: '20:30' },
  { label: '21:00', value: '21:00' },
  { label: '21:30', value: '21:30' },
  { label: '22:00', value: '22:00' },
  { label: '22:30', value: '22:30' },
  { label: '23:00', value: '23:00' },
  { label: '23:30', value: '23:30' },
];

// Define o schema de validação usando Yup
const validationSchema = Yup.object({
  userId: Yup.string().required('User ID é obrigatório'),
  mondayWork: Yup.boolean(),
  mondayEntryTime: Yup.string().optional(),
  mondayPauseTime: Yup.string().optional(),
  mondayReturnTime: Yup.string().optional(),
  mondayExitTime: Yup.string().optional(),
  tuesdayWork: Yup.boolean(),
  tuesdayEntryTime: Yup.string().optional(),
  tuesdayPauseTime: Yup.string().optional(),
  tuesdayReturnTime: Yup.string().optional(),
  tuesdayExitTime: Yup.string().optional(),
  wednesdayWork: Yup.boolean(),
  wednesdayEntryTime: Yup.string().optional(),
  wednesdayPauseTime: Yup.string().optional(),
  wednesdayReturnTime: Yup.string().optional(),
  wednesdayExitTime: Yup.string().optional(),
  thursdayWork: Yup.boolean(),
  thursdayEntryTime: Yup.string().optional(),
  thursdayPauseTime: Yup.string().optional(),
  thursdayReturnTime: Yup.string().optional(),
  thursdayExitTime: Yup.string().optional(),
  fridayWork: Yup.boolean(),
  fridayEntryTime: Yup.string().optional(),
  fridayPauseTime: Yup.string().optional(),
  fridayReturnTime: Yup.string().optional(),
  fridayExitTime: Yup.string().optional(),
  saturdayWork: Yup.boolean(),
  saturdayEntryTime: Yup.string().optional(),
  saturdayPauseTime: Yup.string().optional(),
  saturdayReturnTime: Yup.string().optional(),
  saturdayExitTime: Yup.string().optional(),
  sundayWork: Yup.boolean(),
  sundayEntryTime: Yup.string().optional(),
  sundayPauseTime: Yup.string().optional(),
  sundayReturnTime: Yup.string().optional(),
  sundayExitTime: Yup.string().optional(),
});

// Função para preparar o payload
const preparePayload = (values: ScheduleData) => ({
  userId: values.userId,
  mondayWork: values.mondayWork,
  mondayEntryTime: values.mondayEntryTime
    ? new Date(values.mondayEntryTime).toISOString()
    : '',
  mondayPauseTime: values.mondayPauseTime
    ? new Date(values.mondayPauseTime).toISOString()
    : '',
  mondayReturnTime: values.mondayReturnTime
    ? new Date(values.mondayReturnTime).toISOString()
    : '',
  mondayExitTime: values.mondayExitTime
    ? new Date(values.mondayExitTime).toISOString()
    : '',
  tuesdayWork: values.tuesdayWork,
  tuesdayEntryTime: values.tuesdayEntryTime
    ? new Date(values.tuesdayEntryTime).toISOString()
    : '',
  tuesdayPauseTime: values.tuesdayPauseTime
    ? new Date(values.tuesdayPauseTime).toISOString()
    : '',
  tuesdayReturnTime: values.tuesdayReturnTime
    ? new Date(values.tuesdayReturnTime).toISOString()
    : '',
  tuesdayExitTime: values.tuesdayExitTime
    ? new Date(values.tuesdayExitTime).toISOString()
    : '',
  wednesdayWork: values.wednesdayWork,
  wednesdayEntryTime: values.wednesdayEntryTime
    ? new Date(values.wednesdayEntryTime).toISOString()
    : '',
  wednesdayPauseTime: values.wednesdayPauseTime
    ? new Date(values.wednesdayPauseTime).toISOString()
    : '',
  wednesdayReturnTime: values.wednesdayReturnTime
    ? new Date(values.wednesdayReturnTime).toISOString()
    : '',
  wednesdayExitTime: values.wednesdayExitTime
    ? new Date(values.wednesdayExitTime).toISOString()
    : '',
  thursdayWork: values.thursdayWork,
  thursdayEntryTime: values.thursdayEntryTime
    ? new Date(values.thursdayEntryTime).toISOString()
    : '',
  thursdayPauseTime: values.thursdayPauseTime
    ? new Date(values.thursdayPauseTime).toISOString()
    : '',
  thursdayReturnTime: values.thursdayReturnTime
    ? new Date(values.thursdayReturnTime).toISOString()
    : '',
  thursdayExitTime: values.thursdayExitTime
    ? new Date(values.thursdayExitTime).toISOString()
    : '',
  fridayWork: values.fridayWork,
  fridayEntryTime: values.fridayEntryTime
    ? new Date(values.fridayEntryTime).toISOString()
    : '',
  fridayPauseTime: values.fridayPauseTime
    ? new Date(values.fridayPauseTime).toISOString()
    : '',
  fridayReturnTime: values.fridayReturnTime
    ? new Date(values.fridayReturnTime).toISOString()
    : '',
  fridayExitTime: values.fridayExitTime
    ? new Date(values.fridayExitTime).toISOString()
    : '',
  saturdayWork: values.saturdayWork,
  saturdayEntryTime: values.saturdayEntryTime
    ? new Date(values.saturdayEntryTime).toISOString()
    : '',
  saturdayPauseTime: values.saturdayPauseTime
    ? new Date(values.saturdayPauseTime).toISOString()
    : '',
  saturdayReturnTime: values.saturdayReturnTime
    ? new Date(values.saturdayReturnTime).toISOString()
    : '',
  saturdayExitTime: values.saturdayExitTime
    ? new Date(values.saturdayExitTime).toISOString()
    : '',
  sundayWork: values.sundayWork,
  sundayEntryTime: values.sundayEntryTime
    ? new Date(values.sundayEntryTime).toISOString()
    : '',
  sundayPauseTime: values.sundayPauseTime
    ? new Date(values.sundayPauseTime).toISOString()
    : '',
  sundayReturnTime: values.sundayReturnTime
    ? new Date(values.sundayReturnTime).toISOString()
    : '',
  sundayExitTime: values.sundayExitTime
    ? new Date(values.sundayExitTime).toISOString()
    : '',
});

interface Props {
  employeeId: string;
  fieldsDisabled: boolean;
}

const HourScheduleComponent = ({ employeeId, fieldsDisabled }: Props) => {
  const { mutateAsync: getUserSchedules, data: scheduleData } =
    useGetUserSchedules();
  const { mutateAsync: createOrUpdateSchedule } = useCreateOrUpdateSchedule();

  const handleSubmitFunction = async (values: any) => {
    try {
      // const payload: ScheduleData = preparePayload(values);
      // Enviar os dados para o endpoint
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
      handleSubmitFunction(values);
    },
  });

  useEffect(() => {
    getUserSchedules(employeeId)?.then((response) => {
      const schedule = response;
      console.log({ schedule });
      if (schedule) {
        formik.setValues({
          userId: schedule?.[0]?.userId ?? employeeId,
          mondayWork: schedule?.[0]?.mondayWork,
          mondayEntryTime: schedule?.[0]?.mondayEntryTime ?? '',
          mondayPauseTime: schedule?.[0]?.mondayPauseTime ?? '',
          mondayReturnTime: schedule?.[0]?.mondayReturnTime ?? '',
          mondayExitTime: schedule?.[0]?.mondayExitTime ?? '',
          tuesdayWork: schedule?.[0]?.tuesdayWork,
          tuesdayEntryTime: schedule?.[0]?.tuesdayEntryTime ?? '',
          tuesdayPauseTime: schedule?.[0]?.tuesdayPauseTime ?? '',
          tuesdayReturnTime: schedule?.[0]?.tuesdayReturnTime ?? '',
          tuesdayExitTime: schedule?.[0]?.tuesdayExitTime ?? '',
          wednesdayWork: schedule?.[0]?.wednesdayWork,
          wednesdayEntryTime: schedule?.[0]?.wednesdayEntryTime ?? '',
          wednesdayPauseTime: schedule?.[0]?.wednesdayPauseTime ?? '',
          wednesdayReturnTime: schedule?.[0]?.wednesdayReturnTime ?? '',
          wednesdayExitTime: schedule?.[0]?.wednesdayExitTime ?? '',
          thursdayWork: schedule?.[0]?.thursdayWork,
          thursdayEntryTime: schedule?.[0]?.thursdayEntryTime ?? '',
          thursdayPauseTime: schedule?.[0]?.thursdayPauseTime ?? '',
          thursdayReturnTime: schedule?.[0]?.thursdayReturnTime ?? '',
          thursdayExitTime: schedule?.[0]?.thursdayExitTime ?? '',
          fridayWork: schedule?.[0]?.fridayWork,
          fridayEntryTime: schedule?.[0]?.fridayEntryTime ?? '',
          fridayPauseTime: schedule?.[0]?.fridayPauseTime ?? '',
          fridayReturnTime: schedule?.[0]?.fridayReturnTime ?? '',
          fridayExitTime: schedule?.[0]?.fridayExitTime ?? '',
          saturdayWork: schedule?.[0]?.saturdayWork,
          saturdayEntryTime: schedule?.[0]?.saturdayEntryTime ?? '',
          saturdayPauseTime: schedule?.[0]?.saturdayPauseTime ?? '',
          saturdayReturnTime: schedule?.[0]?.saturdayReturnTime ?? '',
          saturdayExitTime: schedule?.[0]?.saturdayExitTime ?? '',
          sundayWork: schedule?.[0]?.sundayWork,
          sundayEntryTime: schedule?.[0]?.sundayEntryTime ?? '',
          sundayPauseTime: schedule?.[0]?.sundayPauseTime ?? '',
          sundayReturnTime: schedule?.[0]?.sundayReturnTime ?? '',
          sundayExitTime: schedule?.[0]?.sundayExitTime ?? '',
        });
      }
    });
  }, []);

  return (
    <div>
      {/* <div>
        <label htmlFor="userId">User ID:</label>
        <Field type="text" id="userId" name="userId" />
        <ErrorMessage name="userId" component="div" />
      </div> */}

      {[
        { value: 'monday', label: 'Segunda-feira' },
        { value: 'tuesday', label: 'Terça-feira' },
        { value: 'wednesday', label: 'Quarta-feira' },
        { value: 'thursday', label: 'Quinta-feira' },
        { value: 'friday', label: 'Sexta-feira' },
        { value: 'saturday', label: 'Sábado' },
        { value: 'sunday', label: 'Domingo' },
      ]?.map((day) => (
        <SwitchWithHoursSelectComponent
          key={day.value}
          label={day.label}
          dayOfWeek={day.value}
          active={formik?.values?.[`${day.value}Work`]}
          EntryTime={formik?.values?.[`${day.value}EntryTime`]}
          PauseTime={formik?.values?.[`${day.value}PauseTime`]}
          ReturnTime={formik?.values?.[`${day.value}ReturnTime`]}
          ExitTime={formik?.values?.[`${day.value}ExitTime`]}
          options={schedulesTimeList}
          onChange={(dayOfWeek, key, value) =>
            formik?.setFieldValue(`${dayOfWeek}${key}`, value)
          }
          onClick={() =>
            formik?.setFieldValue(
              `${day.value}Work`,
              !formik?.values?.[`${day.value}Work`],
            )
          }
          fieldsDisabled={fieldsDisabled}
        />
      ))}

      {/* <Button type="submit" onClick={() => formik?.handleSubmit()}>
        Enviar
      </Button> */}

      <Grid item xs={12} pt={2}>
        <form onSubmit={formik?.handleSubmit}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={() => formik?.handleSubmit()}
            disabled={fieldsDisabled}
            size="medium"
            fullWidth
          >
            Salvar
          </Button>
        </form>
      </Grid>
    </div>
  );
};

export default HourScheduleComponent;
