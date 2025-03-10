import MUIToolbar from '@mui/material/Toolbar';
import { styled as MUIStyled } from '@mui/material/styles';
import styled from 'styled-components';

import MUIButton from '@src/components/ButtonCustom';

import { colors } from '@styles/colors';

export const Toolbar = MUIStyled(MUIToolbar)({
  display: 'flex',
  gap: '1rem',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '1rem 1.5rem !important',
  '&.header': {
    boxShadow: 'rgba(0, 0, 0, 0.08) 0 1px 1px',
  },
  '&.footer': {
    boxShadow: 'rgba(0, 0, 0, 0.08) 0 -1px 1px',
  },
  '& .toolbar-box': {
    flex: '1',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  '& .title-box': {
    display: 'flex',
    flexDirection: 'column',
  },
  '& .close-dialog': {
    minWidth: '48px',
    minHeight: '48px',
    fontSize: '2rem',
    color: colors.action.active,
  },
});

export const CloseButton = MUIStyled(MUIButton)({
  height: '48px',
  fontSize: '2rem',
  color: colors.action.active,
});

export const ContentBox = styled('div')`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: auto;

  .loading-box {
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: center;
  }
`;
