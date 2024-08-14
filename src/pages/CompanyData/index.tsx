import React from 'react';
import DefaultPage from '@templates/DefaultPage';
import Form from '@pages/CompanyData/components/Form';
import { CompanyDataProvider } from './contexts/CompanyDataContext';

function CompanyData() {
  return (
    <DefaultPage pageTitle="Dados da Empresa">
      <CompanyDataProvider>
        <Form />
      </CompanyDataProvider>
    </DefaultPage>
  );
}

export default CompanyData;
