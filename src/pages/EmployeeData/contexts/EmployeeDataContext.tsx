import React, { ReactNode, createContext, useContext, useMemo } from 'react';

import {
  useGetUser,
  useRegisterUser,
  useUpdateUser,
} from '@src/services/users/queries';
import { AxiosError } from 'axios';
import { useFormik } from 'formik';
import { UseMutateFunction } from 'react-query';
import * as Yup from 'yup';

interface GetUser {
  userId: string;
}

interface User {
  user: {
    id: string;
    name: string;
    email: string;
    phone: string;
    cpf: string;
    address: string;
    registration: string;
    dateOfBirth: string;
    status: string;
    jobPosition_id: number;
    role: string;
    created_at: string;
    contracts_value: number;
    sector_value: number;
    documents_id: number;
    photo_avatar_id: number;
    photo: {
      id: number;
      photoFile: {
        id: number;
        type: string;
        data: number[];
      };
    };
  };
}

interface EmployeeDataContextType {
  formik: any;
  user: User;
  getUser: UseMutateFunction<any, AxiosError<unknown, any>, GetUser, unknown>;
  isLoadingUser: boolean;
}

const EmployeeDataContext = createContext<EmployeeDataContextType>(
  {} as EmployeeDataContextType,
);

export const useEmployeeData = () => {
  const context = useContext(EmployeeDataContext);
  if (!context) {
    throw new Error(
      'useDocumentsFilter must be used within a DocumentsFilterProvider',
    );
  }
  return context;
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Nome é obrigatório'),
  email: Yup.string().email('Email inválido'),
  phone: Yup.string(),
  cpf: Yup.string().max(14, 'CPF inválido').required('CPF é obrigatório'),
  address: Yup.string(),
  registration: Yup.string()
    .min(6, 'Quantidade mínima de 6 dígitos')
    .required('Matrícula é obrigatória'),
  dateOfBirth: Yup.string(),
  jobPosition_id: Yup.number().nullable(),
  contracts_value: Yup.number().nullable(),
  sector_value: Yup.number().nullable(),
});

export const EmployeeDataProvider = ({ children }) => {
  const { mutate: registerUser } = useRegisterUser();
  const { mutate: updateUser } = useUpdateUser();
  const {
    data: user,
    mutate: getUser,
    isPending: isLoadingUser,
  } = useGetUser();

  const formik = useFormik({
    initialValues: {
      id: user?.user?.id || '',
      name: user?.user?.name || '',
      email: user?.user?.email || '',
      phone: user?.user?.phone || '',
      cpf: user?.user?.cpf || '',
      address: user?.user?.address || '',
      registration: user?.user?.registration || '',
      dateOfBirth: user?.user?.dateOfBirth || '',
      jobPosition_id: user?.user?.jobPosition_id || null,
      office: user?.user?.office || '',
      status: user?.user?.status || '',
      contracts_value: user?.user?.contracts_value || null,
      sector_value: user?.user?.sector_value || null,
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: (values) => {
      console.log('Form data:', values);
      // handle form submission
      if (values.id) {
        updateUser({
          id: values.id,
          name: values.name,
          email: values.email,
          phone: values.phone,
          cpf: values.cpf,
          address: values.address,
          registration: values.registration,
          dateOfBirth: values.dateOfBirth,
          jobPosition_id: values.jobPosition_id,
          status: values.status,
          contracts_value: values.contracts_value,
          sector_value: values.sector_value,
        });
        return;
      }

      registerUser({
        name: values.name,
        email: values.email,
        phone: values.phone,
        cpf: values.cpf,
        address: values.address,
        registration: values.registration,
        dateOfBirth: values.dateOfBirth,
        jobPosition_id: values.jobPosition_id,
        status: values.status,
        contracts_value: values.contracts_value,
        sector_value: values.sector_value,
        password: values.registration,
      });
    },
  });

  const value = useMemo(
    () => ({
      formik,
      user,
      getUser,
      isLoadingUser,
    }),
    [formik, user, getUser, isLoadingUser],
  );

  return (
    <EmployeeDataContext.Provider value={value}>
      {children}
    </EmployeeDataContext.Provider>
  );
};
