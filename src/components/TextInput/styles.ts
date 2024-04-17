import { makeStyles, createStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) =>
  createStyles({
    styledInput: {
      backgroundColor: '#fff',
      border: '1px solid #e0e0e0',
      borderRadius: 4,
      'box-sizing': 'border-box',
      '&:after': {
        content: 'none',
      },
      '&:before': {
        content: 'none',
      },
      '&:-webkit-autofill': {
        transitionDelay: '9999s',
        transitionProperty: 'background-color, color',
      },
      '&:MuiInputLabel-filled': {
        transform: 'translate(12px, 16px) scale(1)',
      },
    },
    disabled: {
      backgroundColor: 'hsl(0,0%,95%)',
    },
    miniInput: {
      padding: '21px 12px 5px',
    },
    cssLabel: {
      transform: 'translate(12px, 16px) scale(1)',
      '&$cssFocused': {
        color: theme.palette.primary.main,
      },
    },
  })
);
