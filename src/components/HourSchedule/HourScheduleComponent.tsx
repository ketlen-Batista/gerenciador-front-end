// import React from 'react';
// import Box from '@material-ui/core/Box';
// import Grid from '@material-ui/core/Grid';
// import Typography from '../Typography';
// // import { Label } from '../../styles';
// import SwitchWithHoursSelectComponent from './SwitchWithHoursSelect/SwitchWithHoursSelectComponent';
// const HourScheduleComponent = ({
//   state,
//   SchedulesTimeList,
//   handleChangeSwitchActive,
//   handleChangeHour,
// }) => {
//   return (
//     <Grid container style={{ marginTop: '24px' }}>
//       <Grid item xs={12}>
//         <Typography fontSize="18px">Horário de Trabalho</Typography>
//       </Grid>
//       <Grid item xs={12}>
//         <Box
//           component="div"
//           display="flex"
//           flexDirection={'column'}
//           style={{ gap: '12px' }}
//           mt={1}
//         >
//           <SwitchWithHoursSelectComponent
//             label="Seg"
//             titleTooltip="Segunda-Feira"
//             dayOfWeek="seg"
//             value={state?.seg}
//             active={state.workScheduleMonday}
//             options={SchedulesTimeList}
//             onClick={() => handleChangeSwitchActive('workScheduleMonday')}
//             onChange={handleChangeHour}
//           />
//           <SwitchWithHoursSelectComponent
//             label="Ter"
//             titleTooltip="Terça-Feira"
//             dayOfWeek="ter"
//             active={state.workScheduleTuesday}
//             value={state?.ter}
//             onClick={() => handleChangeSwitchActive('workScheduleTuesday')}
//             options={SchedulesTimeList}
//             onChange={handleChangeHour}
//           />
//           <SwitchWithHoursSelectComponent
//             label="Qua"
//             titleTooltip="Quarta-Feira"
//             dayOfWeek="qua"
//             active={state.workScheduleWednesday}
//             value={state?.qua}
//             options={SchedulesTimeList}
//             onClick={() => handleChangeSwitchActive('workScheduleWednesday')}
//             onChange={handleChangeHour}
//           />
//           <SwitchWithHoursSelectComponent
//             label="Qui"
//             titleTooltip="Quinta-Feira"
//             dayOfWeek="qui"
//             value={state?.qui}
//             active={state.workScheduleThursday}
//             options={SchedulesTimeList}
//             onClick={() => handleChangeSwitchActive('workScheduleThursday')}
//             onChange={handleChangeHour}
//           />
//           <SwitchWithHoursSelectComponent
//             label="Sex"
//             titleTooltip="Sexta-Feira"
//             dayOfWeek="sex"
//             value={state?.sex}
//             active={state.workScheduleFriday}
//             options={SchedulesTimeList}
//             onClick={() => handleChangeSwitchActive('workScheduleFriday')}
//             onChange={handleChangeHour}
//           />
//           <SwitchWithHoursSelectComponent
//             label="Sab"
//             titleTooltip="Sabádo"
//             dayOfWeek="sab"
//             value={state?.sab}
//             active={state.workScheduleSaturday}
//             options={SchedulesTimeList}
//             onClick={() => handleChangeSwitchActive('workScheduleSaturday')}
//             onChange={handleChangeHour}
//           />
//           <SwitchWithHoursSelectComponent
//             label="Dom"
//             titleTooltip="Domingo"
//             dayOfWeek="dom"
//             value={state?.dom}
//             active={state.workScheduleSunday}
//             options={SchedulesTimeList}
//             onClick={() => handleChangeSwitchActive('workScheduleSunday')}
//             onChange={handleChangeHour}
//           />
//         </Box>
//       </Grid>
//     </Grid>
//   );
// };
// export default HourScheduleComponent;
///////////////////////////////////////////////////////////////////
// import React, { useEffect, useState } from 'react';
// import { Box, Grid } from '@material-ui/core';
// import { ScheduleData } from '@src/services/schedule/dto';
// import {
//   useCreateOrUpdateSchedule,
//   useGetUserSchedules,
// } from '@src/services/schedule/queries';
// import Typography from '../Typography';
// import SwitchWithHoursSelectComponent from './SwitchWithHoursSelect/SwitchWithHoursSelectComponent';
// const HourScheduleComponent = ({ state, handleChangeSwitchActive }) => {
//   const [schedules, setSchedules] = useState<ScheduleData | null>(null);
//   const { mutateAsync: getUserSchedules } = useGetUserSchedules();
//   const { mutateAsync: createOrUpdateSchedule } = useCreateOrUpdateSchedule();
//   useEffect(() => {
//     // Fetch schedules on component mount
//     getUserSchedules('user-id-here')
//       .then((response) => {
//         if (response) {
//           setSchedules(response);
//         }
//       })
//       .catch((error) => {
//         console.error('Erro ao carregar horários:', error);
//       });
//   }, [getUserSchedules]);
//   // Função para salvar (editar ou criar) um horário
//   const handleSaveSchedule = async (day: string, key: string, value: any) => {
//     try {
//       if (!schedules) return;
//       const newSchedule: ScheduleData = {
//         userId: 'user-id-here', // Certifique-se de substituir pelo ID real do usuário
//         ...schedules,
//         [day]: {
//           ...schedules[day],
//           [key]: value,
//         },
//       };
//       await createOrUpdateSchedule(newSchedule);
//       // Atualiza os horários após salvar
//       const updatedSchedules = await getUserSchedules('user-id-here');
//       setSchedules(updatedSchedules || null);
//     } catch (error) {
//       console.error('Erro ao salvar o horário:', error);
//     }
//   };
//   return (
//     <Grid container style={{ marginTop: '24px' }}>
//       <Grid item xs={12}>
//         <Typography fontSize="18px">Horário de Trabalho</Typography>
//       </Grid>
//       <Grid item xs={12}>
//         <Box
//           component="div"
//           display="flex"
//           flexDirection="column"
//           style={{ gap: '12px' }}
//           mt={1}
//         >
//           {[
//             'monday',
//             'tuesday',
//             'wednesday',
//             'thursday',
//             'friday',
//             'saturday',
//             'sunday',
//           ].map((day) => (
//             <SwitchWithHoursSelectComponent
//               key={day}
//               label={day.charAt(0).toUpperCase() + day.slice(1)}
//               titleTooltip={`Horários para ${day.charAt(0).toUpperCase() + day.slice(1)}`}
//               dayOfWeek={day}
//               value={schedules ? schedules[`${day}Work`] : false}
//               active={
//                 state[
//                   `workSchedule${day.charAt(0).toUpperCase() + day.slice(1)}`
//                 ]
//               }
//               options={schedules}
//               onClick={() =>
//                 handleChangeSwitchActive(
//                   `workSchedule${day.charAt(0).toUpperCase() + day.slice(1)}`,
//                 )
//               }
//               onChange={(key, value) => handleSaveSchedule(day, key, value)}
//             />
//           ))}
//         </Box>
//       </Grid>
//     </Grid>
//   );
// };
// export default HourScheduleComponent;
/////////////////////////////////////////////////////////////////////////
// import React, { useEffect, useState } from 'react';
// import { Box, Grid } from '@material-ui/core';
// import { ScheduleData } from '@src/services/schedule/dto';
// import {
//   useCreateOrUpdateSchedule,
//   useGetUserSchedules,
// } from '@src/services/schedule/queries';
// import Typography from '../Typography';
// import SwitchWithHoursSelectComponent from './SwitchWithHoursSelect/SwitchWithHoursSelectComponent';
// interface Options {
//   label?: string;
//   value?: string;
// }
// const HourScheduleComponent = ({ state, handleChangeSwitchActive }) => {
//   const [schedules, setSchedules] = useState<ScheduleData | null>(null);
//   const [options, setOptions] = useState<Options[]>([]); // Adicione isso
//   const { mutateAsync: getUserSchedules } = useGetUserSchedules();
//   const { mutateAsync: createOrUpdateSchedule } = useCreateOrUpdateSchedule();
//   useEffect(() => {
//     // Fetch schedules on component mount
//     getUserSchedules('user-id-here')
//       .then((response) => {
//         if (response) {
//           setSchedules(response);
//         }
//       })
//       .catch((error) => {
//         console.error('Erro ao carregar horários:', error);
//       });
//     // Gerar opções para autocomplete
//     const timeOptions: Options[] = []; // Popule isso com suas opções
//     for (let i = 0; i < 24; i++) {
//       const value = `${i}:00`;
//       timeOptions.push({ value, label: value });
//       timeOptions.push({ value: `${i}:30`, label: `${i}:30` });
//     }
//     setOptions(timeOptions);
//   }, [getUserSchedules]);
//   const handleSaveSchedule = async (day: string, key: string, value: any) => {
//     try {
//       if (!schedules) return;
//       const newSchedule: ScheduleData = {
//         userId: 'user-id-here',
//         ...schedules,
//         [`${day}Work`]: value,
//       };
//       await createOrUpdateSchedule(newSchedule);
//       const updatedSchedules = await getUserSchedules('user-id-here');
//       setSchedules(updatedSchedules || null);
//     } catch (error) {
//       console.error('Erro ao salvar o horário:', error);
//     }
//   };
//   return (
//     <Grid container style={{ marginTop: '24px' }}>
//       <Grid item xs={12}>
//         <Typography fontSize="18px">Horário de Trabalho</Typography>
//       </Grid>
//       <Grid item xs={12}>
//         <Box
//           component="div"
//           display="flex"
//           flexDirection="column"
//           style={{ gap: '12px' }}
//           mt={1}
//         >
//           {[
//             'monday',
//             'tuesday',
//             'wednesday',
//             'thursday',
//             'friday',
//             'saturday',
//             'sunday',
//           ].map((day) => (
//             <SwitchWithHoursSelectComponent
//               key={day}
//               label={day.charAt(0).toUpperCase() + day.slice(1)}
//               dayOfWeek={day}
//               value={schedules ? schedules[`${day}Work`] : false}
//               active={
//                 state[
//                   `workSchedule${day.charAt(0).toUpperCase() + day.slice(1)}`
//                 ]
//               }
//               options={options} // Passe as opções corretas
//               onClick={() =>
//                 handleChangeSwitchActive(
//                   `workSchedule${day.charAt(0).toUpperCase() + day.slice(1)}`,
//                 )
//               }
//               onChange={(key, value) => handleSaveSchedule(day, key, value)}
//             />
//           ))}
//         </Box>
//       </Grid>
//     </Grid>
//   );
// };
// export default HourScheduleComponent;
///////////////////////////////////////////////////////////
// import React from 'react';
// import { ScheduleData } from '@src/services/schedule/dto';
// import {
//   useCreateOrUpdateSchedule,
//   useGetUserSchedules,
// } from '@src/services/schedule/queries';
// import { ErrorMessage, Field, Form, Formik } from 'formik';
// import * as Yup from 'yup';
// import SwitchWithHoursSelectComponent from './SwitchWithHoursSelect/SwitchWithHoursSelectComponent';
// const schedulesTimeList = [
//   { label: '00:00', value: '00:00' },
//   { label: '00:30', value: '00:30' },
//   { label: '01:00', value: '01:00' },
//   { label: '01:30', value: '01:30' },
//   { label: '02:00', value: '02:00' },
//   { label: '02:30', value: '02:30' },
//   { label: '03:00', value: '03:00' },
//   { label: '03:30', value: '03:30' },
//   { label: '04:00', value: '04:00' },
//   { label: '04:30', value: '04:30' },
//   { label: '05:00', value: '05:00' },
//   { label: '05:30', value: '05:30' },
//   { label: '06:00', value: '06:00' },
//   { label: '06:30', value: '06:30' },
//   { label: '07:00', value: '07:00' },
//   { label: '07:30', value: '07:30' },
//   { label: '08:00', value: '08:00' },
//   { label: '08:30', value: '08:30' },
//   { label: '09:00', value: '09:00' },
//   { label: '09:30', value: '09:30' },
//   { label: '10:00', value: '10:00' },
//   { label: '10:30', value: '10:30' },
//   { label: '11:00', value: '11:00' },
//   { label: '11:30', value: '11:30' },
//   { label: '12:00', value: '12:00' },
//   { label: '12:30', value: '12:30' },
//   { label: '13:00', value: '13:00' },
//   { label: '13:30', value: '13:30' },
//   { label: '14:00', value: '14:00' },
//   { label: '14:30', value: '14:30' },
//   { label: '15:00', value: '15:00' },
//   { label: '15:30', value: '15:30' },
//   { label: '16:00', value: '16:00' },
//   { label: '16:30', value: '16:30' },
//   { label: '17:00', value: '17:00' },
//   { label: '17:30', value: '17:30' },
//   { label: '18:00', value: '18:00' },
//   { label: '18:30', value: '18:30' },
//   { label: '19:00', value: '19:00' },
//   { label: '19:30', value: '19:30' },
//   { label: '20:00', value: '20:00' },
//   { label: '20:30', value: '20:30' },
//   { label: '21:00', value: '21:00' },
//   { label: '21:30', value: '21:30' },
//   { label: '22:00', value: '22:00' },
//   { label: '22:30', value: '22:30' },
//   { label: '23:00', value: '23:00' },
//   { label: '23:30', value: '23:30' },
// ];
// // Define o schema de validação usando Yup
// const validationSchema = Yup.object({
//   userId: Yup.string().required('User ID é obrigatório'),
//   mondayWork: Yup.boolean(),
//   mondayEntryTime: Yup.string().nullable(),
//   mondayPauseTime: Yup.string().nullable(),
//   mondayReturnTime: Yup.string().nullable(),
//   mondayExitTime: Yup.string().nullable(),
//   tuesdayWork: Yup.boolean(),
//   tuesdayEntryTime: Yup.string().nullable(),
//   tuesdayPauseTime: Yup.string().nullable(),
//   tuesdayReturnTime: Yup.string().nullable(),
//   tuesdayExitTime: Yup.string().nullable(),
//   wednesdayWork: Yup.boolean(),
//   wednesdayEntryTime: Yup.string().nullable(),
//   wednesdayPauseTime: Yup.string().nullable(),
//   wednesdayReturnTime: Yup.string().nullable(),
//   wednesdayExitTime: Yup.string().nullable(),
//   thursdayWork: Yup.boolean(),
//   thursdayEntryTime: Yup.string().nullable(),
//   thursdayPauseTime: Yup.string().nullable(),
//   thursdayReturnTime: Yup.string().nullable(),
//   thursdayExitTime: Yup.string().nullable(),
//   fridayWork: Yup.boolean(),
//   fridayEntryTime: Yup.string().nullable(),
//   fridayPauseTime: Yup.string().nullable(),
//   fridayReturnTime: Yup.string().nullable(),
//   fridayExitTime: Yup.string().nullable(),
//   saturdayWork: Yup.boolean(),
//   saturdayEntryTime: Yup.string().nullable(),
//   saturdayPauseTime: Yup.string().nullable(),
//   saturdayReturnTime: Yup.string().nullable(),
//   saturdayExitTime: Yup.string().nullable(),
//   sundayWork: Yup.boolean(),
//   sundayEntryTime: Yup.string().nullable(),
//   sundayPauseTime: Yup.string().nullable(),
//   sundayReturnTime: Yup.string().nullable(),
//   sundayExitTime: Yup.string().nullable(),
// });
// // Função para preparar o payload
// const preparePayload = (values: ScheduleData) => ({
//   userId: values.userId,
//   mondayWork: values.mondayWork,
//   mondayEntryTime: values.mondayEntryTime
//     ? new Date(values.mondayEntryTime).toISOString()
//     : null,
//   mondayPauseTime: values.mondayPauseTime
//     ? new Date(values.mondayPauseTime).toISOString()
//     : null,
//   mondayReturnTime: values.mondayReturnTime
//     ? new Date(values.mondayReturnTime).toISOString()
//     : null,
//   mondayExitTime: values.mondayExitTime
//     ? new Date(values.mondayExitTime).toISOString()
//     : null,
//   tuesdayWork: values.tuesdayWork,
//   tuesdayEntryTime: values.tuesdayEntryTime
//     ? new Date(values.tuesdayEntryTime).toISOString()
//     : null,
//   tuesdayPauseTime: values.tuesdayPauseTime
//     ? new Date(values.tuesdayPauseTime).toISOString()
//     : null,
//   tuesdayReturnTime: values.tuesdayReturnTime
//     ? new Date(values.tuesdayReturnTime).toISOString()
//     : null,
//   tuesdayExitTime: values.tuesdayExitTime
//     ? new Date(values.tuesdayExitTime).toISOString()
//     : null,
//   wednesdayWork: values.wednesdayWork,
//   wednesdayEntryTime: values.wednesdayEntryTime
//     ? new Date(values.wednesdayEntryTime).toISOString()
//     : null,
//   wednesdayPauseTime: values.wednesdayPauseTime
//     ? new Date(values.wednesdayPauseTime).toISOString()
//     : null,
//   wednesdayReturnTime: values.wednesdayReturnTime
//     ? new Date(values.wednesdayReturnTime).toISOString()
//     : null,
//   wednesdayExitTime: values.wednesdayExitTime
//     ? new Date(values.wednesdayExitTime).toISOString()
//     : null,
//   thursdayWork: values.thursdayWork,
//   thursdayEntryTime: values.thursdayEntryTime
//     ? new Date(values.thursdayEntryTime).toISOString()
//     : null,
//   thursdayPauseTime: values.thursdayPauseTime
//     ? new Date(values.thursdayPauseTime).toISOString()
//     : null,
//   thursdayReturnTime: values.thursdayReturnTime
//     ? new Date(values.thursdayReturnTime).toISOString()
//     : null,
//   thursdayExitTime: values.thursdayExitTime
//     ? new Date(values.thursdayExitTime).toISOString()
//     : null,
//   fridayWork: values.fridayWork,
//   fridayEntryTime: values.fridayEntryTime
//     ? new Date(values.fridayEntryTime).toISOString()
//     : null,
//   fridayPauseTime: values.fridayPauseTime
//     ? new Date(values.fridayPauseTime).toISOString()
//     : null,
//   fridayReturnTime: values.fridayReturnTime
//     ? new Date(values.fridayReturnTime).toISOString()
//     : null,
//   fridayExitTime: values.fridayExitTime
//     ? new Date(values.fridayExitTime).toISOString()
//     : null,
//   saturdayWork: values.saturdayWork,
//   saturdayEntryTime: values.saturdayEntryTime
//     ? new Date(values.saturdayEntryTime).toISOString()
//     : null,
//   saturdayPauseTime: values.saturdayPauseTime
//     ? new Date(values.saturdayPauseTime).toISOString()
//     : null,
//   saturdayReturnTime: values.saturdayReturnTime
//     ? new Date(values.saturdayReturnTime).toISOString()
//     : null,
//   saturdayExitTime: values.saturdayExitTime
//     ? new Date(values.saturdayExitTime).toISOString()
//     : null,
//   sundayWork: values.sundayWork,
//   sundayEntryTime: values.sundayEntryTime
//     ? new Date(values.sundayEntryTime).toISOString()
//     : null,
//   sundayPauseTime: values.sundayPauseTime
//     ? new Date(values.sundayPauseTime).toISOString()
//     : null,
//   sundayReturnTime: values.sundayReturnTime
//     ? new Date(values.sundayReturnTime).toISOString()
//     : null,
//   sundayExitTime: values.sundayExitTime
//     ? new Date(values.sundayExitTime).toISOString()
//     : null,
// });
// interface Props {
//   employeeId: string;
// }
// const HourScheduleComponent = ({ employeeId }: Props) => {
//   const { mutateAsync: getUserSchedules, data: scheduleData } =
//     useGetUserSchedules();
//   const { mutateAsync: createOrUpdateSchedule } = useCreateOrUpdateSchedule();
//   const handleSubmit = async (
//     values: any,
//     { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void },
//   ) => {
//     const payload: ScheduleData = preparePayload(values);
//     try {
//       // Enviar os dados para o endpoint
//       await createOrUpdateSchedule(payload);
//       console.log('Dados enviados com sucesso');
//     } catch (error) {
//       console.error('Erro ao enviar os dados:', error);
//     } finally {
//       setSubmitting(false);
//     }
//   };
//   return (
//     <Formik
//       initialValues={{
//         userId: employeeId,
//         mondayWork: false,
//         mondayEntryTime: '',
//         mondayPauseTime: '',
//         mondayReturnTime: '',
//         mondayExitTime: '',
//         tuesdayWork: false,
//         tuesdayEntryTime: '',
//         tuesdayPauseTime: '',
//         tuesdayReturnTime: '',
//         tuesdayExitTime: '',
//         wednesdayWork: false,
//         wednesdayEntryTime: '',
//         wednesdayPauseTime: '',
//         wednesdayReturnTime: '',
//         wednesdayExitTime: '',
//         thursdayWork: false,
//         thursdayEntryTime: '',
//         thursdayPauseTime: '',
//         thursdayReturnTime: '',
//         thursdayExitTime: '',
//         fridayWork: false,
//         fridayEntryTime: '',
//         fridayPauseTime: '',
//         fridayReturnTime: '',
//         fridayExitTime: '',
//         saturdayWork: false,
//         saturdayEntryTime: '',
//         saturdayPauseTime: '',
//         saturdayReturnTime: '',
//         saturdayExitTime: '',
//         sundayWork: false,
//         sundayEntryTime: '',
//         sundayPauseTime: '',
//         sundayReturnTime: '',
//         sundayExitTime: '',
//       }}
//       validationSchema={validationSchema}
//       onSubmit={handleSubmit}
//     >
//       {({ isSubmitting }) => (
//         <Form>
//           <div>
//             <label htmlFor="userId">User ID:</label>
//             <Field type="text" id="userId" name="userId" />
//             <ErrorMessage name="userId" component="div" />
//           </div>
//           <div>
//             <label>
//               <Field type="checkbox" name="mondayWork" />
//               Trabalha na segunda-feira
//             </label>
//             <ErrorMessage name="mondayWork" component="div" />
//           </div>
//           {[
//             { value: 'monday', label: 'Segunda-feira' },
//             { value: 'tuesday', label: 'Terça-feira' },
//             { value: 'wednesday', label: 'Quarta-feira' },
//             { value: 'thursday', label: 'Quinta-feira' },
//             { value: 'friday', label: 'Sexta-feira' },
//             { value: 'saturday', label: 'Sábado' },
//             { value: 'sunday', label: 'Domingo' },
//           ].map((day) => (
//             <React.Fragment key={day.value}>
//               <SwitchWithHoursSelectComponent
//                 label={day.label}
//                 EntryTime={scheduleData?.[`${day.value}Work`]}
//                 PauseTime={scheduleData?.[`${day.value}Work`]}
//                 ReturnTime={scheduleData?.[`${day.value}Work`]}
//                 ExitTime={scheduleData?.[`${day.value}Work`]}
//                 options={schedulesTimeList}
//                 dayOfWeek={day.value}
//               />
//             </React.Fragment>
//           ))}
//         </Form>
//       )}
//     </Formik>
//   );
// };
// export default HourScheduleComponent;
////////////////////////////////////////////
import React, { useEffect } from 'react';

