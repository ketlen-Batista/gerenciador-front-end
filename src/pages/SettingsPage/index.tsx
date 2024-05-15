import React from 'react';
import TableSettings from './TableSettings';
import * as S from './styles';

const SettingsPage: React.FC = () => {
  return (
    <div>
      <S.ContainerButtonsAndTitles>
        <S.ContainerTitles>
          <S.Title>Setores e Seções</S.Title>
          <S.SubTitle>Lista de Seções</S.SubTitle>
        </S.ContainerTitles>

        <S.ContainerButton>
          <S.Button>Todos</S.Button>
          <S.Button>Saúde</S.Button>
          <S.Button>Educação</S.Button>
          <S.Button>TJ-SP</S.Button>
        </S.ContainerButton>
      </S.ContainerButtonsAndTitles>

      {/* TABELA DE CONFIGURAÇÕES */}
      <TableSettings />
    </div>
  );
};

export default SettingsPage;
