import { makeStyles, withStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
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
    backgroundColor: 'var(--GreenDark)',
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

export const FieldBox = styled('div')`
  > div {
    width: 100%;
  }
`;

export const DateFilterContainer = styled('div')`
  width: 260px;
  display: flex;
  flex: 2;
  margin-left: 10px;
`;

export const ContainerFilters = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 30px;
  margin-top: 30px;
`;

export const ContainerInput = styled.div`
  display: flex;
  flex: 2;
  height: 45px;
  align-items: center;
  padding-right: 10px;
`;

export const ContainerSelects = styled.div`
  display: flex;
  height: 45px;
  align-items: center;
  justify-content: space-around;
  flex: 6;
`;

export const ContainerButton = styled.div`
  display: flex;
  color: var(--Success);
  height: 45px;
  /* align-items: center; */
  /* flex: 2; */
  justify-content: right;
  /* margin-bottom: 20px;
  margin-top: 50px; */
`;

export const SubTitle = styled.div`
  display: flex;
  font-size: 20px;
  color: var(--ColorFont);
  /* flex: 10; */
  /* padding-top: 10px; */
  /* margin-bottom: 20px; */
`;

export const ContainerButtonAndTitle = styled.div`
  display: flex;
  /* color: var(--Success); */
  height: 45px;
  align-items: center;
  /* flex: 2; */
  justify-content: space-between;
  margin-bottom: 30px;
  margin-top: 50px;
`;
