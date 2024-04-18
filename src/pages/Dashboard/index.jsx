import React from 'react';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { Switch } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import MenuIcon from '@material-ui/icons/Menu';
import PersonOutlineTwoToneIcon from '@material-ui/icons/PersonOutlineTwoTone';
// import Employees from '../Employees';
// import DocumentsPage from '../DocumentsPage';
import Sidebar from '../../components/Sidebar';
import * as S from './styles';
import EmployeeData from '../EmployeeData';

function Dashboard({ isDark, handleThemeMode }) {
  const classes = S.useStyles();

  const [open, setOpen] = React.useState(false);
  const [titlePage, setTitlePage] = React.useState('Dados do Funcionário');

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      {/* CABEÇALHO_SUPERIOR */}
      <CssBaseline />
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
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
            Dashboard
          </Typography>
          <IconButton color="inherit">
            <PersonOutlineTwoToneIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      {/* SIDEBAR_LATERAL */}
      <Sidebar
        handleDrawerClose={handleDrawerClose}
        open={open}
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
              <h1>{titlePage}</h1>
            </div>
            <div style={{ display: 'flex', flex: 2, justifyContent: 'end' }}>
              <Switch
                // label={`${isDark} ? 'Dark Mode' : 'Ligth Mode'`}
                checked={isDark}
                onChange={handleThemeMode}
                color="default"
              />
            </div>
          </div>

          {/* TELA_DE_FUNCIONÁRIOS */}
          {/* <Employees /> */}

          {/* TELA_DOCUMENTOS */}
          {/* <DocumentsPage /> */}

          {/* DADOS_DO_FUNCIONÁRIO */}
          <EmployeeData />
        </Container>
      </main>
    </div>
  );
}

export default Dashboard;
