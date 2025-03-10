import React from 'react';

import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import {
  Box,
  Button,
  CardContent,
  Card as MuiCard,
  Typography,
} from '@mui/material';
import { basicNames } from '@src/utils/constants';

type Props = {
  sectors: {
    id: number;
    value: number;
    contractId: number;
    email: string;
    signatureDate: number;
    name: string;
    contractName: string;
    quantityUsers: number;
    phone: string;
    linkLocation: string;
  }[];
  isPending: boolean;
  onEdit: (
    name?: string,
    id?: number,
    idContract?: number,
    locationLink?: string,
    email?: string,
    daySignature?: number,
  ) => void;
  onDelete: (id: number) => void;
};

const Card = ({ sectors, isPending, onEdit, onDelete }: Props) => {
  return (
    <Box>
      {isPending ? (
        <Typography>Loading...</Typography>
      ) : (
        sectors?.map((sector) => (
          <MuiCard key={sector.id} sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6">{sector.name}</Typography>
              <Typography variant="body2">
                Contrato: {sector.contractName}
              </Typography>
              <Typography variant="body2">
                Quantidade de usuários: {sector.quantityUsers}
              </Typography>
              <Typography variant="body2">Telefone: {sector.phone}</Typography>
              <Typography variant="body2">
                Localização:{' '}
                {sector.linkLocation ? (
                  <a
                    href={sector.linkLocation}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Ver Localização
                  </a>
                ) : (
                  '-'
                )}
              </Typography>
              <Box display="flex" justifyContent="flex-end" mt={2}>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() =>
                    onEdit(
                      sector?.name,
                      sector?.value,
                      sector?.contractId,
                      sector?.linkLocation,
                      sector?.email,
                      sector?.signatureDate,
                    )
                  }
                >
                  {/* Edit */}
                  <CreateOutlinedIcon fontSize="medium" color="primary" />
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => onDelete(sector?.value)}
                  sx={{ ml: 1 }}
                >
                  {/* Delete */}
                  <DeleteOutlinedIcon fontSize="medium" color="error" />
                </Button>
              </Box>
            </CardContent>
          </MuiCard>
        ))
      )}
    </Box>
  );
};

export default Card;
