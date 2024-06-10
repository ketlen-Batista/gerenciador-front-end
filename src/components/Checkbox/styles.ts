import FormControlLabel from '@mui/material/FormControlLabel';
import { styled as MUIStyled } from '@mui/material/styles';

export const Container = MUIStyled(FormControlLabel)({
  width: '100%',
  margin: '0',
  padding: '0',

  '& .MuiFormControlLabel-label': {
    flex: '1',
    paddingLeft: '0.5rem',
    paddingRight: '0',
  },

  '&.right': {
    flexDirection: 'row-reverse',
    '& .MuiFormControlLabel-label': {
      paddingLeft: '0',
      paddingRight: '0.5rem',
    },
  },

  '& .MuiCheckbox-root': {
    padding: '0',
    margin: '0',
  },
});
