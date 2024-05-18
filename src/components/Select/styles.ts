import MUIFormControl from '@mui/material/FormControl';
import MUISelect from '@mui/material/Select';
import { styled as MUIStyled } from '@mui/material/styles';

// import { colors } from '@/styles/colors';

export const FormControl = MUIStyled(MUIFormControl)({
  '& .MuiInputBase-root': {
    minWidth: '150px',
  },
});

export const Select = MUIStyled(MUISelect)({
  background: 'white',
});
