import React from 'react';

import { UserCheckpointsProvider } from '@pages/ReportsPage/contexts/UserCheckpointsContext';

import CertificatesList from '../../components/CertificatesList';

// import UserFilter from '@pages/ReportsPage/components/UserFilter';

const CertificatesPage = () => {
  return (
    <UserCheckpointsProvider>
      {/* <UserFilter /> */}
      <CertificatesList />
    </UserCheckpointsProvider>
  );
};

export default CertificatesPage;
