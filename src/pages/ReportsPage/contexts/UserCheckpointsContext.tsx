import React, { createContext, useEffect, useMemo, useState } from 'react';

import { useListUserCheckpoints } from '@src/services/CheckinsPoints/queries';
import { useGetUsers } from '@src/services/users/queries';

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
}

export const UserCheckpointsContext = createContext(
  {} as UserCheckpointsContextType,
);

export const UserCheckpointsProvider = ({ children }) => {
  const [filterUserId, setFilterUserId] = useState<string | number>('');
  const [userCheckpoints, setUserCheckpoints] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const { data: fetchedUsers, mutate: getUsers } = useGetUsers();
  const { data: fetchedCheckpoints, mutate: fetchUserCheckpoints } =
    useListUserCheckpoints();

  const checkpointsFiltered = () => {
    if (filterUserId) {
      setUserCheckpoints(
        fetchedCheckpoints?.filter(
          (checkpoint) => checkpoint.userId === filterUserId,
        ),
      );
    } else {
      setUserCheckpoints(fetchedCheckpoints);
    }
  };

  useEffect(() => {
    getUsers({});
    fetchUserCheckpoints({});
  }, []);

  useEffect(() => {
    checkpointsFiltered();
  }, [filterUserId]);

  useEffect(() => {
    if (fetchedUsers) {
      setUsers(fetchedUsers.users);
    }
  }, [fetchedUsers]);

  useEffect(() => {
    if (fetchedCheckpoints) {
      setUserCheckpoints(fetchedCheckpoints);
    }
  }, [fetchedCheckpoints]);

  const value = useMemo(
    () => ({
      filterUserId,
      setFilterUserId,
      userCheckpoints,
      users,
      loading,
      setLoading,
    }),
    [filterUserId, userCheckpoints, users, loading],
  );

  return (
    <UserCheckpointsContext.Provider value={value}>
      {children}
    </UserCheckpointsContext.Provider>
  );
};
