import React, { useEffect, useState } from 'react';

import { Box } from '@mui/material';
import {
  useCreateJobPosition,
  useUpdateJobPosition,
} from '@src/services/jobPositions/queries';
import { UseMutateFunction } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import Button from '@src/components/Button';
import CircularProgress from '@src/components/CircularProgress';
import FullScreenDialog from '@src/components/FullScreenDialog';
import TextField from '@src/components/TextField';

interface ModalJobProps {
  openDialog: boolean;
  handleClose: () => void;
  jobName?: string;
  jobId?: number;
  getJobs?: UseMutateFunction<any, AxiosError<unknown, any>, unknown, unknown>;
}

const ModalJob = ({
  openDialog,
  handleClose,
  jobName,
  jobId,
  getJobs,
}: ModalJobProps) => {
  const {
    mutateAsync: createJob,
    isSuccess,
    isPending,
  } = useCreateJobPosition();
  const {
    mutateAsync: updateJob,
    isSuccess: isSuccessUpdate,
    isPending: isPendingUpdate,
  } = useUpdateJobPosition();
  const [name, setName] = useState(jobName ?? '');

  const handleCreateOrUpdateJob = () => {
    if (jobId || jobName) {
      updateJob({
        id: jobId,
        name: name,
      });
      return;
    }
    createJob({
      name: name,
    });
  };

  useEffect(() => {
    if (isSuccess || isSuccessUpdate) {
      handleClose();
      getJobs({});
    }
  }, [isSuccess, isSuccessUpdate]);

  return (
    <FullScreenDialog
      open={openDialog}
      onClose={handleClose}
      maxWidth={'md'}
      closeButtonPosition={'right'}
      title={jobId || jobName ? 'Editar Cargo' : 'Adicionar Cargo'}
      fullWidth
      extraFooterComponent={
        <Box display="flex" justifyContent="flex-end" width="100%">
          <Button
            onClick={handleCreateOrUpdateJob}
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
          label="Nome do cargo"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
        />
      </Box>
    </FullScreenDialog>
  );
};

export default ModalJob;
