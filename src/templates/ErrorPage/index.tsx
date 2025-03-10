import React from 'react';

import { Button } from '@material-ui/core';
import { useAuth } from '@src/hooks/useAuth';
import { useNavigate } from 'react-router-dom';

import DefaultPage from '../DefaultPage';

const ErrorPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return !user?.id ? (
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
        onClick={() => navigate('/login')}
      >
        Ir para a tela de login
      </Button>
    </div>
  ) : (
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
