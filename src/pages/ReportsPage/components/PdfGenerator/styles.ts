import { makeStyles, withStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { colors } from '@src/styles/colors';
import styled from 'styled-components';

export const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

export const ButtonAdd = withStyles({
    root: {
      height: '100%',
      boxShadow: 'none',
      textTransform: 'none',
      fontSize: 16,
      padding: '6px 12px',
      border: '1px solid',
      lineHeight: 1.5,
      backgroundColor:` ${colors.info.main} !important`,
      borderColor: '',
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:hover': {
        backgroundColor: 'var(--Success)',
        borderColor: 'var(--Success)',
        boxShadow: 'none',
      },
      '&:active': {
        boxShadow: 'none',
        backgroundColor: 'var(--GreenDark)',
        borderColor: 'var(--Success)',
      },
      '&:focus': {
        boxShadow: '0 0 0 0.2rem "var(--Success)"',
      },
    },
  })(Button);

  export const ButtonClick = styled(Button)`
  display: flex;
  background: ${({ theme }) => theme.colors.info.main};
  width: auto;
  height: 50px;
  border-radius: 250px !important;
  color: ${({ theme }) => theme.colors.basic.white};
  cursor: pointer !important;
  margin-bottom: 20px;
  margin-left: 10px;
  padding: 0px 20px !important;
  &:hover {
    background: ${({ theme }) => theme.colors.info.light};
  }
`;