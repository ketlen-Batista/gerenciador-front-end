import React from 'react';

import { Button } from '@material-ui/core';

import DefaultPage from '../DefaultPage';

// import { Container } from './styles';

const ErrorPage = () => {
  return (
    <DefaultPage pageTitle="404">
      <div
        style={{
          display: 'flex',
          flex: 1,
          height: '500px',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          color: 'white',
        }}
      >
        <div
          style={{
            color: 'var(--Danger)',
            fontSize: '27px',
            fontWeight: 'bold',
            marginBottom: '20px',
          }}
        >
          Erro não identificado!
        </div>
        <Button
          style={{
            background: 'var(--Primary)',
          }}
          color="inherit"
        >
          Voltar para home
        </Button>
      </div>
    </DefaultPage>
  );
};

export default ErrorPage;
