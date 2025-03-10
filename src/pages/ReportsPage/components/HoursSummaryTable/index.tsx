import React, { useState } from 'react';

import { Box, Card, Modal, Typography } from '@mui/material';
import { formatDateDayMonthAndYear } from '@src/utils/dates';

import ButtonCustom from '@src/components/ButtonCustom';
import TableDataGrid from '@src/components/TableDataGrid';

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

  const columns = [
    { field: 'name', headerName: 'Funcionário', flex: 1 },
    { field: 'daysWorked', headerName: 'Dias Trabalhados', flex: 1 },
    {
      field: 'totalHours',
      headerName: 'Horas Trabalhadas',
      flex: 1,
      renderCell: (params: any) => `${params.value?.toFixed(2)} h`,
    },
    {
      field: 'justifiedHours',
      headerName: 'Horas Justificadas',
      flex: 1,
      renderCell: (params: any) => `${params.value?.toFixed(2)} h`,
    },
    {
      field: 'absences',
      headerName: 'Ausências (Horas)',
      flex: 1,
      renderCell: (params: any) => `${params.value?.toFixed(2)} h`,
    },

    {
      field: 'bankHours',
      headerName: 'Total',
      flex: 1,
      renderCell: (params: any) => (
        <Box
          fontWeight="bold"
          color={params.value < 0 ? 'error.main' : 'success.main'}
        >{`${params.value?.toFixed(2)} h`}</Box>
      ),
    },
    {
      field: 'userId',
      headerName: 'Ações',
      flex: 1,
      renderCell: (params: any) => (
        <>
          <ButtonCustom
            onClick={() =>
              handleOpenDetails(
                data?.find((user) => user?.userId === params?.value),
              )
            }
          >
            Detalhes
          </ButtonCustom>
        </>
      ),
    },
  ];

  return (
    <Card sx={{ padding: 1, marginTop: 6 }}>
      {data?.length ? (
        <Typography variant="h6" gutterBottom>
          Banco de horas
        </Typography>
      ) : null}

      <TableDataGrid
        columns={columns}
        rows={data}
        pageSize={7}
        loading={false}
      />

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
            <TableDataGrid
              columns={[
                {
                  field: 'date',
                  headerName: 'Data',
                  flex: 1,
                  renderCell: (params: any) =>
                    formatDateDayMonthAndYear(params?.value),
                },
                {
                  field: 'workedHours',
                  headerName: 'Horas Trabalhadas',
                  flex: 1,
                  renderCell: (params: any) => params?.value?.toFixed(2),
                },
                {
                  field: 'justification',
                  headerName: 'Justificativa',
                  flex: 1,
                  valueGetter: (params: any) => params?.value || 'N/A',
                },
              ]}
              rows={selectedUser.details}
              pageSize={12}
              loading={false}
            />
          </Box>
        </Modal>
      )}
    </Card>
  );
};

export default HoursSummaryTable;
