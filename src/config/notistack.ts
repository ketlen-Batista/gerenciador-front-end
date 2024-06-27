import { type OptionsObject } from 'notistack';

import Snackbar from '@components/Snackbar';

export const snackbarOptions: OptionsObject = {
  hideIconVariant: true,
  autoHideDuration: 4000,
  transitionDuration: { enter: 150, exit: 150 },
  anchorOrigin: {
    vertical: 'bottom',
    horizontal: 'right',
  },
};

export const snackbarTemplates = {
  error: Snackbar,
  info: Snackbar,
  success: Snackbar,
  warning: Snackbar,
};
