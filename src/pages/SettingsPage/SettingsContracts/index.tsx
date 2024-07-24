import React, { useState } from 'react';

import { Grid } from '@material-ui/core';
import { useGetContracts } from '@src/services/contractsService/queries';
import { basicNames, setores } from '@src/utils/constants';

import ModalContracts from './ModalContracts';
import Table from './Table';

import * as S from '../styles';

const SettingsContracts = () => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const handleCloseModal = () => {
    setOpenDialog(false);
  };

  const handleOpenModal = () => {
    setOpenDialog(true);
  };

  const {
    data: contracts,
    mutate: getContracts,
    isPending,
  } = useGetContracts();

  return (
    <div>
      <S.Container>
        <S.ContainerTitles>
          <S.Title>{`${basicNames.sector.plural}`}</S.Title>
          {/* <S.SubTitle>Lista de seções</S.SubTitle> */}
        </S.ContainerTitles>
      </S.Container>
      <Grid container>
        <Grid item xs={8}>
          <Table
            contracts={contracts}
            getContracts={getContracts}
            isPending={isPending}
          />
        </Grid>
        <Grid item xs={4}>
          {' '}
          <S.ContainerButtonsAdd>
            <S.ButtonClick
              onClick={handleOpenModal}
            >{`+Adicionar ${basicNames.sector.singular}`}</S.ButtonClick>
          </S.ContainerButtonsAdd>
        </Grid>
      </Grid>

      {openDialog && (
        <ModalContracts
          openDialog={openDialog}
          handleClose={handleCloseModal}
          getContracts={getContracts}
        />
      )}
    </div>
  );
};

export default SettingsContracts;
