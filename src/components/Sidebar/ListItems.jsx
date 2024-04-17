import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SettingsIcon from '@material-ui/icons/Settings';
import HouseIcon from '@material-ui/icons/House';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import AssignmentRoundedIcon from '@material-ui/icons/AssignmentRounded';
import WorkRoundedIcon from '@material-ui/icons/WorkRounded';

export const ListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <HouseIcon />
      </ListItemIcon>
      <ListItemText primary="Início" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <SupervisorAccountIcon />
      </ListItemIcon>
      <ListItemText primary="Funcionários" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentRoundedIcon />
      </ListItemIcon>
      <ListItemText primary="Relatórios" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <WorkRoundedIcon />
      </ListItemIcon>
      <ListItemText primary="Documentos" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <SettingsIcon />
      </ListItemIcon>
      <ListItemText primary="Configurações" />
    </ListItem>
  </div>
);
