import React from 'react';

import JustificationsList from '../../components/JustificationsList';

import { JustificationsProvider } from '../../contexts/JustificationsContext';

const JustificationsPage = () => {
  return (
    <JustificationsProvider>
      <JustificationsList />
    </JustificationsProvider>
  );
};

export default JustificationsPage;
