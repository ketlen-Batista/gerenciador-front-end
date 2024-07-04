import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import styled from 'styled-components';

export const FieldBox = styled('div')`
  > div {
    width: 100%;
  }
`;

export const ContainerHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const ContainerIcons = styled.div`
  display: flex;
  width: 300px;
  justify-content: space-between;
`;

export const CircleIcon = styled.div`
  display: flex;
  background: var(--lightgray);
  border-radius: 100%;
  padding: 5px;
  width: 50px;
  height: 50px;
  align-items: center;
  justify-content: center;
  :hover {
    cursor: pointer;
  }
`;

export const Image = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin-top: 16px;
  margin-bottom: 16px;
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
