import React from 'react';

import { FormControl, Grid } from '@mui/material';
import { useUserCheckpointsContext } from '@pages/ReportsPage/hooks/useUserCheckpointsContext';

import Select from '@src/components/Select';

const UserFilter = () => {
  const { users, setFilterUserId, filterUserId } = useUserCheckpointsContext();

  const usersCustomSelect = users.map((user) => {
    return {
      value: user.id,
      name: user.name,
    };
  });

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={6}>
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
    </Grid>
  );
};

export default UserFilter;
