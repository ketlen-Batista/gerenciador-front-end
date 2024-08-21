import React from 'react';

import { UserCheckpointsProvider } from '@pages/ReportsPage/contexts/UserCheckpointsContext';

import JustificationsList from '../../components/JustificationsList';
import UserFilter from '@pages/ReportsPage/components/UserFilter';

const JustificationsPage = () => {
  return (
    <UserCheckpointsProvider>
      {/* <UserFilter /> */}
      <JustificationsList />
    </UserCheckpointsProvider>
  );
};

export default JustificationsPage;
