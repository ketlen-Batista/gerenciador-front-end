import { createStyles, makeStyles } from '@material-ui/core/styles';
import { colors } from '@src/styles/colors';

export const useStyles = makeStyles((theme) =>
  createStyles({
    styledInput: {
      heigth: 'auto !important',
      backgroundColor: 'var(--Light)',
      border: `1px solid ${colors.extra.avatarFill}`,
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
      backgroundColor: 'var(--Secondary)',
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
  }),
);
