import styled from 'styled-components';

import { Popover } from '@mui/material';

export const Container = styled('div')`
  position: relative;
  display: inline-flex;
  width: 100%;

  .MuiTextField-root {
    width: 100%;

    .start {
      font-size: 1.25rem;
      margin-right: 0.5rem;
    }
    .end {
      transition: transform 0.3s ease;
    }
  }
`;

export const CustomPopover = styled(Popover)`
  .MuiPopover-paper {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    width: 360px;
    background-color: ${({ theme }) => theme.colors.basic.white};
    .groups {
      gap: 1rem;
      display: flex;
    }
    .group {
      flex: 1;
      gap: 1rem;
      .MuiFormGroup-root {
        gap: 1rem;
      }
    }
  }
`;

export const ButtonsContainer = styled('div')`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;

  & > button {
    flex: 1;
    height: inherit;
  }
`;

export const GroupContent = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  .MuiFormControlLabel-root {
    margin: 0;
  }
`;
