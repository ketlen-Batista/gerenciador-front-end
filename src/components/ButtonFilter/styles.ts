import Button from '@material-ui/core/Button';
import styled from 'styled-components';

import { colors } from '@styles/colors';

export const ButtonClick = styled(Button)`
  display: flex;
  background: ${colors.text.disabled} !important;
  width: auto;
  height: 50px;
  border-radius: 250px !important;
  color: #fff;
  cursor: pointer !important;
  margin-bottom: 20px;
  margin-left: 10px;
  padding: 0px 20px !important;
`;
