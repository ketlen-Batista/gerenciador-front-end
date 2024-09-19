import React, { createContext, useEffect, useMemo, useState } from 'react';

import { ListDocumentsDTO } from '@src/services/DocumentsService/dto';
import { useListDocuments } from '@src/services/DocumentsService/queries';
// import { listDTO } from '@src/services/Certificates/dto';
import { useGetContracts } from '@src/services/contractsService/queries';
import { useGetJobPositions } from '@src/services/jobPositions/queries';
import { useGetSectors } from '@src/services/sectorService/queries';
import { UpdateDocumentDTO } from '@src/services/typesDocuments/dto';
import { useUpdateDocument } from '@src/services/typesDocuments/queries';
import { useGetUsers } from '@src/services/users/queries';
import { INIT_DATE_RANGE } from '@src/utils/dates';
import { formatDateToCustomString } from '@src/utils/functions';
import { UseMutateAsyncFunction } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { format } from 'date-fns';
import { useLocation } from 'react-router-dom';

interface Certificate {
  id: number;
  userId: string;
  senderId: string;
  documentName: string;
  timestamp: string;
  checkpointType: string;
  status: string;
  justification: string;
  photo: number;
  latitude: number | string;
  longitude: number | string;
  medicalCertificate: string | null;
  dateStartCertificate: string | null;
  dateEndCertificate: string | null;
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

interface CertificatesContextType {
  filterUserId: string;
  setFilterUserId: (userId: string) => void;
  fetchCertificates: UseMutateAsyncFunction<
    any,
    AxiosError<unknown, any>,
    ListDocumentsDTO,
    unknown
  >;
  certificates: Certificate[];
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
  updateDocument: UseMutateAsyncFunction<
    any,
    AxiosError<unknown, any>,
    UpdateDocumentDTO,
    unknown
  >;
}

export const CertificatesContext = createContext({} as CertificatesContextType);

export const CertificatesProvider = ({ children }) => {
  const location = useLocation();
  const { userId } = location.state || {};

  const [filterUserId, setFilterUserId] = useState<string>(userId ?? '');
  const [certificates, setCertificates] = useState<Certificate[]>([]);
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
  const { mutateAsync: fetchCertificates } = useListDocuments();
  const {
    mutateAsync: updateDocument,
    isPending: loadingUpdateDocument,
    isSuccess: isSuccessUpdateDocument,
  } = useUpdateDocument();

  const TYPE_DOCUMENT_CERTIFICATES = [4, 5];

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
    fetchCertificates({
      startDateCertificate: formatDateToCustomString(
        new Date(INIT_DATE_RANGE.startDate),
      ),
      endDateCertificate: formatDateToCustomString(
        new Date(INIT_DATE_RANGE.endDate),
      ),
    })
      .then((checkpoints) => {
        setCertificates(checkpoints);
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
      fetchCertificates({
        typeDocumentValue: TYPE_DOCUMENT_CERTIFICATES,
        senderId: filterUserId,
        sectorValue: setor ? (setor as number) : undefined,
        jobId: cargo ? (cargo as number) : undefined,
        contractValue: contrato ? (contrato as number) : undefined,
        startDateCertificate: selectedDateRange.startDate
          ? formatDateToCustomString(new Date(selectedDateRange.startDate))
          : formatDateToCustomString(new Date(INIT_DATE_RANGE.startDate)),
        endDateCertificate: selectedDateRange.endDate
          ? formatDateToCustomString(new Date(selectedDateRange.endDate))
          : formatDateToCustomString(new Date(INIT_DATE_RANGE.endDate)),
      })?.then((checkpoints) => {
        setCertificates(checkpoints);
      });
      return;
    }

    fetchCertificates({
      typeDocumentValue: TYPE_DOCUMENT_CERTIFICATES,
      senderId: filterUserId,
      sectorValue: setor ? (setor as number) : undefined,
      jobId: cargo ? (cargo as number) : undefined,
      contractValue: contrato ? (contrato as number) : undefined,
      startDateCertificate: formatDateToCustomString(
        new Date(INIT_DATE_RANGE.startDate),
      ),
      endDateCertificate: formatDateToCustomString(
        new Date(INIT_DATE_RANGE.endDate),
      ),
    }).then((checkpoints) => {
      setCertificates(checkpoints);
    });
  }, [
    filterUserId,
    selectedDateRange.startDate,
    selectedDateRange.endDate,
    setor,
    cargo,
    contrato,
    isSuccessUpdateDocument,
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
    }),
    [
      filterUserId,
      certificates,
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
      updateDocument,
    ],
  );

  return (
    <CertificatesContext.Provider value={value}>
      {children}
    </CertificatesContext.Provider>
  );
};