import { Button } from '@material-ui/core';
import { Grid } from '@mui/material';
import { ScheduleData } from '@src/services/schedule/dto';
import {
  useCreateOrUpdateSchedule,
  useGetUserSchedules,
} from '@src/services/schedule/queries';
import { ErrorMessage, Field, useFormik } from 'formik';
import * as Yup from 'yup';

import SwitchWithHoursSelectComponent from './SwitchWithHoursSelect/SwitchWithHoursSelectComponent';

const schedulesTimeList = [
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

// Função para preparar o payload
const preparePayload = (values: ScheduleData) => ({
  userId: values.userId,
  mondayWork: values.mondayWork,
  mondayEntryTime: values.mondayEntryTime
    ? new Date(values.mondayEntryTime).toISOString()
    : null,
  mondayPauseTime: values.mondayPauseTime
    ? new Date(values.mondayPauseTime).toISOString()
    : null,
  mondayReturnTime: values.mondayReturnTime
    ? new Date(values.mondayReturnTime).toISOString()
    : null,
  mondayExitTime: values.mondayExitTime
    ? new Date(values.mondayExitTime).toISOString()
    : null,
  tuesdayWork: values.tuesdayWork,
  tuesdayEntryTime: values.tuesdayEntryTime
    ? new Date(values.tuesdayEntryTime).toISOString()
    : null,
  tuesdayPauseTime: values.tuesdayPauseTime
    ? new Date(values.tuesdayPauseTime).toISOString()
    : null,
  tuesdayReturnTime: values.tuesdayReturnTime
    ? new Date(values.tuesdayReturnTime).toISOString()
    : null,
  tuesdayExitTime: values.tuesdayExitTime
    ? new Date(values.tuesdayExitTime).toISOString()
    : null,
  wednesdayWork: values.wednesdayWork,
  wednesdayEntryTime: values.wednesdayEntryTime
    ? new Date(values.wednesdayEntryTime).toISOString()
    : null,
  wednesdayPauseTime: values.wednesdayPauseTime
    ? new Date(values.wednesdayPauseTime).toISOString()
    : null,
  wednesdayReturnTime: values.wednesdayReturnTime
    ? new Date(values.wednesdayReturnTime).toISOString()
    : null,
  wednesdayExitTime: values.wednesdayExitTime
    ? new Date(values.wednesdayExitTime).toISOString()
    : null,
  thursdayWork: values.thursdayWork,
  thursdayEntryTime: values.thursdayEntryTime
    ? new Date(values.thursdayEntryTime).toISOString()
    : null,
  thursdayPauseTime: values.thursdayPauseTime
    ? new Date(values.thursdayPauseTime).toISOString()
    : null,
  thursdayReturnTime: values.thursdayReturnTime
    ? new Date(values.thursdayReturnTime).toISOString()
    : null,
  thursdayExitTime: values.thursdayExitTime
    ? new Date(values.thursdayExitTime).toISOString()
    : null,
  fridayWork: values.fridayWork,
  fridayEntryTime: values.fridayEntryTime
    ? new Date(values.fridayEntryTime).toISOString()
    : null,
  fridayPauseTime: values.fridayPauseTime
    ? new Date(values.fridayPauseTime).toISOString()
    : null,
  fridayReturnTime: values.fridayReturnTime
    ? new Date(values.fridayReturnTime).toISOString()
    : null,
  fridayExitTime: values.fridayExitTime
    ? new Date(values.fridayExitTime).toISOString()
    : null,
  saturdayWork: values.saturdayWork,
  saturdayEntryTime: values.saturdayEntryTime
    ? new Date(values.saturdayEntryTime).toISOString()
    : null,
  saturdayPauseTime: values.saturdayPauseTime
    ? new Date(values.saturdayPauseTime).toISOString()
    : null,
  saturdayReturnTime: values.saturdayReturnTime
    ? new Date(values.saturdayReturnTime).toISOString()
    : null,
  saturdayExitTime: values.saturdayExitTime
    ? new Date(values.saturdayExitTime).toISOString()
    : null,
  sundayWork: values.sundayWork,
  sundayEntryTime: values.sundayEntryTime
    ? new Date(values.sundayEntryTime).toISOString()
    : null,
  sundayPauseTime: values.sundayPauseTime
    ? new Date(values.sundayPauseTime).toISOString()
    : null,
  sundayReturnTime: values.sundayReturnTime
    ? new Date(values.sundayReturnTime).toISOString()
    : null,
  sundayExitTime: values.sundayExitTime
    ? new Date(values.sundayExitTime).toISOString()
    : null,
});

interface Props {
  employeeId: string;
  fieldsDisabled: boolean;
}

const HourScheduleComponent = ({ employeeId, fieldsDisabled }: Props) => {
  const { mutateAsync: getUserSchedules, data: scheduleData } =
    useGetUserSchedules();
  const { mutateAsync: createOrUpdateSchedule } = useCreateOrUpdateSchedule();

  const handleSubmit = async (values: any) => {
    console.log('entrou', values);
    try {
      // const payload: ScheduleData = preparePayload(values);
      // Enviar os dados para o endpoint
      await createOrUpdateSchedule(values);
      console.log('Dados enviados com sucesso');
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
        />
      ))}

      {/* <Button type="submit" onClick={() => formik?.handleSubmit()}>
        Enviar
      </Button> */}

      <Grid item xs={12} pt={2}>
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
      </Grid>
    </div>
  );
};

export default HourScheduleComponent;
