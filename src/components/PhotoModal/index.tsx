import React, { useEffect, useState } from 'react';

import { InfoOutlined } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import { getImageUrlServer } from '@src/utils/functions';

import FullScreenDialog from '@src/components/FullScreenDialog';

interface PhotoModalProps {
  photoId?: number;
  openDialog: boolean;
  handleClose: () => void;
  titleModal?: string;
  fullScreen?: boolean;
}

const PhotoModal = ({
  photoId,
  openDialog,
  handleClose,
  titleModal,
  fullScreen,
}: PhotoModalProps) => {
  const [photoUrl, setPhotoUrl] = useState(null);
  console.log({ photoUrl });
  useEffect(() => {
    if (photoId) {
      (async () => {
        const urlImage = await getImageUrlServer(photoId);
        setPhotoUrl(urlImage);
      })();
    }
  }, [photoId]);

  return (
    <FullScreenDialog
      open={openDialog}
      onClose={handleClose}
      maxWidth={'md'}
      closeButtonPosition={'right'}
      title={titleModal}
      fullWidth
      fullScreen={fullScreen}
      style={{ zIndex: 1300 }}
    >
      {photoId ? (
        <Box
          py={1}
          px={1}
          width={'100%'}
          height={'auto'}
          display={'flex'}
          justifyContent={'center'}
        >
          <img src={photoUrl} height={'500px'} width={'400px'} />
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
