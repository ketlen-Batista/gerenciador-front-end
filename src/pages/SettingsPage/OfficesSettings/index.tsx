import React from 'react';

import { Grid } from '@material-ui/core';

import Table from './Table';

import * as S from '../styles';

const OfficesSettings = () => {
  return (
    <div>
      <S.Container>
        <S.ContainerTitles>
          <S.Title>Cargos</S.Title>
          {/* <S.SubTitle>Lista de cargos</S.SubTitle> */}
        </S.ContainerTitles>
      </S.Container>
      <Grid container>
        <Grid item xs={8}>
          <Table />
        </Grid>
        <Grid item xs={4}>
          {' '}
          <S.ContainerButtonsAdd>
            <S.ButtonClick>+Adicionar Cargo</S.ButtonClick>
          </S.ContainerButtonsAdd>
        </Grid>
      </Grid>
    </div>
  );
};

export default OfficesSettings;
