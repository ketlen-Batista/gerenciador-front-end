import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { Box } from '@mui/material';
import clsx from 'clsx';

import { ListItems } from './ListItems';

const Sidebar = ({ classes, open, handleDrawerClose }) => {
  return (
    <Drawer
      variant="permanent"
      classes={{
        paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
      }}
      open={open}
    >
      <div className={classes.toolbarIcon}>
        <IconButton onClick={handleDrawerClose}>
          <Box color="var(--ColorFont)">
            <ChevronLeftIcon />
          </Box>
        </IconButton>
      </div>
      <Divider />
      <List>
        <ListItems />
      </List>
    </Drawer>
  );
};

export default Sidebar;
