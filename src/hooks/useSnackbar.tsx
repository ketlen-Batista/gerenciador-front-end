import React from 'react';
import { useCallback } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import {
  type SnackbarKey,
  useSnackbar as useNotistackSnackbar,
} from 'notistack';

import { snackbarOptions } from '@config/notistack';

interface ShowSnackbar {
  message: string;
  type: 'error' | 'success' | 'warning' | 'info';
}

function useSnackbar() {
  const { enqueueSnackbar, closeSnackbar } = useNotistackSnackbar();

  function SnackbarCloseButton({ snackbarKey }: { snackbarKey: SnackbarKey }) {
    return (
      <IconButton
        size="small"
        color="inherit"
        onClick={() => closeSnackbar(snackbarKey)}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    );
  }

  const showSnackbar = useCallback(
    ({ message, type }: ShowSnackbar) => {
      return enqueueSnackbar({
        ...snackbarOptions,
        message,
        variant: type,
        action: (snackbarKey) => (
          <SnackbarCloseButton snackbarKey={snackbarKey} />
        ),
      });
    },
    [enqueueSnackbar],
  );

  return { showSnackbar, closeSnackbar };
}

export default useSnackbar;
