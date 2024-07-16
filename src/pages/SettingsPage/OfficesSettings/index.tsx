import React, { useState } from 'react';

import { Grid } from '@mui/material';
import { useGetJobPositions } from '@src/services/jobPositions/queries';

import ModalJob from './ModalJob';
import Table from './Table';

import * as S from '../styles';

const OfficesSettings = () => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const { data: jobs, mutate: getJobs, isPending } = useGetJobPositions();

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
          {/* <S.SubTitle>Lista de cargos</S.SubTitle> */}
        </S.ContainerTitles>
      </S.Container>
      <Grid container spacing={4} display="flex" justifyContent="space-between">
        <Grid item xs={5}>
          <Table jobs={jobs} getJobs={getJobs} isPending={isPending} />
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
        <ModalJob
          openDialog={openDialog}
          handleClose={handleCloseModal}
          getJobs={getJobs}
        />
      )}
    </div>
  );
};

export default OfficesSettings;
