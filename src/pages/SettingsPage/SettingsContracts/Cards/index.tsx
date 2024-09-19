import React from 'react';

import { Button, Card, CardContent, Typography } from '@material-ui/core';
import { basicNames } from '@src/utils/constants';
import { formatDateDayMonthAndYear } from '@src/utils/dates';

const Cards = ({ contracts, handleOpenModal, handleOpenModalDelete }) => {
  return (
    <>
      {contracts?.map((contract) => (
        <Card key={contract.id} style={{ marginBottom: '1rem' }}>
          <CardContent>
            <Typography variant="h5">{contract.name}</Typography>
            <Typography variant="body2">{`Número de usuários: ${contract.quantityUsers}`}</Typography>
            <Typography variant="body2">{`Número de setores: ${contract.quantitySectors}`}</Typography>
            <Typography variant="body2">{`Status: ${contract.status}`}</Typography>
            <Typography variant="body2">{`Vigência: ${formatDateDayMonthAndYear(contract.validity)}`}</Typography>
            <div style={{ marginTop: '1rem' }}>
              <Button
                variant="outlined"
                color="primary"
                onClick={() =>
                  handleOpenModal(
                    contract.name,
                    contract.id,
                    contract.status,
                    contract.validity,
                  )
                }
              >
                Editar
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => handleOpenModalDelete(contract.id)}
                style={{ marginLeft: '1rem' }}
              >
                Excluir
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
};

export default Cards;
