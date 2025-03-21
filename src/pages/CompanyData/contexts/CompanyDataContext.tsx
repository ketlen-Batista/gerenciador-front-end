import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
} from 'react';

import useSnackbar from '@src/hooks/useSnackbar';
import {
  useGetCompany,
  useRegisterCompany,
  useUpdateCompany,
} from '@src/services/companyService/queries';
import { useFormik } from 'formik';
import * as Yup from 'yup';

interface Company {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  registrationNumber: string;
}

interface CompanyDataContextType {
  formik: any;
  company: Company;
  getCompany: () => void;
  isLoadingCompany: boolean;
}

const CompanyDataContext = createContext<CompanyDataContextType>(
  {} as CompanyDataContextType,
);

export const useCompanyData = () => {
  const context = useContext(CompanyDataContext);
  if (!context) {
    throw new Error('useCompanyData must be used within a CompanyDataProvider');
  }
  return context;
};

const validationSchema = Yup.object().shape({
  id: Yup.number().optional(),
  name: Yup.string().required('Nome é obrigatório'),
  address: Yup.string().optional(),
  phone: Yup.string().optional(),
  email: Yup.string().email('Email inválido').optional(),
  registrationNumber: Yup.string().optional(),
  website: Yup.string().optional(),
  emailPassword: Yup.string().optional(),
});

export const CompanyDataProvider = ({ children }: { children: ReactNode }) => {
  const { showSnackbar } = useSnackbar();
  const { mutate: registerCompany, isSuccess: isSuccessRegister } =
    useRegisterCompany();
  const { mutate: updateCompany, isSuccess: isSuccessUpdate } =
    useUpdateCompany();
  const {
    data: company,
    mutateAsync: getCompanyMutation,
    isPending: isLoadingCompany,
  } = useGetCompany();

  // Memoize getCompany to prevent unnecessary re-renders
  const getCompany = () => {
    getCompanyMutation({});
  };

  const formik = useFormik({
    initialValues: {
      id: company?.id || '',
      name: company?.name || '',
      address: company?.address || '',
      phone: company?.phone || '',
      email: company?.email || '',
      registrationNumber: company?.registrationNumber || '',
      website: company?.website || '',
      emailPassword: company?.emailPassword || '',
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: (values) => {
      if (values.id) {
        updateCompany(values);
      } else {
        registerCompany(values);
      }
    },
  });

  useEffect(() => {
    if (isSuccessRegister || isSuccessUpdate) {
      showSnackbar({
        message: `${isSuccessUpdate ? 'Atualização feita com sucesso.' : 'Empresa criada com sucesso.'}`,
        type: 'success',
      });
    }
  }, [isSuccessRegister, isSuccessUpdate, showSnackbar]);

  const value = useMemo(
    () => ({
      formik,
      company,
      getCompany,
      isLoadingCompany,
    }),
    [formik, company, getCompany, isLoadingCompany],
  );

  return (
    <CompanyDataContext.Provider value={value}>
      {children}
    </CompanyDataContext.Provider>
  );
};
