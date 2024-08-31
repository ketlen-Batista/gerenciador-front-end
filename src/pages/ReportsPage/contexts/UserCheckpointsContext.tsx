import React, { createContext, useEffect, useMemo, useState } from 'react';

import { useListUserCheckpoints } from '@src/services/CheckinsPoints/queries';
import { useGetContracts } from '@src/services/contractsService/queries';
import { useGetJobPositions } from '@src/services/jobPositions/queries';
import { useGetSectors } from '@src/services/sectorService/queries';
import { useGetUsers } from '@src/services/users/queries';
import { INIT_DATE_RANGE } from '@src/utils/dates';
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
  const { mutateAsync: fetchUserCheckpoints } = useListUserCheckpoints();

  const handleOpenModalLocalization = (lat: number, lngt: number) => {
    setOpenModalLocalization(true);
    setCoordinates({ latitude: lat, longitude: lngt });
  };

  const handleCloseModalLocalization = () => {
    setOpenModalLocalization(false);
  };

  const handleOpenModalPhoto = (photoId: number) => {
    console.log({ photoId });
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
        setUserCheckpoints(checkpoints);
      })
      .catch((error) => {
        console.error('Erro ao buscar checkpoints:', error);
      });
  }, []);
  console.log('userCheckpoints12345', userCheckpoints);
  // useEffect(() => {
  //   checkpointsFiltered();
  // }, [filterUserId, selectedDateRange, fetchedCheckpoints]);
  useEffect(() => {
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
        setUserCheckpoints(checkpoints);
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
      setUserCheckpoints(checkpoints);
    });
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
    ],
  );

  return (
    <UserCheckpointsContext.Provider value={value}>
      {children}
    </UserCheckpointsContext.Provider>
  );
};
