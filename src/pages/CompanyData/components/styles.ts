import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem 1rem;
`;

export const ContainerButton = styled.div`
  width: 20px;
  background-color: var(--Success);
  margin-right: 56px;
  margin-left: auto;
  margin-top: 50px;
`;

export const ButtonStyle = withStyles({
  root: {
    boxShadow: 'none',
    textTransform: 'none',
    fontWeight: 600,
    fontSize: 16,
    padding: '6px 12px',
    border: '1px solid',
    lineHeight: 1.5,
    backgroundColor: 'var(--Success)',
    borderColor: 'var(--Success)',
    color: 'var(--Light)',

    '&:hover': {
      backgroundColor: 'var(--Success)',
      borderColor: 'var(--Success)',
      boxShadow: 'none',
      color: 'var(--Light)',
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: 'var(--Success)',
      borderColor: 'var(--Success)',
      color: 'var(--Light)',
    },
    '&:focus': {
      boxShadow: '0 0 0 0.2rem var(--GreenDark)',
    },
  },
})(Button);
