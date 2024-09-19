import MUITabList from '@mui/lab/TabList';
import MUITabPanel from '@mui/lab/TabPanel';
import MUITab from '@mui/material/Tab';
import { styled as MUIStyled } from '@mui/material/styles';
import styled from 'styled-components';

export const TabList = MUIStyled(MUITabList)({
  boxShadow: 'rgba(0, 0, 0, 0.08) 0 1px 1px',
});

export const Tab = MUIStyled(MUITab)({
  textTransform: 'none',
});

export const TabPanel = MUIStyled(MUITabPanel)({
  padding: '1rem',
});

export const MobileTabSelect = styled.select`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border-radius: 4px;
  border: 1px solid #ccc;
  margin-bottom: 16px;
`;
