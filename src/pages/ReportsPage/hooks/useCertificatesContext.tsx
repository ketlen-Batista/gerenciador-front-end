import { useContext } from 'react';

import { CertificatesContext } from '../contexts/CertificatesContext';

export const useCertificatesContext = () => {
  const {
    filterUserId,
    setFilterUserId,
    fetchCertificates,
    certificates,
    users,
    loading,
    setLoading,
    handleDateFilter,
    selectedDateRange,
    cargo,
    setCargo,
    setSetor,
    setContrato,
    setor,
    contrato,
    jobs,
    contracts,
    sectors,
    updateDocument,
  } = useContext(CertificatesContext);

  return {
    filterUserId,
    setFilterUserId,
    fetchCertificates,
    certificates,
    users,
    loading,
    setLoading,
    handleDateFilter,
    selectedDateRange,
    cargo,
    setCargo,
    setSetor,
    setContrato,
    setor,
    contrato,
    jobs,
    contracts,
    sectors,
    updateDocument,
  };
};