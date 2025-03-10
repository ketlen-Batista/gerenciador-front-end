import React from 'react';

import { Box } from '@mui/material';
import { UserCheckpointsProvider } from '@pages/ReportsPage/contexts/UserCheckpointsContext';

import UserHoursDashboard from '../../components/UserHoursDashboard';
import UserCheckpointsList from '@pages/ReportsPage/components/UserCheckpointsList';
import UserFilter from '@pages/ReportsPage/components/UserFilter';

const PointCheckins = () => {
  return (
    <UserCheckpointsProvider>
      <UserFilter />
      <UserCheckpointsList />
      <Box mt={2}>
        <UserHoursDashboard />
      </Box>
    </UserCheckpointsProvider>
  );
};

export default PointCheckins;
