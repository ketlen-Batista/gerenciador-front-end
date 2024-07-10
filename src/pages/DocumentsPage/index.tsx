import React, { useEffect, useState } from 'react';

import PostAddRoundedIcon from '@material-ui/icons/PostAddRounded';
import { DocumentsFilterProvider } from '@pages/DocumentsPage/contexts/DocumentsFilterContext';
import DefaultPage from '@templates/DefaultPage';

import Filters from './Filters';
import ModalAddDocument from './ModalAddDocument';
import TableDocuments from './TableDocuments';
import { useDocumentsFilter } from './hooks/useDocumentsFilter';

import * as S from './styles';

function DocumentsPage() {
  const classes = S.useStyles();

  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const { fetchDocuments } = useDocumentsFilter();

  const handleCloseModal = () => {
    setOpenDialog(false);
    fetchDocuments({});
  };

  const handleOpenModal = () => {
    setOpenDialog(true);
  };

  return (
    <DefaultPage pageTitle="Documentos">
      <DocumentsFilterProvider>
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
              onClick={handleOpenModal}
            >
              Enviar Documentos
            </S.ButtonAdd>
          </S.ContainerButton>
        </S.ContainerButtonAndTitle>

        <TableDocuments />
      </DocumentsFilterProvider>

      {openDialog && (
        <ModalAddDocument
          openDialog={openDialog}
          handleClose={handleCloseModal}
        />
      )}
    </DefaultPage>
  );
}

export default DocumentsPage;
