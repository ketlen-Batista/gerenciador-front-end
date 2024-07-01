import React from 'react';

import { Grid } from '@material-ui/core';
import { Box } from '@mui/material';
import { basicNames, setores } from '@src/utils/constants';

import ButtonFilter from '@src/components/ButtonFilter';

import Table from './Table';

import * as S from '../styles';

const SectorSettings = () => {
  return (
    <div>
      <S.Container>
        <S.ContainerTitles>
          <S.Title>{`${basicNames.sector.plural} e ${basicNames.section.plural}`}</S.Title>
          {/* <S.SubTitle>Lista de seções</S.SubTitle> */}
        </S.ContainerTitles>
        <S.ContainerButtons>
          <Box display="flex" flexDirection="row" justifyContent="flex-end">
            {setores?.map((item) => (
              <ButtonFilter key={item.value} textButton={item.name} />
            ))}
          </Box>
        </S.ContainerButtons>
      </S.Container>
      <Grid container>
        <Grid item xs={8}>
          <Table />
        </Grid>
        <Grid item xs={4}>
          {' '}
          <S.ContainerButtonsAdd>
            <S.ButtonClick>{`+Adicionar ${basicNames.sector.singular}`}</S.ButtonClick>
            <S.ButtonClick>{`+Adicionar ${basicNames.section.singular}`}</S.ButtonClick>
          </S.ContainerButtonsAdd>
        </Grid>
      </Grid>
    </div>
  );
};

export default SectorSettings;
