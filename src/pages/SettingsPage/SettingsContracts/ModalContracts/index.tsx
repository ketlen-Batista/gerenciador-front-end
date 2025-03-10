import React, { useEffect } from 'react';

import { Box } from '@mui/material';
import {
  useCreateContract,
  useUpdateContract,
} from '@src/services/contractsService/queries';
import { formatDateDayMonthAndYear } from '@src/utils/dates';
import { UseMutateFunction } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import Button from '@src/components/ButtonCustom';
import CircularProgress from '@src/components/CircularProgress';
import FullScreenDialog from '@src/components/FullScreenDialog';
import Select from '@src/components/Select';
import TextField from '@src/components/TextField';

interface ModalContractsProps {
  openDialog: boolean;
  handleClose: () => void;
  contractName?: string;
  contractId?: number;
  getContracts?: UseMutateFunction<
    any,
    AxiosError<unknown, any>,
    unknown,
    unknown
  >;
  contractValidity?: string;
  contractStatus?: string;
}

const ModalContracts = ({
  openDialog,
  handleClose,
  contractName,
  contractId,
  getContracts,
  contractValidity,
  contractStatus,
}: ModalContractsProps) => {
  const {
    mutateAsync: createContract,
    isSuccess,
    isPending,
  } = useCreateContract();
  const {
    mutateAsync: updateContract,
    isSuccess: isSuccessUpdate,
    isPending: isPendingUpdate,
  } = useUpdateContract();

  const statusOptions = [
    { name: 'Inativo', value: 'Inativo' },
    { name: 'Ativo', value: 'Ativo' },
    { name: 'Pausado', value: 'Pausado' },
    { name: 'Expirado', value: 'Expirado' },
    { name: 'Cancelado', value: 'Cancelado' },
  ];

  const formik = useFormik({
    initialValues: {
      name: contractName ?? '',
      status: contractStatus,
      validity: contractValidity ?? new Date().toDateString(), // Adicione outros campos conforme necessário
    },
    validationSchema: Yup.object({
      name: Yup.string().required('O nome do contrato é obrigatório'),
      status: Yup.string().optional(),
      validity: Yup.string().optional(),
    }),
    onSubmit: (values) => {
      if (contractId || contractName) {
        updateContract({ id: contractId, ...values });
      } else {
        createContract(values);
      }
    },
  });
  console.log('FORMIK4', formik);
  useEffect(() => {
    if (isSuccess || isSuccessUpdate) {
      handleClose();
      getContracts({});
    }
  }, [isSuccess, isSuccessUpdate]);

  return (
    <FullScreenDialog
      open={openDialog}
      onClose={handleClose}
      maxWidth={'md'}
      closeButtonPosition={'right'}
      title={
        contractId || contractName ? 'Editar Contrato' : 'Adicionar Contrato'
      }
      fullWidth
      extraFooterComponent={
        <Box display="flex" justifyContent="flex-end" width="100%">
          <Button
            onClick={() => formik.handleSubmit()}
            disabled={!formik.isValid || isPending || isPendingUpdate}
          >
            {isPending || isPendingUpdate ? (
              <CircularProgress size="small" color="primary" />
            ) : (
              'Salvar'
            )}
          </Button>
        </Box>
      }
    >
      <Box
        display="flex"
        height="200px"
        alignItems="center"
        flexDirection={'column'}
        gap={2}
        mx={5}
        my={5}
      >
        <TextField
          label="Nome do contrato"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
          fullWidth
        />

        <TextField
          label="Vigência"
          name="validity"
          type="date"
          value={formik.values.validity}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.validity && Boolean(formik.errors.validity)}
          helperText={formik.touched.validity && formik.errors.validity}
          fullWidth
        />

        <Select
          label="Status"
          options={statusOptions || []}
          name="status"
          value={formik.values.status}
          onChange={(e) => formik.setFieldValue('status', e.value)}
          onBlur={formik.handleBlur}
          error={formik.touched.status && Boolean(formik.errors.status)}
          fullWidth
          clearable
        />
      </Box>
    </FullScreenDialog>
  );
};

export default ModalContracts;
