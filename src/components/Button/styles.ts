import MUIButton from '@mui/material/Button';
import { styled as MUIStyled } from '@mui/material/styles';

import { colors } from '@styles/colors';
import { typography } from '@styles/typography';

export const Button = MUIStyled(MUIButton)({
  textTransform: 'none',

  '&.MuiButton-sizeLarge': {
    fontSize: typography.components.largeButton.size,
    fontWeight: typography.components.largeButton.weight,
    lineHeight: typography.components.largeButton.lineHeight,
  },
  '&.MuiButton-sizeMedium': {
    fontSize: typography.components.mediumButton.size,
    fontWeight: typography.components.mediumButton.weight,
    lineHeight: typography.components.mediumButton.lineHeight,
  },
  '&.MuiButton-sizeSmall': {
    fontSize: typography.components.smallButton.size,
    fontWeight: typography.components.smallButton.weight,
    lineHeight: typography.components.smallButton.lineHeight,
  },

  '&:not(.icon)': {
    '& .MuiSvgIcon-root': {
      fontSize: 'unset',
    },
  },

  '&.icon': {
    width: 48,
    minWidth: 'auto',
  },

  '&.rounded': {
    borderRadius: '100%',
  },

  '&.loading': {
    '.MuiButton-startIcon, .MuiButton-endIcon': {
      display: 'none',
    },
  },

  '&.filter-button': {
    backgroundColor: colors.basic.white,
    border: `1px solid ${colors.text.disabled}`,
    boxShadow: 'none',
  },
});
