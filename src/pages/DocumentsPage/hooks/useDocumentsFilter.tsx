import { useContext } from 'react';

import { DocumentsFilterContext } from '@pages/DocumentsPage/contexts/DocumentsFilterContext';

export const useDocumentsFilter = () => {
  const {
    filterUserId,
    setFilterUserId,
    search,
    setSearch,
    documentsFiltered,
    loading,
    users,
    handleDateFilter,
    selectedDateRange,
    handleChangeSearch,
    fetchDocuments,
    openDialogAdd,
    handleCloseModalAdd,
    handleOpenModalAdd,
  } = useContext(DocumentsFilterContext);
  return {
    filterUserId,
    setFilterUserId,
    search,
    setSearch,
    documentsFiltered,
    loading,
    users,
    handleDateFilter,
    selectedDateRange,
    handleChangeSearch,
    fetchDocuments,
    openDialogAdd,
    handleCloseModalAdd,
    handleOpenModalAdd,
  };
};
