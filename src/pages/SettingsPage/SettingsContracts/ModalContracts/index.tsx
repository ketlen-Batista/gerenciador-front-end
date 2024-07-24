import React, { useEffect, useState } from 'react';

import { Box } from '@mui/material';
import {
  useCreateContract,
  useUpdateContract,
} from '@src/services/contractsService/queries';
import { UseMutateFunction } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import Button from '@src/components/Button';
import CircularProgress from '@src/components/CircularProgress';
import FullScreenDialog from '@src/components/FullScreenDialog';
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
}

const ModalContracts = ({
  openDialog,
  handleClose,
  contractName,
  contractId,
  getContracts,
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
  const [name, setName] = useState(contractName ?? '');

  const handleCreateOrUpdateContract = () => {
    if (contractId || contractName) {
      updateContract({
        id: contractId,
        name: name,
      });
      return;
    }
    createContract({
      name: name,
    });
  };

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
            onClick={handleCreateOrUpdateContract}
            disabled={!name || isPending || isPendingUpdate}
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
        mx={5}

        // flexDirection="row" justifyContent="space-around"
      >
        <TextField
          label="Nome do contrato"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
        />
      </Box>
    </FullScreenDialog>
  );
};

export default ModalContracts;
