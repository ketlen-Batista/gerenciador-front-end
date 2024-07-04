import React, { createContext, useEffect, useMemo, useState } from 'react';

import { useListDocuments } from '@src/services/DocumentsService/queries';
import { useGetUsers } from '@src/services/users/queries';
import { useLocation } from 'react-router-dom';

interface Document {
  id: string;
  documentName: string;
  sentIn: string;
  sender: string;
  recipient: string;
  received: boolean;
  visa: boolean;
}

interface DocumentsFilterContextType {
  filterUserId: string | number;
  setFilterUserId: (userId: string | number) => void;
  search: string;
  setSearch: (search: string) => void;
  documentsFiltered: Document[];
  loading: boolean;
  users: any[];
  handleDateFilter: (dateRange: {
    startDate: number | null;
    endDate: number | null;
  }) => void;
  selectedDateRange: { startDate: number | null; endDate: number | null };
  handleChangeSearch: (event: any) => void;
}

export const DocumentsFilterContext = createContext<DocumentsFilterContextType>(
  {} as DocumentsFilterContextType,
);

export const DocumentsFilterProvider = ({ children }) => {
  const location = useLocation();
  const { userId, tab } = location.state || {};

  const [filterUserId, setFilterUserId] = useState<string | number>(
    userId ? userId : '',
  );

  const [search, setSearch] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [documentsFiltered, setDocumentsFiltered] = useState<Document[]>([]);
  const [selectedDateRange, setSelectedDateRange] = useState<{
    startDate: number | null;
    endDate: number | null;
  }>({
    startDate: null,
    endDate: null,
  });

  const { data: fetchedDocuments, mutate: fetchDocuments } = useListDocuments();
  const { data: users, mutate: getUsers } = useGetUsers();

  const filterDocuments = () => {
    let filteredDocs = fetchedDocuments || [];

    if (filterUserId) {
      filteredDocs = filteredDocs.filter(
        (doc) =>
          doc.recipientId?.includes(filterUserId) ||
          doc.senderId === filterUserId,
      );
    }

    if (search) {
      filteredDocs = filteredDocs.filter((doc) =>
        doc.documentName.toLowerCase().includes(search.toLowerCase()),
      );
    }

    if (selectedDateRange.startDate && selectedDateRange.endDate) {
      const startDate = selectedDateRange.startDate;
      const endDate = selectedDateRange.endDate;

      filteredDocs = filteredDocs.filter((doc) => {
        const docDate = new Date(doc.sentIn).getTime();
        return docDate >= startDate && docDate <= endDate;
      });
    }

    setDocumentsFiltered(filteredDocs);
  };

  const handleDateFilter = (dateRange: {
    startDate: number | null;
    endDate: number | null;
  }) => {
    setSelectedDateRange(dateRange);
  };

  const handleChangeSearch = (event) => {
    setSearch(event.target.value);
  };

  useEffect(() => {
    fetchDocuments({});
    getUsers({});
  }, []);

  useEffect(() => {
    if (fetchedDocuments) {
      filterDocuments();
    }
  }, [filterUserId, search, fetchedDocuments, selectedDateRange]);

  const value = useMemo(
    () => ({
      filterUserId,
      setFilterUserId,
      search,
      setSearch,
      documentsFiltered,
      loading,
      users: users?.users,
      handleDateFilter,
      selectedDateRange,
      handleChangeSearch,
    }),
    [
      filterUserId,
      search,
      documentsFiltered,
      loading,
      users,
      handleDateFilter,
      selectedDateRange,
      handleChangeSearch,
    ],
  );

  return (
    <DocumentsFilterContext.Provider value={value}>
      {children}
    </DocumentsFilterContext.Provider>
  );
};
