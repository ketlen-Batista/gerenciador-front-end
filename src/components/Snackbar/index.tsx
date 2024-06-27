import { MaterialDesignContent } from 'notistack';
import styled from 'styled-components';

import { colors } from '@styles/colors';

const Snackbar = styled(MaterialDesignContent)(() => ({
  maxWidth: '90vw',
  display: 'flex',
  alignItems: 'center',

  '#notistack-snackbar': {
    flex: 1,
  },
  '&.notistack-MuiContent-error': {
    backgroundColor: colors.error.main,
    color: colors.error.contrast,
  },
  '&.notistack-MuiContent-success': {
    backgroundColor: colors.success.main,
    color: colors.success.contrast,
  },
  '&.notistack-MuiContent-warning': {
    backgroundColor: colors.warning.main,
    color: colors.warning.contrast,
  },
  '&.notistack-MuiContent-info': {
    backgroundColor: colors.info.main,
    color: colors.info.contrast,
  },
}));

export default Snackbar;
