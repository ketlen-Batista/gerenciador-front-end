import { useContext } from 'react';

import { JustificationsContext } from '../contexts/JustificationsContext';

export const useJustificationsContext = () => {
  const {
    filterUserId,
    setFilterUserId,
    fetchJustifications,
    justifications,
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
    updateJustifications,
  } = useContext(JustificationsContext);

  return {
    filterUserId,
    setFilterUserId,
    fetchJustifications,
    justifications,
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
    updateJustifications,
  };
};
