import React, { createContext, useContext, useEffect, useMemo } from 'react';

import useSnackbar from '@src/hooks/useSnackbar';
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

// interface User {
//   user: {
//     id: string;
//     name: string;
//     email: string;
//     phone: string;
//     cpf: string;
//     address: string;
//     registration: string;
//     dateOfBirth: string;
//     status: string;
//     jobPosition_id: number;
//     role: string;
//     created_at: string;
//     contracts_value: number;
//     sector_value: number;
//     documents_id: number;
//     photo_avatar_id: number;
//     photo: {
//       id: number;
//       photoFile: {
//         id: number;
//         type: string;
//         data: number[];
//       };
//     };
//   };
// }

interface User {
  user: any;
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
  name: Yup.string().required('Nome é obrigatório').optional(),
  email: Yup.string().email('Email inválido').optional(),
  phone: Yup.string().optional(),
  cpf: Yup.string().max(14, 'CPF inválido').required('CPF é obrigatório'),
  address: Yup.string().optional(),
  cep: Yup.string().optional(),
  emergencyContact: Yup.string().optional(),
  city: Yup.string().optional(),
  state: Yup.string().optional(),
  guardian: Yup.string().optional(),
  registration: Yup.string()
    .min(6, 'Quantidade mínima de 6 dígitos')
    .required('Matrícula é obrigatória'),
  dateOfBirth: Yup.string().optional(),
  jobPosition_id: Yup.number().nullable().optional(),
  contracts_value: Yup.number().nullable().optional(),
  sector_value: Yup.number().nullable().optional(),
});

export const EmployeeDataProvider = ({ children }) => {
  const { showSnackbar } = useSnackbar();
  const { mutate: registerUser, isSuccess: isSuccessRegister } =
    useRegisterUser();
  const { mutate: updateUser, isSuccess: isSuccessUpdate } = useUpdateUser();
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
      cep: user?.user?.cep || '',
      emergencyContact: user?.user?.emergencyContact || '',
      city: user?.user?.city || '',
      state: user?.user?.state || '',
      guardian: user?.user?.guardian || '',
      supervisor: user?.user?.supervisor || '',
      registration: user?.user?.registration || '',
      dateOfBirth: user?.user?.dateOfBirth || '',
      jobPosition_id: user?.user?.jobPosition_id || null,
      status_value: user?.user?.status_value || null,
      contracts_value: user?.user?.contracts_value || null,
      sector_value: user?.user?.sector_value || null,
      photo_avatar_id: user?.user?.photo_avatar_id || null,
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      name: Yup.string().required('o nome é requerido'),
      email: Yup.string()
        .email('Invalid email')
        .required('o email é requerido'),
      phone: Yup.string().optional(),
      cpf: Yup.string().required('o cpf é requerido'),
      address: Yup.string().optional(),
      cep: Yup.string().optional(),
      emergencyContact: Yup.string().optional(),
      city: Yup.string().optional(),
      state: Yup.string().optional(),
      guardian: Yup.string().optional(),
      supervisor: Yup.string().optional(),
      registration: Yup.string().optional(),
      dateOfBirth: Yup.string().optional(),
      jobPosition_id: Yup.number().nullable().required('o cargo é requerido'),
      status_value: Yup.number().nullable().required('o status é requerido'),
      contracts_value: Yup.number()
        .nullable()
        .required('o contrato é requerido'),
      sector_value: Yup.number().nullable().required('o setor é requerido'),
      photo_avatar_id: Yup.number().nullable().optional(),
    }),
    onSubmit: (values) => {
      if (values.id) {
        updateUser({
          id: values.id,
          name: values.name,
          email: values.email,
          phone: values.phone,
          cpf: values.cpf.replace(/\D/g, ''),
          address: values.address,
          cep: values.cep,
          emergencyContact: values.emergencyContact,
          city: values.city,
          state: values.state,
          guardian: values.guardian,
          supervisor: values.supervisor,
          registration: values.registration,
          dateOfBirth: values.dateOfBirth,
          jobPosition_id: values.jobPosition_id,
          status_value: values.status_value ?? null,
          contracts_value: values.contracts_value,
          sector_value: values.sector_value,
          photo_avatar_id: values.photo_avatar_id ?? undefined,
          // password: values.cpf.replace(/\D/g, ''),
        });
        return;
      }

      registerUser({
        name: values.name,
        email: values.email,
        phone: values.phone,
        cpf: values.cpf.replace(/\D/g, ''),
        address: values.address,
        cep: values.cep,
        emergencyContact: values.emergencyContact,
        city: values.city,
        state: values.state,
        guardian: values.guardian,
        supervisor: values.supervisor,
        registration: values.registration,
        dateOfBirth: values.dateOfBirth,
        jobPosition_id: values.jobPosition_id,
        status_value: values.status_value,
        contracts_value: values.contracts_value,
        sector_value: values.sector_value,
        password: values.cpf.replace(/\D/g, ''),
        photo_avatar_id: values.photo_avatar_id,
      });
    },
  });

  useEffect(() => {
    if (isSuccessRegister || isSuccessUpdate) {
      showSnackbar({
        message: `${isSuccessUpdate ? 'Atualização feita com sucesso.' : 'Usuário criado com sucesso.'}`,
        type: 'success',
      });
    }
  }, [isSuccessRegister, isSuccessUpdate]);

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
