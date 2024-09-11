import React, { createContext, useEffect, useMemo, useState } from 'react';

import {
  UpdateJustificationDTO,
  listDTO,
} from '@src/services/Justifications/dto';
import {
  useGetJustificationsList,
  useUpdateJustification,
} from '@src/services/Justifications/queries';
import { useGetContracts } from '@src/services/contractsService/queries';
import { useGetJobPositions } from '@src/services/jobPositions/queries';
import { useGetSectors } from '@src/services/sectorService/queries';
import { useGetUsers } from '@src/services/users/queries';
import { INIT_DATE_RANGE } from '@src/utils/dates';
import { UseMutateAsyncFunction } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { format } from 'date-fns';
import { useLocation } from 'react-router-dom';

interface Justification {
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

interface JustificationsContextType {
  filterUserId: string;
  setFilterUserId: (userId: string) => void;
  fetchJustifications: UseMutateAsyncFunction<
    any,
    AxiosError<unknown, any>,
    listDTO,
    unknown
  >;
  justifications: Justification[];
  users: User[];
  loading: boolean;
  setLoading: (loading: boolean) => void;
  handleDateFilter: (dateRange: {
    startDate: number | null;
    endDate: number | null;
  }) => void;
  selectedDateRange: { startDate: number | null; endDate: number | null };
  cargo: number | string | null;
  setCargo: (cargo: number | string | null) => void;
  setSetor: (setor: number | string | null) => void;
  setContrato: (contrato: number | string | null) => void;
  setor: number | string | null;
  contrato: number | string | null;
  jobs: any[];
  contracts: any[];
  sectors: any[];
  updateJustifications: UseMutateAsyncFunction<
    any,
    AxiosError<unknown, any>,
    UpdateJustificationDTO & {
      id: string;
    },
    unknown
  >;
}

export const JustificationsContext = createContext(
  {} as JustificationsContextType,
);

export const JustificationsProvider = ({ children }) => {
  const location = useLocation();
  const { userId } = location.state || {};

  const [filterUserId, setFilterUserId] = useState<string>(userId ?? '');
  const [justifications, setJustifications] = useState<Justification[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedDateRange, setSelectedDateRange] = useState<{
    startDate: number | null;
    endDate: number | null;
  }>({
    startDate: null,
    endDate: null,
  });
  const [cargo, setCargo] = useState<number | string | null>(null);
  const [setor, setSetor] = useState<number | string | null>(null);
  const [contrato, setContrato] = useState<number | string | null>(null);

  const { data: jobs, mutate: getJobs } = useGetJobPositions();
  const { data: contracts, mutate: getContracts } = useGetContracts();
  const { data: sectors, mutate: getSectors } = useGetSectors();
  const { data: fetchedUsers, mutate: getUsers } = useGetUsers();
  const { mutateAsync: fetchJustifications } = useGetJustificationsList();
  const {
    mutateAsync: updateJustifications,
    isPending: loadingUpdate,
    isSuccess: isSuccessUpdateJustifications,
  } = useUpdateJustification();

  const handleDateFilter = (dateRange: {
    startDate: number | null;
    endDate: number | null;
  }) => {
    setSelectedDateRange(dateRange);
  };

  useEffect(() => {
    getUsers({});
    getJobs({});
    getContracts({});
    getSectors({});
    fetchJustifications({
      startDate: format(new Date(INIT_DATE_RANGE.startDate), 'dd/MM/yyyy'),
      endDate: format(new Date(INIT_DATE_RANGE.endDate), 'dd/MM/yyyy'),
    })
      .then((checkpoints) => {
        setJustifications(checkpoints);
      })
      .catch((error) => {
        console.error('Erro ao buscar checkpoints:', error);
      });
  }, []);

  useEffect(() => {
    if (
      selectedDateRange.startDate ||
      selectedDateRange.endDate ||
      filterUserId.length ||
      setor ||
      cargo ||
      contrato
    ) {
      fetchJustifications({
        userId: filterUserId,
        sectorValue: setor ? (setor as number) : undefined,
        jobId: cargo ? (cargo as number) : undefined,
        contractValue: contrato ? (contrato as number) : undefined,
        startDate: selectedDateRange.startDate
          ? format(
              new Date(selectedDateRange.startDate).toISOString(),
              'dd/MM/yyyy',
            )
          : format(new Date(INIT_DATE_RANGE.startDate), 'dd/MM/yyyy'),
        endDate: selectedDateRange.endDate
          ? format(
              new Date(selectedDateRange.endDate).toISOString(),
              'dd/MM/yyyy',
            )
          : format(new Date(INIT_DATE_RANGE.endDate), 'dd/MM/yyyy'),
      })?.then((checkpoints) => {
        setJustifications(checkpoints);
      });
      return;
    }

    fetchJustifications({
      userId: filterUserId,
      sectorValue: setor ? (setor as number) : undefined,
      jobId: cargo ? (cargo as number) : undefined,
      contractValue: contrato ? (contrato as number) : undefined,
      startDate: format(
        new Date(INIT_DATE_RANGE.startDate).toISOString(),
        'dd/MM/yyyy',
      ),
      endDate: format(
        new Date(INIT_DATE_RANGE.endDate).toISOString(),
        'dd/MM/yyyy',
      ),
    }).then((checkpoints) => {
      setJustifications(checkpoints);
    });
  }, [
    filterUserId,
    selectedDateRange.startDate,
    selectedDateRange.endDate,
    setor,
    cargo,
    contrato,
    isSuccessUpdateJustifications,
  ]);

  useEffect(() => {
    if (fetchedUsers) {
      setUsers(fetchedUsers.users);
    }
  }, [fetchedUsers]);

  const value = useMemo(
    () => ({
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
    }),
    [
      filterUserId,
      justifications,
      users,
      loading,
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
    ],
  );

  return (
    <JustificationsContext.Provider value={value}>
      {children}
    </JustificationsContext.Provider>
  );
};
