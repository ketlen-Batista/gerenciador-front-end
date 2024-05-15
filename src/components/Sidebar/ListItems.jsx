import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AssignmentRoundedIcon from '@material-ui/icons/AssignmentRounded';
import HouseIcon from '@material-ui/icons/House';
import SettingsIcon from '@material-ui/icons/Settings';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import WorkRoundedIcon from '@material-ui/icons/WorkRounded';
import { AvailableRoutes } from '@routes/availableRoutes';
import { useLocation, useNavigate } from 'react-router-dom';

export const ListItems = () => {
  const navigate = useNavigate();

  const handleNavigate = (page) => {
    navigate(page || '');
  };
  return (
    <div>
      <ListItem button onClick={() => handleNavigate(AvailableRoutes.home)}>
        <ListItemIcon>
          <HouseIcon />
        </ListItemIcon>
        <ListItemText primary="Início" />
      </ListItem>
      <ListItem
        button
        onClick={() => handleNavigate(AvailableRoutes.employeesPage)}
      >
        <ListItemIcon>
          <SupervisorAccountIcon />
        </ListItemIcon>
        <ListItemText primary="Funcionários" />
      </ListItem>
      <ListItem
        button
        onClick={() => handleNavigate(AvailableRoutes.reportsPage)}
      >
        <ListItemIcon>
          <AssignmentRoundedIcon />
        </ListItemIcon>
        <ListItemText primary="Relatórios" />
      </ListItem>
      <ListItem
        button
        onClick={() => handleNavigate(AvailableRoutes.documentsPage)}
      >
        <ListItemIcon>
          <WorkRoundedIcon />
        </ListItemIcon>
        <ListItemText primary="Documentos" />
      </ListItem>
      <ListItem
        button
        onClick={() => handleNavigate(AvailableRoutes.settingsPage)}
      >
        <ListItemIcon>
          <SettingsIcon />
        </ListItemIcon>
        <ListItemText primary="Configurações" />
      </ListItem>
    </div>
  );
};
