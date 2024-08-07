import { useContext } from 'react';

import { UserCheckpointsContext } from '../contexts/UserCheckpointsContext';

export const useUserCheckpointsContext = () => {
  const {
    filterUserId,
    setFilterUserId,
    userCheckpoints,
    users,
    loading,
    setLoading,
    handleDateFilter,
    selectedDateRange,
    handleOpenModalLocalization,
    coordinates,
    openModalLocalization,
    handleCloseModalLocalization,
  } = useContext(UserCheckpointsContext);

  return {
    filterUserId,
    setFilterUserId,
    userCheckpoints,
    users,
    loading,
    setLoading,
    handleDateFilter,
    selectedDateRange,
    handleOpenModalLocalization,
    coordinates,
    openModalLocalization,
    handleCloseModalLocalization,
  };
};
