//PÁGINA FUNCIONARIOS
import React from 'react';

import DefaultPage from '@templates/DefaultPage';

import Filters from './Filters';
import TableDocuments from './TableDocuments';

function DocumentsPage() {
  return (
    <DefaultPage pageTitle="Documentos">
      <Filters />

      {/* TABELA */}
      <TableDocuments />
    </DefaultPage>
  );
}

export default DocumentsPage;
