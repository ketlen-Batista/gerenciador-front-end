import React, { createContext, useEffect, useMemo, useState } from 'react';

import { createUserCheckpoint } from '@src/services/CheckinsPoints/api';
import { ListDocumentsDTO } from '@src/services/DocumentsService/dto';
import { useListDocuments } from '@src/services/DocumentsService/queries';
// import { listDTO } from '@src/services/Certificates/dto';
import { useGetContracts } from '@src/services/contractsService/queries';
import { useGetJobPositions } from '@src/services/jobPositions/queries';
import { useGetUserSchedules } from '@src/services/schedule/queries';
import { useGetSectors } from '@src/services/sectorService/queries';
import { UpdateDocumentDTO } from '@src/services/typesDocuments/dto';
import { useUpdateDocument } from '@src/services/typesDocuments/queries';
import { useGetUsers } from '@src/services/users/queries';
import { INIT_DATE_RANGE } from '@src/utils/dates';
import { addHoursToTime, formatDateToCustomString } from '@src/utils/functions';
import { UseMutateAsyncFunction } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { format, startOfDay } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import { enUS, ptBR } from 'date-fns/locale';
import { FormikProps, useFormik } from 'formik';
import { useLocation } from 'react-router-dom';
import * as Yup from 'yup';

export interface Certificate {
  id: number;
  userId: string;
  senderId: string;
  documentName: string;
  timestamp: string;
  checkpointType: string;
  status: {
    name: string;
    value: number;
  };
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

type DatesProps = {
  date: string;
  dayOfWeekEN: string;
  dayOfWeekPT: string;
};

interface FormValues {
  userId: string;
  mondayWork: boolean;
  mondayEntryTime: string | null;
  mondayPauseTime: string | null;
  mondayReturnTime: string | null;
  mondayExitTime: string | null;
  tuesdayWork: boolean;
  tuesdayEntryTime: string | null;
  tuesdayPauseTime: string | null;
  tuesdayReturnTime: string | null;
  tuesdayExitTime: string | null;
  wednesdayWork: boolean;
  wednesdayEntryTime: string | null;
  wednesdayPauseTime: string | null;
  wednesdayReturnTime: string | null;
  wednesdayExitTime: string | null;
  thursdayWork: boolean;
  thursdayEntryTime: string | null;
  thursdayPauseTime: string | null;
  thursdayReturnTime: string | null;
  thursdayExitTime: string | null;
  fridayWork: boolean;
  fridayEntryTime: string | null;
  fridayPauseTime: string | null;
  fridayReturnTime: string | null;
  fridayExitTime: string | null;
  saturdayWork: boolean;
  saturdayEntryTime: string | null;
  saturdayPauseTime: string | null;
  saturdayReturnTime: string | null;
  saturdayExitTime: string | null;
  sundayWork: boolean;
  sundayEntryTime: string | null;
  sundayPauseTime: string | null;
  sundayReturnTime: string | null;
  sundayExitTime: string | null;
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
  openModalPhoto: boolean;
  photoId: number;
  handleOpenModalPhoto: (photoId: number) => void;
  handleCloseModalPhoto: () => void;
  employeeIdSelected: string;
  setEmployeeIdSelected: (employeeId: string) => void;
  formik: FormikProps<FormValues>;
  getDaysBetweenDates: (startDate: string, endDate: string) => void;
  getUserSchedules: UseMutateAsyncFunction<
    any,
    AxiosError<unknown, any>,
    string,
    unknown
  >;
  scheduleData: any;
  dates: DatesProps[];
  statusJustificationValue: number;
  setStatusJustificationValue: React.Dispatch<any>;
  isLoadingCertificatesGet: boolean;
}

const validationSchema = Yup.object({
  userId: Yup.string().required('User ID é obrigatório'),
  mondayWork: Yup.boolean(),
  mondayEntryTime: Yup.string().nullable(),
  mondayPauseTime: Yup.string().nullable(),
  mondayReturnTime: Yup.string().nullable(),
  mondayExitTime: Yup.string().nullable(),
  tuesdayWork: Yup.boolean(),
  tuesdayEntryTime: Yup.string().nullable(),
  tuesdayPauseTime: Yup.string().nullable(),
  tuesdayReturnTime: Yup.string().nullable(),
  tuesdayExitTime: Yup.string().nullable(),
  wednesdayWork: Yup.boolean(),
  wednesdayEntryTime: Yup.string().nullable(),
  wednesdayPauseTime: Yup.string().nullable(),
  wednesdayReturnTime: Yup.string().nullable(),
  wednesdayExitTime: Yup.string().nullable(),
  thursdayWork: Yup.boolean(),
  thursdayEntryTime: Yup.string().nullable(),
  thursdayPauseTime: Yup.string().nullable(),
  thursdayReturnTime: Yup.string().nullable(),
  thursdayExitTime: Yup.string().nullable(),
  fridayWork: Yup.boolean(),
  fridayEntryTime: Yup.string().nullable(),
  fridayPauseTime: Yup.string().nullable(),
  fridayReturnTime: Yup.string().nullable(),
  fridayExitTime: Yup.string().nullable(),
  saturdayWork: Yup.boolean(),
  saturdayEntryTime: Yup.string().nullable(),
  saturdayPauseTime: Yup.string().nullable(),
  saturdayReturnTime: Yup.string().nullable(),
  saturdayExitTime: Yup.string().nullable(),
  sundayWork: Yup.boolean(),
  sundayEntryTime: Yup.string().nullable(),
  sundayPauseTime: Yup.string().nullable(),
  sundayReturnTime: Yup.string().nullable(),
  sundayExitTime: Yup.string().nullable(),
});

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
  const [openModalPhoto, setOpenModalPhoto] = useState<boolean>(false);
  const [photoId, setPhotoId] = useState<number>();
  const [employeeIdSelected, setEmployeeIdSelected] = useState('');
  const [statusJustificationValue, setStatusJustificationValue] =
    useState(null);
  const [dates, setDates] = useState<DatesProps[]>([]);

