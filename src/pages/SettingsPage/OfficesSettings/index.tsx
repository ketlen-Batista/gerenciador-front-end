import React from 'react';

import { Grid } from '@material-ui/core';

import TableSettings from '../TableSettings';

import * as S from '../styles';

const OfficesSettings = () => {
  return (
    <div>
      <S.Container>
        <S.ContainerTitles>
          <S.Title>Cargos</S.Title>
          <S.SubTitle>Lista de cargos</S.SubTitle>
        </S.ContainerTitles>
        <S.ContainerButtons>
          <S.ButtonClick>Todos</S.ButtonClick>
          <S.ButtonClick>Saúde</S.ButtonClick>
          <S.ButtonClick>Educação</S.ButtonClick>
          <S.ButtonClick>TJ_SP</S.ButtonClick>
        </S.ContainerButtons>
      </S.Container>
      <Grid container>
        <Grid item xs={8}>
          <TableSettings />
        </Grid>
        <Grid item xs={4}>
          {' '}
          <S.ContainerButtonsAdd>
            <S.ButtonClick>+Adicionar Setor</S.ButtonClick>
            <S.ButtonClick>+Adicionar Seção</S.ButtonClick>
          </S.ContainerButtonsAdd>
        </Grid>
      </Grid>
    </div>
  );
};

export default OfficesSettings;
