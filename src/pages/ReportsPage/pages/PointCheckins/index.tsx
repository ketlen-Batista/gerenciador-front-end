import React from 'react';

import { UserCheckpointsProvider } from '@pages/ReportsPage/contexts/UserCheckpointsContext';

import UserCheckpointsList from '@pages/ReportsPage/components/UserCheckpointsList';
import UserFilter from '@pages/ReportsPage/components/UserFilter';

const PointCheckins = () => {
  return (
    <UserCheckpointsProvider>
      <UserFilter />
      <UserCheckpointsList />
    </UserCheckpointsProvider>
  );
};

export default PointCheckins;
