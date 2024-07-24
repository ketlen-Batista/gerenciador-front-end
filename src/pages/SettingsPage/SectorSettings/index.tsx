import React, { useState } from 'react';

import { Grid } from '@material-ui/core';
import { useGetSectors } from '@src/services/sectorService/queries';
import { basicNames } from '@src/utils/constants';

import ModalSectors from './ModalSectors';
import Table from './Table';

import * as S from '../styles';

const SectorSettings = () => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const handleCloseModal = () => {
    setOpenDialog(false);
  };

  const handleOpenModal = () => {
    setOpenDialog(true);
  };

  const { data: sectors, mutate: getSectors, isPending } = useGetSectors();

  return (
    <div>
      <S.Container>
        <S.ContainerTitles>
          <S.Title>{`${basicNames.section.plural}`}</S.Title>
          {/* <S.SubTitle>Lista de seções</S.SubTitle> */}
        </S.ContainerTitles>
        {/* <S.ContainerButtons>
          <Box display="flex" flexDirection="row" justifyContent="flex-end">
            {setores?.map((item) => (
              <ButtonFilter key={item.value} textButton={item.name} />
            ))}
          </Box>
        </S.ContainerButtons> */}
      </S.Container>
      <Grid container>
        <Grid item xs={8}>
          <Table
            isPending={isPending}
            sectors={sectors}
            getSectors={getSectors}
          />
        </Grid>
        <Grid item xs={4}>
          {' '}
          <S.ContainerButtonsAdd>
            <S.ButtonClick
              onClick={handleOpenModal}
            >{`+Adicionar ${basicNames.section.singular}`}</S.ButtonClick>
          </S.ContainerButtonsAdd>
        </Grid>
      </Grid>
      {openDialog && (
        <ModalSectors
          openDialog={openDialog}
          handleClose={handleCloseModal}
          getSectors={getSectors}
        />
      )}
    </div>
  );
};

export default SectorSettings;
