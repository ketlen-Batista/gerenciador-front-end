import React, { useRef } from 'react';

import { FormControl, Grid } from '@mui/material';
import { useUserCheckpointsContext } from '@pages/ReportsPage/hooks/useUserCheckpointsContext';
import { INIT_DATE_RANGE } from '@src/utils/dates';

import DateFilter from '@src/components/DateFilter';
import Select from '@src/components/Select';

const UserFilter = () => {
  const ref = useRef(null);
  const { users, setFilterUserId, filterUserId, handleDateFilter } =
    useUserCheckpointsContext();

  const usersCustomSelect = users.map((user) => {
    return {
      value: user.id,
      name: user.name,
    };
  });

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={4}>
        <FormControl fullWidth>
          <Select
            label="Usuário"
            options={usersCustomSelect}
            value={filterUserId}
            onChange={(e) => setFilterUserId(e.value)}
            clearable
          />
        </FormControl>
      </Grid>
      <Grid item xs={4}></Grid>
      <Grid item xs={4}>
        <DateFilter
          ref={ref}
          initialRange={INIT_DATE_RANGE}
          onFilter={handleDateFilter}
        />
      </Grid>
    </Grid>
  );
};

export default UserFilter;
