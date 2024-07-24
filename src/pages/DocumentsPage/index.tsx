import React from 'react';

import { DocumentsFilterProvider } from '@pages/DocumentsPage/contexts/DocumentsFilterContext';
import DefaultPage from '@templates/DefaultPage';

import DocumentsList from './DocumentsList';

function DocumentsPage() {
  return (
    <DefaultPage pageTitle="Documentos">
      <DocumentsFilterProvider>
        <DocumentsList />
      </DocumentsFilterProvider>
    </DefaultPage>
  );
}

export default DocumentsPage;
