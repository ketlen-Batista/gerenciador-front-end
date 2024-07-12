import React, { useEffect, useState } from 'react';

import PostAddRoundedIcon from '@material-ui/icons/PostAddRounded';
import { DocumentsFilterProvider } from '@pages/DocumentsPage/contexts/DocumentsFilterContext';
import DefaultPage from '@templates/DefaultPage';

import Filters from './Filters';
import ModalAddDocument from './ModalAddDocument';
import TableDocuments from './TableDocuments';
import { useDocumentsFilter } from './hooks/useDocumentsFilter';

import * as S from './styles';

function DocumentsList() {
  const classes = S.useStyles();

  const { handleCloseModalAdd, handleOpenModalAdd, openDialogAdd } =
    useDocumentsFilter();

  console.log({ openDialogAdd });
  return (
    <>
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
            onClick={handleOpenModalAdd}
          >
            Enviar Documentos
          </S.ButtonAdd>
        </S.ContainerButton>
      </S.ContainerButtonAndTitle>

      <TableDocuments />

      {!!openDialogAdd && (
        <ModalAddDocument
          openDialog={openDialogAdd}
          handleClose={handleCloseModalAdd}
        />
      )}
    </>
  );
}

export default DocumentsList;
