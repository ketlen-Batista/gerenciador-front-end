import React, { useState } from 'react';

import { Grid } from '@mui/material';
import { useGetStatus } from '@src/services/status/queries';

import ModalStatus from './ModalStatus';
import Table from './Table';

import * as S from '../styles';

const Status = () => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const { data: status, mutate: getStatuss, isPending } = useGetStatus();

  const handleCloseModal = () => {
    setOpenDialog(false);
  };

  const handleOpenModal = () => {
    setOpenDialog(true);
  };

  return (
    <div>
      <S.Container>
        <S.ContainerTitles>
          <S.Title>Cargos</S.Title>
        </S.ContainerTitles>
      </S.Container>
      <Grid container spacing={4} display="flex" justifyContent="space-between">
        <Grid item xs={5}>
          <Table
            status={status}
            getStatuss={getStatuss}
            isPending={isPending}
          />
        </Grid>
        <Grid item xs={4}>
          {' '}
          <S.ContainerButtonsAdd>
            <S.ButtonClick onClick={handleOpenModal}>
              +Adicionar Cargo
            </S.ButtonClick>
          </S.ContainerButtonsAdd>
        </Grid>
      </Grid>

      {openDialog && (
        <ModalStatus
          openDialog={openDialog}
          handleClose={handleCloseModal}
          getStatuss={getStatuss}
        />
      )}
    </div>
  );
};

export default Status;
