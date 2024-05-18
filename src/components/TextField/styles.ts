import MUITextField from '@mui/material/TextField';
import { styled as MUIStyled } from '@mui/material/styles';

import { colors } from '@styles/colors';

export const TextField = MUIStyled(MUITextField)({
  '& .MuiInputBase-root': {
    background: colors.basic.white,
    '& > fieldset': {
      transition: 'border-color 0.3s ease',
      borderColor: colors.text.disabled,
    },
  },
  '&[data-disable-selection="true"] .MuiInputBase-root': {
    caretColor: 'transparent',
    userSelect: 'none',
    pointerEvents: 'none',
  },
});
