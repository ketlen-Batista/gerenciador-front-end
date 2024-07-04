import React, { createContext, useEffect, useMemo, useState } from 'react';

import { useListUserCheckpoints } from '@src/services/CheckinsPoints/queries';
import { useGetUsers } from '@src/services/users/queries';
import { useLocation } from 'react-router-dom';

interface Checkpoint {
  id: string;
  userId: string;
  timestamp: string;
  checkpointType: string;
  status: string;
  justification: string;
  photo: number;
  latitude: number | string;
  longitude: number | string;
  medicalCertificate: string | null;
}

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  cpf: string;
  address: string;
  registration: string;
  dateOfBirth: string;
  jobPosition_id: number;
  office: string;
  status: string;
  contracts_value: number;
  sector_value: number;
}

interface UserCheckpointsContextType {
  filterUserId: string | number;
  setFilterUserId: (userId: string | number) => void;
  userCheckpoints: Checkpoint[];
  users: User[];
  loading: boolean;
  setLoading: (loading: boolean) => void;
  handleDateFilter: (dateRange: {
    startDate: number | null;
    endDate: number | null;
  }) => void;
  selectedDateRange: { startDate: number | null; endDate: number | null };
}

export const UserCheckpointsContext = createContext(
  {} as UserCheckpointsContextType,
);

export const UserCheckpointsProvider = ({ children }) => {
  const location = useLocation();
  const { userId } = location.state || {};

  const [filterUserId, setFilterUserId] = useState<string | number>(
    userId ?? '',
  );
  const [userCheckpoints, setUserCheckpoints] = useState<Checkpoint[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedDateRange, setSelectedDateRange] = useState<{
    startDate: number | null;
    endDate: number | null;
  }>({
    startDate: null,
    endDate: null,
  });

  const { data: fetchedUsers, mutate: getUsers } = useGetUsers();
  const { data: fetchedCheckpoints, mutate: fetchUserCheckpoints } =
    useListUserCheckpoints();

  const checkpointsFiltered = () => {
    if (!fetchedCheckpoints) return;

    let filteredCheckpoints = fetchedCheckpoints;

    if (filterUserId) {
      filteredCheckpoints = filteredCheckpoints.filter(
        (checkpoint) => checkpoint.userId === filterUserId,
      );
    }

    if (selectedDateRange.startDate && selectedDateRange.endDate) {
      const startDate = selectedDateRange.startDate;
      const endDate = selectedDateRange.endDate;

      filteredCheckpoints = filteredCheckpoints.filter((checkpoint) => {
        const checkpointDate = new Date(checkpoint.timestamp).getTime();
        return checkpointDate >= startDate && checkpointDate <= endDate;
      });
    }

    setUserCheckpoints(filteredCheckpoints);
  };

  const handleDateFilter = (dateRange: {
    startDate: number | null;
    endDate: number | null;
  }) => {
    setSelectedDateRange(dateRange);
  };

  useEffect(() => {
    getUsers({});
    fetchUserCheckpoints({});
  }, []);

  useEffect(() => {
    checkpointsFiltered();
  }, [filterUserId, selectedDateRange, fetchedCheckpoints]);

  useEffect(() => {
    if (fetchedUsers) {
      setUsers(fetchedUsers.users);
    }
  }, [fetchedUsers]);

  const value = useMemo(
    () => ({
      filterUserId,
      setFilterUserId,
      userCheckpoints,
      users,
      loading,
      setLoading,
      handleDateFilter,
      selectedDateRange,
    }),
    [filterUserId, userCheckpoints, users, loading, selectedDateRange],
  );

  return (
    <UserCheckpointsContext.Provider value={value}>
      {children}
    </UserCheckpointsContext.Provider>
  );
};
