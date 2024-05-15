import { Badge } from '@material-ui/core';
import styled from 'styled-components';

export const Image = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  &:hover {
    cursor: pointer;
  }
`;

export const ContainerButton = styled.div`
  display: flex;
  position: absolute;
  width: 20px;
  background-color: var(--Success);
  margin-bottom: 0px;
  justify-content: center;
`;
