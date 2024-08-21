import React from 'react';

import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

import Typography from '../Typography';

// import { Label } from '../../styles';
import SwitchWithHoursSelectComponent from './SwitchWithHoursSelect/SwitchWithHoursSelectComponent';

const HourScheduleComponent = ({
  state,
  SchedulesTimeList,
  handleChangeSwitchActive,
  handleChangeHour,
}) => {
  return (
    <Grid container style={{ marginTop: '24px' }}>
      <Grid item xs={12}>
        <Typography fontSize="18px">Horário de Trabalho</Typography>
      </Grid>
      <Grid item xs={12}>
        <Box
          component="div"
          display="flex"
          flexDirection={'column'}
          style={{ gap: '12px' }}
          mt={1}
        >
          <SwitchWithHoursSelectComponent
            label="Seg"
            titleTooltip="Segunda-Feira"
            dayOfWeek="seg"
            value={state?.seg}
            active={state.workScheduleMonday}
            options={SchedulesTimeList}
            onClick={() => handleChangeSwitchActive('workScheduleMonday')}
            onChange={handleChangeHour}
          />
          <SwitchWithHoursSelectComponent
            label="Ter"
            titleTooltip="Terça-Feira"
            dayOfWeek="ter"
            active={state.workScheduleTuesday}
            value={state?.ter}
            onClick={() => handleChangeSwitchActive('workScheduleTuesday')}
            options={SchedulesTimeList}
            onChange={handleChangeHour}
          />
          <SwitchWithHoursSelectComponent
            label="Qua"
            titleTooltip="Quarta-Feira"
            dayOfWeek="qua"
            active={state.workScheduleWednesday}
            value={state?.qua}
            options={SchedulesTimeList}
            onClick={() => handleChangeSwitchActive('workScheduleWednesday')}
            onChange={handleChangeHour}
          />
          <SwitchWithHoursSelectComponent
            label="Qui"
            titleTooltip="Quinta-Feira"
            dayOfWeek="qui"
            value={state?.qui}
            active={state.workScheduleThursday}
            options={SchedulesTimeList}
            onClick={() => handleChangeSwitchActive('workScheduleThursday')}
            onChange={handleChangeHour}
          />
          <SwitchWithHoursSelectComponent
            label="Sex"
            titleTooltip="Sexta-Feira"
            dayOfWeek="sex"
            value={state?.sex}
            active={state.workScheduleFriday}
            options={SchedulesTimeList}
            onClick={() => handleChangeSwitchActive('workScheduleFriday')}
            onChange={handleChangeHour}
          />
          <SwitchWithHoursSelectComponent
            label="Sab"
            titleTooltip="Sabádo"
            dayOfWeek="sab"
            value={state?.sab}
            active={state.workScheduleSaturday}
            options={SchedulesTimeList}
            onClick={() => handleChangeSwitchActive('workScheduleSaturday')}
            onChange={handleChangeHour}
          />
          <SwitchWithHoursSelectComponent
            label="Dom"
            titleTooltip="Domingo"
            dayOfWeek="dom"
            value={state?.dom}
            active={state.workScheduleSunday}
            options={SchedulesTimeList}
            onClick={() => handleChangeSwitchActive('workScheduleSunday')}
            onChange={handleChangeHour}
          />
        </Box>
      </Grid>
    </Grid>
  );
};

export default HourScheduleComponent;
