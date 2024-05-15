import React, { ReactNode, useState } from 'react';

import { Switch } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import PersonOutlineTwoToneIcon from '@material-ui/icons/PersonOutlineTwoTone';
import clsx from 'clsx';

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

  const titlePages = {
    documentos: 'Documentos',
    funcionarios: 'Funcionários',
    dadosDoFuncionario: 'Dados do Funcionário',
    configuracoes: 'Configurações',
  };

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
          Cecília Silva Santos
          <IconButton color="inherit">
            <PersonOutlineTwoToneIcon />
          </IconButton>
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
        <Container maxWidth="lg" className={classes.container}>
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
