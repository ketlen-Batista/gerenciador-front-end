//PÁGINA FUNCIONARIOS
import React from 'react';

import PostAddRoundedIcon from '@material-ui/icons/PostAddRounded';
import DefaultPage from '@templates/DefaultPage';

import Filters from './Filters';
import TableDocuments from './TableDocuments';

import * as S from './styles';

function DocumentsPage() {
  const classes = S.useStyles();
  return (
    <DefaultPage pageTitle="Documentos">
      <Filters />
      <S.ContainerButtonAndTitle>
        <S.SubTitle>Lista de Documentos</S.SubTitle>
        <S.ContainerButton>
          <S.ButtonAdd
            variant="contained"
            color="primary"
            disableRipple
            className={classes.button}
            startIcon={<PostAddRoundedIcon />}
            title="Enviar Documentos"
          >
            Enviar Documentos
          </S.ButtonAdd>{' '}
        </S.ContainerButton>
      </S.ContainerButtonAndTitle>

      {/* TABELA */}
      <TableDocuments />
    </DefaultPage>
  );
}

export default DocumentsPage;
