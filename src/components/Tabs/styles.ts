import MUITab from '@mui/material/Tab';
import MUITabList from '@mui/lab/TabList';
import MUITabPanel from '@mui/lab/TabPanel';
import { styled as MUIStyled } from '@mui/material/styles';

export const TabList = MUIStyled(MUITabList)({
  boxShadow: 'rgba(0, 0, 0, 0.08) 0 1px 1px',
});

export const Tab = MUIStyled(MUITab)({
  textTransform: 'none',
});

export const TabPanel = MUIStyled(MUITabPanel)({
  padding: '1rem',
});
