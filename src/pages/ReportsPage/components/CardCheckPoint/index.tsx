import React from 'react';

import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Tooltip,
  Typography,
} from '@mui/material';
import { colors } from '@src/styles/colors';
import { formatDate } from '@src/utils/dates';

export const CardCheckPoint = ({
  checkpointObject,
  handleOpenModalLocalization,
  handleOpenModalPhoto,
}: any) => {
  const checkpoint = checkpointObject;
  const user = checkpoint?.User?.name;
  return (
    <Card key={checkpoint?.id} sx={{ marginBottom: 2 }}>
      <CardContent>
        <Typography variant="h6" component="div">
          Usuário: {user ?? null}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Data e horário:{' '}
          {checkpoint?.timestamp ? formatDate(checkpoint?.timestamp) : null}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Tipo: {checkpoint?.checkpointType ?? null}
        </Typography>
        {checkpoint?.latitude && checkpoint?.longitude && (
          <Button
            onClick={() =>
              handleOpenModalLocalization(
                checkpoint?.latitude,
                checkpoint?.longitude,
              )
            }
            sx={{ marginTop: 1 }}
          >
            Ver Localização
          </Button>
        )}
        {checkpoint?.photo_user_checkin_id && (
          <Button
            onClick={() =>
              handleOpenModalPhoto(checkpoint?.photo_user_checkin_id)
            }
            sx={{ marginTop: 1 }}
          >
            Ver Foto
          </Button>
        )}

        <Box
          display="flex"
          justifyContent="start"
          alignItems="center"
          mt={2}
          fontSize={'14px'}
        >
          Status:
          <Box
            component="div"
            display="flex"
            justifyContent="center"
            alignItems="center"
            color={
              colors.statusColors[checkpoint?.status?.value ?? 20] ??
              colors.statusColors[20]
            }
            fontWeight={'bold'}
            fontSize={'14px'}
            ml={1}
          >
            {checkpoint?.status?.name ?? ''}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};
