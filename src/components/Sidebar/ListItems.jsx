import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AssignmentRoundedIcon from '@material-ui/icons/AssignmentRounded';
import HouseIcon from '@material-ui/icons/House';
import SettingsIcon from '@material-ui/icons/Settings';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import WorkRoundedIcon from '@material-ui/icons/WorkRounded';
import { Tooltip } from '@mui/material';
import { AvailableRoutes } from '@routes/availableRoutes';
import { useLocation, useNavigate } from 'react-router-dom';

export const ListItems = () => {
  const navigate = useNavigate();

  const handleNavigate = (page) => {
    navigate(page || '');
  };
  return (
    <div>
        <Tooltip title="Início" placement='right' >
      <ListItem button onClick={() => handleNavigate(AvailableRoutes.home)}>

        <ListItemIcon>
          <HouseIcon />
        </ListItemIcon>
        <ListItemText primary="Início" />
      </ListItem>
        </Tooltip>
        <Tooltip title="Funcionários" placement='right' >
      <ListItem
        button
        onClick={() => handleNavigate(AvailableRoutes.employeesPage)}
      >
        <ListItemIcon>
          <SupervisorAccountIcon />
        </ListItemIcon>
        <ListItemText primary="Funcionários" />
      </ListItem>
      </Tooltip>
      <Tooltip title="Relatórios" placement='right' >
      <ListItem
        button
        onClick={() => handleNavigate(AvailableRoutes.reportsPage)}
      >
        <ListItemIcon>
          <AssignmentRoundedIcon />
        </ListItemIcon>
        <ListItemText primary="Relatórios" />
      </ListItem>
      </Tooltip>
      <Tooltip title="Documentos" placement='right' >
      <ListItem
        button
        onClick={() => handleNavigate(AvailableRoutes.documentsPage)}
      >
        <ListItemIcon>
          <WorkRoundedIcon />
        </ListItemIcon>
        <ListItemText primary="Documentos" />
      </ListItem>
      </Tooltip>
      <Tooltip title="Configurações" placement='right' >
      <ListItem
        button
        onClick={() => handleNavigate(AvailableRoutes.settingsPage)}
      >
        <ListItemIcon>
          <SettingsIcon />
        </ListItemIcon>
        <ListItemText primary="Configurações" />
      </ListItem>
      </Tooltip>
    </div>
  );
};
