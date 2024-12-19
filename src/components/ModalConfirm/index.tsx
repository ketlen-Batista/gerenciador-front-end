import React, { ReactNode } from 'react';

import { Box, Button } from '@mui/material';
import { colors } from '@src/styles/colors';

import CircularProgress from '@src/components/CircularProgress';
import FullScreenDialog from '@src/components/FullScreenDialog';

interface ModalConfirmProps {
  openDialog: boolean;
  handleClose: () => void;
  handleConfirm: () => void;
  textButtonConfirm: string;
  isLoading?: boolean;
  text?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'xs';
  titleModal?: string;
  colorButtonConfirm?: ReactNode;
}

const ModalConfirm = ({
  openDialog,
  handleClose,
  handleConfirm,
  textButtonConfirm,
  isLoading = false,
  text,
  maxWidth = 'md',
  titleModal = '',
  colorButtonConfirm = colors.success.dark,
}: ModalConfirmProps) => {
  return (
    <FullScreenDialog
      open={openDialog}
      onClose={handleClose}
      maxWidth={maxWidth}
      closeButtonPosition={'right'}
      title={titleModal}
      fullWidth
      extraFooterComponent={
        <Box display="flex" justifyContent="flex-end" width="100%" gap={2}>
          <Box color={colors.basic.black}>
            <Button onClick={handleClose} color="inherit" variant="outlined">
              Cancelar
            </Button>
          </Box>

          <Box color={colorButtonConfirm as string}>
            <Button onClick={handleConfirm} variant="contained">
              {isLoading ? (
                <CircularProgress size="small" color="inherit" />
              ) : (
                textButtonConfirm
              )}
            </Button>
          </Box>
        </Box>
      }
    >
      <Box
        display="flex"
        fontSize={'18px'}
        justifyContent="space-around"
        my={5}
        mx={2}
      >
        {text ?? 'Tem certeza que deseja realizar esta ação?'}
      </Box>
    </FullScreenDialog>
  );
};

export default ModalConfirm;