  const { data: jobs, mutate: getJobs } = useGetJobPositions();
  const { data: contracts, mutate: getContracts } = useGetContracts();
  const { data: sectors, mutate: getSectors } = useGetSectors();
  const { data: fetchedUsers, mutate: getUsers } = useGetUsers();
  const {
    mutateAsync: fetchCertificates,
    isPending: isLoadingCertificatesGet,
  } = useListDocuments();
  const {
    mutateAsync: updateDocument,
    isPending: loadingUpdateDocument,
    isSuccess: isSuccessUpdateDocument,
  } = useUpdateDocument();
  const { mutateAsync: getUserSchedules, data: scheduleData } =
    useGetUserSchedules();

  const TYPE_DOCUMENT_CERTIFICATES = [4, 5];

  const getDaysBetweenDates = (
    startDate: string,
    endDate: string,
  ): { date: string; dayOfWeekPT: string; dayOfWeekEN: string }[] => {
    if (startDate && endDate) {
      console.log('entrou aqyu');
      const start = new Date(startDate);
      const end = new Date(endDate);

      // Normaliza para o início do dia em UTC
      start.setUTCHours(0, 0, 0, 0);
      end.setUTCHours(0, 0, 0, 0);

      const dates: {
        date: string;
        dayOfWeekPT: string;
        dayOfWeekEN: string;
      }[] = [];

      const current = new Date(start);
      while (current <= end) {
        const zonedDate = toZonedTime(current, 'UTC'); // Força timezone UTC

        dates.push({
          date: current.toISOString().split('T')[0],
          dayOfWeekPT: format(zonedDate, 'EEEE', { locale: ptBR }),
          dayOfWeekEN: format(zonedDate, 'EEEE', { locale: enUS }),
        });

        current.setUTCDate(current.getUTCDate() + 1); // Incrementa um dia no UTC
      }

      setDates(dates);
      console.log('saiu aqui');
      return dates;
    }
  };

  // Uso do React Hook para atualizar o estado
  // const handleCalculateDates = () => {
  //   const dates = getDaysBetweenDates('2024-12-01', '2024-12-10');
  //   setDates(dates); // Atualiza o estado em React
  // };

  const createPoint = async ({
    userId,
    pointType,
    datePoint,
    statusJustificationValue,
  }: {
    userId: string;
    pointType: string;
    datePoint: string;
    statusJustificationValue: number;
  }) => {
    await createUserCheckpoint({
      userId: userId,
      checkpointType: pointType,
      timestamp: datePoint,
      status_value: statusJustificationValue,
    });
  };

  const handleSubmit = (values) => {
    dates?.map((day) => {
      formik?.values?.[`${day.dayOfWeekEN?.toLocaleLowerCase()}EntryTime`] !==
        '' &&
        createPoint({
          userId: values.userId,
          pointType: 'entrada',
          datePoint: `${day?.date}T${addHoursToTime(formik?.values?.[`${day.dayOfWeekEN?.toLocaleLowerCase()}EntryTime`], 3)}:00.000Z`,
          statusJustificationValue: statusJustificationValue,
        });
      formik?.values?.[`${day.dayOfWeekEN?.toLocaleLowerCase()}PauseTime`] !==
        '' &&
        createPoint({
          userId: values.userId,
          pointType: 'pausa',
          datePoint: `${day?.date}T${addHoursToTime(formik?.values?.[`${day.dayOfWeekEN?.toLocaleLowerCase()}PauseTime`], 3)}:00.000Z`,
          statusJustificationValue: statusJustificationValue,
        });
      formik?.values?.[`${day.dayOfWeekEN?.toLocaleLowerCase()}ReturnTime`] !==
        '' &&
        createPoint({
          userId: values.userId,
          pointType: 'retorno',
          datePoint: `${day?.date}T${addHoursToTime(formik?.values?.[`${day.dayOfWeekEN?.toLocaleLowerCase()}ReturnTime`], 3)}:00.000Z`,
          statusJustificationValue: statusJustificationValue,
        });
      formik?.values?.[`${day.dayOfWeekEN?.toLocaleLowerCase()}ExitTime`] !==
        '' &&
        createPoint({
          userId: values.userId,
          pointType: 'saída',
          datePoint: `${day?.date}T${addHoursToTime(formik?.values?.[`${day.dayOfWeekEN?.toLocaleLowerCase()}ExitTime`], 3)}:00.000Z`,
          statusJustificationValue: statusJustificationValue,
        });
    });
  };

