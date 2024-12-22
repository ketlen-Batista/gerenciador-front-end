// import React, { useEffect, useState } from 'react';
// import {
//   Box, // Button,
//   Card,
//   Modal,
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableRow,
//   Typography,
// } from '@mui/material';
// import ButtonCustom from '@src/components/ButtonCustom';
// interface UserSummary {
//   userId: string;
//   name: string;
//   totalHours: number;
//   justifiedHours: number;
//   absences: number;
//   daysWorked: number;
//   details: {
//     date: string;
//     workedHours: number;
//     justified: boolean;
//     justification?: string;
//   }[];
// }
// const HoursSummaryTable: React.FC<{ data: UserSummary[] }> = ({ data }) => {
//   const [selectedUser, setSelectedUser] = useState<UserSummary | null>(null);
//   const handleOpenDetails = (user: UserSummary) => {
//     setSelectedUser(user);
//   };
//   const handleCloseDetails = () => {
//     setSelectedUser(null);
//   };
//   return (
//     <Card sx={{ padding: 2, marginTop: 6 }}>
//       <Typography variant="h6" gutterBottom>
//         Banco de horas
//       </Typography>
//       <Table>
//         <TableHead>
//           <TableRow>
//             <TableCell>Funcionário</TableCell>
//             <TableCell>Horas Trabalhadas</TableCell>
//             <TableCell>Horas Justificadas</TableCell>
//             <TableCell>Ausências</TableCell>
//             <TableCell>Dias Trabalhados</TableCell>
//             <TableCell>Ações</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {data.map((user) => (
//             <TableRow key={user.userId}>
//               <TableCell>{user.name}</TableCell>
//               <TableCell>{user.totalHours.toFixed(2)}</TableCell>
//               <TableCell>{user.justifiedHours.toFixed(2)}</TableCell>
//               <TableCell>{user.absences}</TableCell>
//               <TableCell>{user.daysWorked}</TableCell>
//               <TableCell>
//                 <ButtonCustom onClick={() => handleOpenDetails(user)}>
//                   Detalhes
//                 </ButtonCustom>
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//       {selectedUser && (
//         <Modal open={!!selectedUser} onClose={handleCloseDetails}>
//           <Box
//             sx={{
//               padding: 4,
//               backgroundColor: 'white',
//               margin: 'auto',
//               maxWidth: '600px',
//             }}
//           >
//             <Typography variant="h6" gutterBottom>
//               Detalhes de {selectedUser.name}
//             </Typography>
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   <TableCell>Data</TableCell>
//                   <TableCell>Horas Trabalhadas</TableCell>
//                   <TableCell>Justificativa</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {selectedUser.details.map((detail, index) => (
//                   <TableRow key={index}>
//                     <TableCell>{detail.date}</TableCell>
//                     <TableCell>{detail.workedHours.toFixed(2)}</TableCell>
//                     <TableCell>{detail.justification || 'N/A'}</TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </Box>
//         </Modal>
//       )}
//     </Card>
//   );
// };
// export default HoursSummaryTable;
import React, { useState } from 'react';

import { Box, Card, Modal, Typography } from '@mui/material';
import { formatDate, formatDateDayMonthAndYear } from '@src/utils/dates';

// Assumindo que você já tem esse componente implementado
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
      headerName: 'Faltas (Horas)',
      flex: 1,
      renderCell: (params: any) => `${params.value?.toFixed(2)} h`,
    },
    { field: 'daysWorked', headerName: 'Dias Trabalhados', flex: 1 },
    {
      field: 'userId',
      headerName: 'Ações',
      flex: 1,
      renderCell: (params: any) => (
        <>
          {console.log({ params })}
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
        // getRowId={(row) => row.userId}
        // getRowId={(row) => `${row.name}-${row.workedHours}`}
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
