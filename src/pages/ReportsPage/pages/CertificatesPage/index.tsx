import React from 'react';

import CertificatesList from '../../components/CertificatesList';
import FiltersCertificates from '../../components/FiltersCertificates';

import { CertificatesProvider } from '../../contexts/CertificatesContext';

// import UserFilter from '@pages/ReportsPage/components/UserFilter';

const CertificatesPage = () => {
  return (
    <CertificatesProvider>
      <FiltersCertificates />
      <CertificatesList />
    </CertificatesProvider>
  );
};

export default CertificatesPage;
