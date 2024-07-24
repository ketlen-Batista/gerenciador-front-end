import React from 'react';

import { Box } from '@mui/material';

import FullScreenDialog from '@src/components/FullScreenDialog';
import MapComponentCoordinates from '@src/components/MapComponentCoordinates';

interface LocalizationModalProps {
  openDialog: boolean;
  handleClose: () => void;
  latitude?: number;
  longitude?: number;
}

const LocalizationModal = ({
  latitude,
  longitude,
  openDialog,
  handleClose,
}: LocalizationModalProps) => {
  return (
    <FullScreenDialog
      open={openDialog}
      onClose={handleClose}
      maxWidth={'md'}
      closeButtonPosition={'right'}
      title={'Localização'}
      fullWidth
    >
      {latitude && longitude ? (
        <Box p={2}>
          <MapComponentCoordinates latitude={latitude} longitude={longitude} />
        </Box>
      ) : null}
    </FullScreenDialog>
  );
};

export default LocalizationModal;
