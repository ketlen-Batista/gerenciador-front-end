import styled from 'styled-components';
import { makeStyles, withStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';

export const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

export const ButtonAdd = withStyles({
  root: {
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 16,
    padding: '6px 12px',
    border: '1px solid',
    lineHeight: 1.5,
    backgroundColor: 'var(--Success)',
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
      backgroundColor: 'var(--Primary)',
      borderColor: 'var(--Secundary)',
      boxShadow: 'none',
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: 'var(--Dark)',
      borderColor: 'var(--Info)',
    },
    '&:focus': {
      boxShadow: '0 0 0 0.2rem "var(--Success)"',
    },
  },
})(Button);

export const ContainerInput = styled.div`
  display: flex;
  flex: 4;
  height: 100px;
  align-items: center;
`;

export const ContainerSelects = styled.div`
  display: flex;
  height: 100px;
  align-items: center;
  justify-content: space-around;
  flex: 4;
`;

export const ContainerButton = styled.div`
  display: flex;
  color: var(--Success);
  height: 100px;
  align-items: center;
  flex: 4;
  justify-content: right;
`;
