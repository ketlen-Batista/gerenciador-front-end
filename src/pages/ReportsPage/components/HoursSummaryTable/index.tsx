import React, { useEffect, useState } from 'react';

import {
  Box,
  Button,
  Card,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

interface UserSummary {
  userId: string;
  name: string;
  totalHours: number;
  justifiedHours: number;
  absences: number;
  daysWorked: number;
  details: {
    date: string;
    workedHours: number;
    justified: boolean;
    justification?: string;
  }[];
}

const HoursSummaryTable: React.FC<{ data: UserSummary[] }> = ({ data }) => {
  const [selectedUser, setSelectedUser] = useState<UserSummary | null>(null);

  const handleOpenDetails = (user: UserSummary) => {
    setSelectedUser(user);
  };

  const handleCloseDetails = () => {
    setSelectedUser(null);
  };

  return (
    <Card sx={{ padding: 2, margin: 2 }}>
      <Typography variant="h6" gutterBottom>
        Banco de Horas dos Funcionários
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Funcionário</TableCell>
            <TableCell>Horas Trabalhadas</TableCell>
            <TableCell>Horas Justificadas</TableCell>
            <TableCell>Ausências</TableCell>
            <TableCell>Dias Trabalhados</TableCell>
            <TableCell>Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((user) => (
            <TableRow key={user.userId}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.totalHours.toFixed(2)}</TableCell>
              <TableCell>{user.justifiedHours.toFixed(2)}</TableCell>
              <TableCell>{user.absences}</TableCell>
              <TableCell>{user.daysWorked}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => handleOpenDetails(user)}
                >
                  Detalhes
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {selectedUser && (
        <Modal open={!!selectedUser} onClose={handleCloseDetails}>
          <Box
            sx={{
              padding: 4,
              backgroundColor: 'white',
              margin: 'auto',
              maxWidth: '600px',
            }}
          >
            <Typography variant="h6" gutterBottom>
              Detalhes de {selectedUser.name}
            </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Data</TableCell>
                  <TableCell>Horas Trabalhadas</TableCell>
                  <TableCell>Justificativa</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {selectedUser.details.map((detail, index) => (
                  <TableRow key={index}>
                    <TableCell>{detail.date}</TableCell>
                    <TableCell>{detail.workedHours.toFixed(2)}</TableCell>
                    <TableCell>{detail.justification || 'N/A'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </Modal>
      )}
    </Card>
  );
};

export default HoursSummaryTable;
