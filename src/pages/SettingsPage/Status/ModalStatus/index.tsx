import React, { useEffect, useState } from 'react';

import { Box } from '@mui/material';
import { useCreateStatus, useUpdateStatus } from '@src/services/status/queries';
import { UseMutateFunction } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import Button from '@src/components/Button';
import CircularProgress from '@src/components/CircularProgress';
import FullScreenDialog from '@src/components/FullScreenDialog';
import TextField from '@src/components/TextField';

interface ModalStatusProps {
  openDialog: boolean;
  handleClose: () => void;
  statusName?: string;
  statusId?: number;
  getStatuss?: UseMutateFunction<
    any,
    AxiosError<unknown, any>,
    unknown,
    unknown
  >;
}

const ModalStatus = ({
  openDialog,
  handleClose,
  statusName,
  statusId,
  getStatuss,
}: ModalStatusProps) => {
  const { mutateAsync: createStatus, isSuccess, isPending } = useCreateStatus();
  const {
    mutateAsync: updateStatus,
    isSuccess: isSuccessUpdate,
    isPending: isPendingUpdate,
  } = useUpdateStatus();
  const [name, setName] = useState(statusName ?? '');

  const handleCreateOrUpdateStatus = () => {
    if (statusId || statusName) {
      updateStatus({
        id: statusId,
        name: name,
        value: statusId,
      });
      return;
    }
    createStatus({
      name: name,
    });
  };

  useEffect(() => {
    if (isSuccess || isSuccessUpdate) {
      handleClose();
      getStatuss({});
    }
  }, [isSuccess, isSuccessUpdate]);

  return (
    <FullScreenDialog
      open={openDialog}
      onClose={handleClose}
      maxWidth={'md'}
      closeButtonPosition={'right'}
      title={statusId || statusName ? 'Editar Status' : 'Adicionar Status'}
      fullWidth
      extraFooterComponent={
        <Box display="flex" justifyContent="flex-end" width="100%">
          <Button
            onClick={handleCreateOrUpdateStatus}
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
      <Box display="flex" height="200px" alignItems="center" mx={5}>
        <TextField
          label="Nome do status"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
        />
      </Box>
    </FullScreenDialog>
  );
};

export default ModalStatus;