  const formik = useFormik({
    initialValues: {
      userId: scheduleData?.[0]?.userId ?? '',
      mondayWork: scheduleData?.[0]?.mondayWork ?? '',
      mondayEntryTime: scheduleData?.[0]?.mondayEntryTime ?? '',
      mondayPauseTime: scheduleData?.[0]?.mondayPauseTime ?? '',
      mondayReturnTime: scheduleData?.[0]?.mondayReturnTime ?? '',
      mondayExitTime: scheduleData?.[0]?.mondayExitTime ?? '',
      tuesdayWork: scheduleData?.[0]?.tuesdayWork ?? '',
      tuesdayEntryTime: scheduleData?.[0]?.tuesdayEntryTime ?? '',
      tuesdayPauseTime: scheduleData?.[0]?.tuesdayPauseTime ?? '',
      tuesdayReturnTime: scheduleData?.[0]?.tuesdayReturnTime ?? '',
      tuesdayExitTime: scheduleData?.[0]?.tuesdayExitTime ?? '',
      wednesdayWork: scheduleData?.[0]?.wednesdayWork ?? '',
      wednesdayEntryTime: scheduleData?.[0]?.wednesdayEntryTime ?? '',
      wednesdayPauseTime: scheduleData?.[0]?.wednesdayPauseTime ?? '',
      wednesdayReturnTime: scheduleData?.[0]?.wednesdayReturnTime ?? '',
      wednesdayExitTime: scheduleData?.[0]?.wednesdayExitTime ?? '',
      thursdayWork: scheduleData?.[0]?.thursdayWork ?? '',
      thursdayEntryTime: scheduleData?.[0]?.thursdayEntryTime ?? '',
      thursdayPauseTime: scheduleData?.[0]?.thursdayPauseTime ?? '',
      thursdayReturnTime: scheduleData?.[0]?.thursdayReturnTime ?? '',
      thursdayExitTime: scheduleData?.[0]?.thursdayExitTime ?? '',
      fridayWork: scheduleData?.[0]?.fridayWork ?? '',
      fridayEntryTime: scheduleData?.[0]?.fridayEntryTime ?? '',
      fridayPauseTime: scheduleData?.[0]?.fridayPauseTime ?? '',
      fridayReturnTime: scheduleData?.[0]?.fridayReturnTime ?? '',
      fridayExitTime: scheduleData?.[0]?.fridayExitTime ?? '',
      saturdayWork: scheduleData?.[0]?.saturdayWork,
      saturdayEntryTime: scheduleData?.[0]?.saturdayEntryTime ?? '',
      saturdayPauseTime: scheduleData?.[0]?.saturdayPauseTime ?? '',
      saturdayReturnTime: scheduleData?.[0]?.saturdayReturnTime ?? '',
      saturdayExitTime: scheduleData?.[0]?.saturdayExitTime ?? '',
      sundayWork: scheduleData?.[0]?.sundayWork ?? '',
      sundayEntryTime: scheduleData?.[0]?.sundayEntryTime ?? '',
      sundayPauseTime: scheduleData?.[0]?.sundayPauseTime ?? '',
      sundayReturnTime: scheduleData?.[0]?.sundayReturnTime ?? '',
      sundayExitTime: scheduleData?.[0]?.sundayExitTime ?? '',
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const handleDateFilter = (dateRange: {
    startDate: number | null;
    endDate: number | null;
  }) => {
    setSelectedDateRange(dateRange);
  };

  const handleOpenModalPhoto = (photoId: number) => {
    setOpenModalPhoto(true);
    setPhotoId(photoId);
  };

  const handleCloseModalPhoto = () => {
    setOpenModalPhoto(false);
    setPhotoId(null);
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
      openModalPhoto,
      photoId,
      handleOpenModalPhoto,
      handleCloseModalPhoto,
      employeeIdSelected,
      setEmployeeIdSelected,
      formik,
      getDaysBetweenDates,
      getUserSchedules,
      dates,
      statusJustificationValue,
      setStatusJustificationValue,
      scheduleData,
      isLoadingCertificatesGet,
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
      openModalPhoto,
      photoId,
      handleOpenModalPhoto,
      handleCloseModalPhoto,
      employeeIdSelected,
      setEmployeeIdSelected,
      formik,
      getDaysBetweenDates,
      getUserSchedules,
      dates,
      statusJustificationValue,
      setStatusJustificationValue,
      scheduleData,
      isLoadingCertificatesGet,
    ],
  );

  return (
    <CertificatesContext.Provider value={value}>
      {children}
    </CertificatesContext.Provider>
  );
};
