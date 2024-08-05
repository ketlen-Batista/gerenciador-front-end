import React, { ReactNode, useState } from 'react';

import { Switch } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Box, Menu, MenuItem, MenuList } from '@mui/material';
import { useAuth } from '@src/hooks/useAuth';
import { AvailableRoutes } from '@src/routes/availableRoutes';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';

import Sidebar from '@components/Sidebar';

import ErrorPage from '../ErrorPage';

import './global.css';

import * as S from './styles';

type Props = {
  children?: ReactNode;
  pageTitle: string;
};

function DefaultPage({ children, pageTitle }: Props) {
  const classes = S.useStyles();
  const { user, signOut } = useAuth();

  const [openSideBar, setOpenSideBar] = useState(false);
  const [isDark, setIsDark] = useState(false);

  const handleThemeMode = () => {
    setIsDark(!isDark);
  };

  const handleDrawerOpen = () => {
    setOpenSideBar(true);
  };
  const handleDrawerClose = () => {
    setOpenSideBar(false);
  };

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();

  const handleNavigate = (page) => {
    navigate(page || '');
  };

  return (
    <div theme-mode={isDark ? 'dark' : 'ligth'} className={classes.root}>
      {/* CABEÇALHO_SUPERIOR */}
      <CssBaseline />
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, openSideBar && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              openSideBar && classes.menuButtonHidden,
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            GIC
          </Typography>
          {user.name}
          <IconButton
            color="inherit"
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >
            <AccountCircleIcon />
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <Box display="flex" flexDirection="column" px={2}>
              <MenuItem
                onClick={() => handleNavigate(AvailableRoutes.profilePage)}
              >
                Meu perfil
              </MenuItem>
              {/* <MenuItem onClick={handleClose}>My account</MenuItem> */}
              <MenuItem onClick={signOut}>Sair</MenuItem>
            </Box>
          </Menu>
        </Toolbar>
      </AppBar>
      {/* SIDEBAR_LATERAL */}
      <Sidebar
        handleDrawerClose={handleDrawerClose}
        open={openSideBar}
        classes={classes}
      />
      {/* TELAS */}
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="xl" className={classes.container}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            <div
              style={{
                display: 'flex',
                flex: 8,
                fontSize: '18px',
                color: 'var(--ColorFont)',
              }}
            >
              <h1>{pageTitle}</h1>
            </div>
            <div style={{ display: 'flex', flex: 2, justifyContent: 'end' }}>
              <Switch
                checked={isDark}
                onChange={handleThemeMode}
                color="default"
              />
            </div>
          </div>

          {/* TELAS */}
          {children ?? <ErrorPage />}
        </Container>
      </main>
    </div>
  );
}

export default DefaultPage;
