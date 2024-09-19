import React from 'react';

import {
  Card,
  CardActions,
  CardContent,
  IconButton,
  Tooltip,
  Typography,
} from '@material-ui/core';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import { AvailableRoutes } from '@src/routes/availableRoutes';
import { colors } from '@src/styles/colors';
import { useNavigate } from 'react-router-dom';

const EmployeeCard = ({ employee, jobs, contracts, sectors, onDelete }) => {
  const navigate = useNavigate();

  const handleNavigate = (
    page: string,
    employeeId: string,
    fieldsDisabled: boolean,
  ) => {
    navigate(page || '', { state: { employeeId, fieldsDisabled } });
  };

  return (
    <Card style={{ marginBottom: '1rem' }}>
      <CardContent>
        <Typography variant="h6">{employee.name}</Typography>
        <Typography variant="body2">
          Cargo:{' '}
          {jobs?.find((item) => item.value === employee.jobPosition_id)?.name}
        </Typography>
        <Typography variant="body2">
          Setor:{' '}
          {sectors?.find((item) => item.value === employee.sector_value)?.name}
        </Typography>
        <Typography variant="body2">
          Contrato:{' '}
          {
            contracts?.find((item) => item.value === employee.contracts_value)
              ?.name
          }
        </Typography>
        <Typography variant="body2">Status: {employee.status?.name}</Typography>
      </CardContent>
      <CardActions>
        <Tooltip title="Ver" placement="top">
          <IconButton
            onClick={() =>
              handleNavigate(
                AvailableRoutes.employeesDataPage,
                employee.id,
                true,
              )
            }
          >
            <VisibilityOutlinedIcon style={{ color: colors.primary.main }} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Editar" placement="top">
          <IconButton
            onClick={() =>
              handleNavigate(
                AvailableRoutes.employeesDataPage,
                employee.id,
                false,
              )
            }
          >
            <CreateOutlinedIcon style={{ color: colors.secondary.dark }} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Deletar" placement="top">
          <IconButton onClick={() => onDelete(employee.id)}>
            <DeleteOutlinedIcon style={{ color: colors.error.dark }} />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
};

export default EmployeeCard;
