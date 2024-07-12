import React, { useEffect, useState } from 'react';

import PostAddRoundedIcon from '@material-ui/icons/PostAddRounded';
import { DocumentsFilterProvider } from '@pages/DocumentsPage/contexts/DocumentsFilterContext';
import DefaultPage from '@templates/DefaultPage';

import DocumentsList from './DocumentsList';
import Filters from './Filters';
import ModalAddDocument from './ModalAddDocument';
import TableDocuments from './TableDocuments';
import { useDocumentsFilter } from './hooks/useDocumentsFilter';

import * as S from './styles';

function DocumentsPage() {
  const classes = S.useStyles();

  const { handleCloseModalAdd, handleOpenModalAdd, openDialogAdd } =
    useDocumentsFilter();

  console.log({ openDialogAdd });
  return (
    <DefaultPage pageTitle="Documentos">
      <DocumentsFilterProvider>
        <DocumentsList />
      </DocumentsFilterProvider>
    </DefaultPage>
  );
}

export default DocumentsPage;
