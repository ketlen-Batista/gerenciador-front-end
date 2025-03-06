import React, { createContext, useEffect, useMemo, useState } from 'react';

import { UserCheckpointFiltersDTO } from '@src/services/CheckinsPoints/dto';
import {
  useGetBankHours,
  useListUserCheckpoints,
} from '@src/services/CheckinsPoints/queries';
import { useGetContracts } from '@src/services/contractsService/queries';
import { useGetJobPositions } from '@src/services/jobPositions/queries';
import { useGetSectors } from '@src/services/sectorService/queries';
import { useGetUsers } from '@src/services/users/queries';
import { INIT_DATE_RANGE } from '@src/utils/dates';
import { UseMutateAsyncFunction } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useLocation } from 'react-router-dom';

export interface Checkpoint {
  id: number;
  timestamp: string; // formato ISO
  checkpointType: 'entrada' | 'pausa' | 'retorno' | 'saída';
  status_value: number | null;
  justification: string | null;
  medicalCertificate: string | null;
  latitude: number;
  longitude: number;
  userId: string;
  photo_user_checkin_id?: number;
  User: {
    id: string;
    name: string;
  };
  status: {
    value: number;
    name: string;
  } | null;
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

interface BankHours {
  userId: string;
  name: string;
  totalHours: number; // Horas totais trabalhadas
  justifiedHours: number; // Horas justificadas
  absences: number; // Número de dias ausentes
  daysWorked: number; // Dias trabalhados
  bankHours: number;
  details: {
    date: string;
    workedHours: number;
    justified: boolean;
    justification?: string;
  }[]; // Detalhes por dia
}

interface UserCheckpointsContextType {
  filterUserId: string;
  setFilterUserId: (userId: string) => void;
  userCheckpoints: Checkpoint[];
  users: User[];
  loading: boolean;
  setLoading: (loading: boolean) => void;
  handleDateFilter: (dateRange: {
    startDate: number | null;
    endDate: number | null;
  }) => void;
  selectedDateRange: { startDate: number | null; endDate: number | null };
  handleOpenModalLocalization: (lat: number, lngt: number) => void;
  coordinates: { latitude: number; longitude: number };
  openModalLocalization: boolean;
  handleCloseModalLocalization: () => void;
  openModalPhoto: boolean;
  photoId: number;
  handleOpenModalPhoto: (photoId: number) => void;
  handleCloseModalPhoto: () => void;
  cargo: number | string | null;
  setCargo: (cargo: number | string | null) => void;
  setSetor: (setor: number | string | null) => void;
  setContrato: (contrato: number | string | null) => void;
  setor: number | string | null;
  contrato: number | string | null;
  jobs: any[];
  contracts: any[];
  sectors: any[];
  isLoadingUserCheckpoints: boolean;
  handleGetUserCheckpoints: () => void;
  bankHours: BankHours[];
}

export const UserCheckpointsContext = createContext(
  {} as UserCheckpointsContextType,
);

export const UserCheckpointsProvider = ({ children }) => {
  const location = useLocation();
  const { userId } = location.state || {};

  const [coordinates, setCoordinates] = useState<{
    latitude: number;
    longitude: number;
  }>({
    latitude: 0,
    longitude: 0,
  });
  const [openModalLocalization, setOpenModalLocalization] =
    useState<boolean>(false);
  const [filterUserId, setFilterUserId] = useState<string>(userId ?? '');
  const [userCheckpoints, setUserCheckpoints] = useState<Checkpoint[]>([]);
  const [bankHours, setBankHours] = useState<BankHours[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedDateRange, setSelectedDateRange] = useState<{
    startDate: number | null;
    endDate: number | null;
  }>({
    startDate: null,
    endDate: null,
  });
  const [openModalPhoto, setOpenModalPhoto] = useState<boolean>(false);
  const [photoId, setPhotoId] = useState<number>();
  const [cargo, setCargo] = useState<number | string | null>(null);
  const [setor, setSetor] = useState<number | string | null>(null);
  const [contrato, setContrato] = useState<number | string | null>(null);

  const { data: jobs, mutate: getJobs } = useGetJobPositions();
  const { data: contracts, mutate: getContracts } = useGetContracts();
  const { data: sectors, mutate: getSectors } = useGetSectors();
  const { data: fetchedUsers, mutate: getUsers } = useGetUsers();
  const {
    mutateAsync: fetchUserCheckpoints,
    isPending: isLoadingUserCheckpoints,
  } = useListUserCheckpoints();

  const { mutateAsync: fetchGetBankHours, isPending: isLoadingGetBankHours } =
    useGetBankHours();

  const handleOpenModalLocalization = (lat: number, lngt: number) => {
    setOpenModalLocalization(true);
    setCoordinates({ latitude: lat, longitude: lngt });
  };

  const handleCloseModalLocalization = () => {
    setOpenModalLocalization(false);
  };

  const handleOpenModalPhoto = (photoId: number) => {
    setOpenModalPhoto(true);
    setPhotoId(photoId);
  };

  const handleCloseModalPhoto = () => {
    setOpenModalPhoto(false);
    setPhotoId(null);
  };

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

    fetchUserCheckpoints({
      startDate: new Date(INIT_DATE_RANGE.startDate).toISOString(),
      endDate: new Date(INIT_DATE_RANGE.endDate).toISOString(),
    })
      .then((checkpoints) => {
        // Verifica e ordena os checkpoints de forma segura
        const sortedData = checkpoints.sort(
          (a, b) =>
            new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
        );
        setUserCheckpoints(sortedData);
      })
      .catch((error) => {
        console.error('Erro ao buscar checkpoints:', error);
      });
  }, []);

  const handleGetUserCheckpoints = () => {
    if (
      selectedDateRange.startDate ||
      selectedDateRange.endDate ||
      filterUserId.length ||
      setor ||
      cargo ||
      contrato
    ) {
      fetchUserCheckpoints({
        userId: filterUserId,
        sectorId: setor ? (setor as number) : undefined,
        jobId: cargo ? (cargo as number) : undefined,
        contractId: contrato ? (contrato as number) : undefined,
        startDate: selectedDateRange.startDate
          ? new Date(selectedDateRange.startDate).toISOString()
          : new Date(INIT_DATE_RANGE.startDate).toISOString(),
        endDate: selectedDateRange.endDate
          ? new Date(selectedDateRange.endDate).toISOString()
          : new Date(INIT_DATE_RANGE.endDate).toISOString(),
      })?.then((checkpoints) => {
        const sortedData = checkpoints.sort(
          (a, b) =>
            new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
        );
        setUserCheckpoints(sortedData);
      });
      //////////////////////////////////
      fetchGetBankHours({
        userId: filterUserId,
        sectorId: setor ? (setor as number) : undefined,
        jobId: cargo ? (cargo as number) : undefined,
        contractId: contrato ? (contrato as number) : undefined,
        startDate: selectedDateRange.startDate
          ? new Date(selectedDateRange.startDate).toISOString()
          : new Date(INIT_DATE_RANGE.startDate).toISOString(),
        endDate: selectedDateRange.endDate
          ? new Date(selectedDateRange.endDate).toISOString()
          : new Date(INIT_DATE_RANGE.endDate).toISOString(),
      })?.then((checkpoints) => {
        setBankHours(checkpoints);
      });
      return;
    }

    fetchUserCheckpoints({
      userId: filterUserId,
      sectorId: setor ? (setor as number) : undefined,
      jobId: cargo ? (cargo as number) : undefined,
      contractId: contrato ? (contrato as number) : undefined,
      startDate: new Date(INIT_DATE_RANGE.startDate).toISOString(),
      endDate: new Date(INIT_DATE_RANGE.endDate).toISOString(),
    }).then((checkpoints) => {
      const sortedData = checkpoints.sort(
        (a, b) =>
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
      );
      setUserCheckpoints(sortedData);
    });
    //////////////////////////////////
    fetchGetBankHours({
      userId: filterUserId,
      sectorId: setor ? (setor as number) : undefined,
      jobId: cargo ? (cargo as number) : undefined,
      contractId: contrato ? (contrato as number) : undefined,
      startDate: new Date(INIT_DATE_RANGE.startDate).toISOString(),
      endDate: new Date(INIT_DATE_RANGE.endDate).toISOString(),
    })?.then((checkpoints) => {
      setBankHours(checkpoints);
    });
  };

  useEffect(() => {
    handleGetUserCheckpoints();
  }, [
    filterUserId,
    selectedDateRange.startDate,
    selectedDateRange.endDate,
    setor,
    cargo,
    contrato,
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
      openModalPhoto,
      photoId,
      handleOpenModalPhoto,
      handleCloseModalPhoto,
      cargo,
      setCargo,
      setSetor,
      setContrato,
      setor,
      contrato,
      jobs,
      contracts,
      sectors,
      isLoadingUserCheckpoints,
      handleGetUserCheckpoints,
      bankHours,
    }),
    [
      filterUserId,
      userCheckpoints,
      users,
      loading,
      selectedDateRange,
      openModalLocalization,
      openModalPhoto,
      photoId,
      cargo,
      setCargo,
      setSetor,
      setContrato,
      setor,
      contrato,
      jobs,
      contracts,
      sectors,
      isLoadingUserCheckpoints,
      handleGetUserCheckpoints,
      bankHours,
    ],
  );

  return (
    <UserCheckpointsContext.Provider value={value}>
      {children}
    </UserCheckpointsContext.Provider>
  );
};
