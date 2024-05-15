import React from 'react';

import DefaultPage from '@templates/DefaultPage';

import TableSettings from './TableSettings';

import * as S from './styles';

const SettingsPage = () => {
  return (
    <DefaultPage pageTitle="Configurações">
      <div>
        <S.Container>
          <S.ContainerTitles>
            <S.Title>Setores e Seções</S.Title>
            <S.SubTitle>Lista de seções</S.SubTitle>
          </S.ContainerTitles>
          <S.ContainerButtons>
            <S.ButtonClick>Todos</S.ButtonClick>
            <S.ButtonClick>Saúde</S.ButtonClick>
            <S.ButtonClick>Educação</S.ButtonClick>
            <S.ButtonClick>TJ_SP</S.ButtonClick>
          </S.ContainerButtons>
        </S.Container>
        <TableSettings />
      </div>
    </DefaultPage>
  );
};

export default SettingsPage;
