import React from 'react';

import { InfoOutlined } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import { getImageUrlServer } from '@src/utils/functions';

import FullScreenDialog from '@src/components/FullScreenDialog';

interface PhotoModalProps {
  photoId?: number;
  openDialog: boolean;
  handleClose: () => void;
  titleModal?: string;
}

const PhotoModal = ({
  photoId,
  openDialog,
  handleClose,
  titleModal,
}: PhotoModalProps) => {
  return (
    <FullScreenDialog
      open={openDialog}
      onClose={handleClose}
      maxWidth={'md'}
      closeButtonPosition={'right'}
      title={titleModal}
      fullWidth
    >
      {photoId ? (
        <Box
          py={2}
          px={8}
          width={'100%'}
          display={'flex'}
          justifyContent={'center'}
        >
          <img
            src={getImageUrlServer(photoId)}
            height={'500px'}
            width={'400px'}
          />
        </Box>
      ) : (
        <Box
          p={2}
          height={'400px'}
          width={'100%'}
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            gap={1}
            height="200px"
          >
            <InfoOutlined color="warning" sx={{ height: 28, width: 28 }} />
            <Typography variant="body1" fontSize={17} color="warning.main">
              {'Sem dados para exibir'}
            </Typography>
          </Box>
        </Box>
      )}
    </FullScreenDialog>
  );
};

export default PhotoModal;
