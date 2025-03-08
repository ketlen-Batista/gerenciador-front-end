import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AssignmentRoundedIcon from '@material-ui/icons/AssignmentRounded';
import HouseIcon from '@material-ui/icons/House';
import SettingsIcon from '@material-ui/icons/Settings';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import WorkRoundedIcon from '@material-ui/icons/WorkRounded';
import ApartmentIcon from '@mui/icons-material/Apartment';
import { Box, Tooltip } from '@mui/material';
import { AvailableRoutes } from '@routes/availableRoutes';
import { useAuth } from '@src/hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export const ListItems = () => {
  const navigate = useNavigate();
  const { permissions } = useAuth();

  const handleNavigate = (page) => {
    navigate(page || '');
  };
  return (
    <div>
      {!!permissions?.['home'] && (
        <Tooltip title="Início" placement="right">
          <ListItem button onClick={() => handleNavigate(AvailableRoutes.home)}>
            <ListItemIcon>
              <Box color="var(--ColorFont)">
                <HouseIcon />
              </Box>
            </ListItemIcon>
            <ListItemText primary="Início" />
          </ListItem>
        </Tooltip>
      )}

      {!!permissions?.['company'] && (
        <Tooltip title="Dados da empresa" placement="right">
          <ListItem
            button
            onClick={() => handleNavigate(AvailableRoutes.company)}
          >
            <ListItemIcon>
              <Box color="var(--ColorFont)">
                <ApartmentIcon />
              </Box>
            </ListItemIcon>
            <ListItemText primary="Dados da empresa" />
          </ListItem>
        </Tooltip>
      )}

      {!!permissions?.['pageEmployess'] && (
        <Tooltip title="Funcionários" placement="right">
          <ListItem
            button
            onClick={() => handleNavigate(AvailableRoutes.employeesPage)}
          >
            <ListItemIcon>
              <Box color="var(--ColorFont)">
                <SupervisorAccountIcon />
              </Box>
            </ListItemIcon>
            <ListItemText primary="Funcionários" />
          </ListItem>
        </Tooltip>
      )}

      {!!permissions?.['reports'] && (
        <Tooltip title="Relatórios" placement="right">
          <ListItem
            button
            onClick={() => handleNavigate(AvailableRoutes.reportsPage)}
          >
            <ListItemIcon>
              <Box color="var(--ColorFont)">
                <AssignmentRoundedIcon />
              </Box>
            </ListItemIcon>
            <ListItemText primary="Relatórios" />
          </ListItem>
        </Tooltip>
      )}

      {!!permissions?.['documentsPage'] && (
        <Tooltip title="Documentos" placement="right">
          <ListItem
            button
            onClick={() => handleNavigate(AvailableRoutes.documentsPage)}
          >
            <ListItemIcon>
              <Box color="var(--ColorFont)">
                <WorkRoundedIcon />
              </Box>
            </ListItemIcon>
            <ListItemText primary="Documentos" />
          </ListItem>
        </Tooltip>
      )}

      {!!permissions?.['configs'] && (
        <Tooltip title="Configurações" placement="right">
          <ListItem
            button
            onClick={() => handleNavigate(AvailableRoutes.settingsPage)}
          >
            <ListItemIcon>
              <Box color="var(--ColorFont)">
                <SettingsIcon />
              </Box>
            </ListItemIcon>
            <ListItemText primary="Configurações" />
          </ListItem>
        </Tooltip>
      )}
    </div>
  );
};
