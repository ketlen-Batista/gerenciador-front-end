// import React, { useEffect, useState } from 'react';
// import { Box, Card, CircularProgress, Typography } from '@mui/material';
// import { colors } from '@src/styles/colors';
// import { useUserCheckpointsContext } from '../../hooks/useUserCheckpointsContext';
// // Substitua pelo caminho correto
// import HoursSummaryTable from '../HoursSummaryTable';
// import processUserCheckpoints from './ProcessUserCheckpoints';
// const UserHoursDashboard = () => {
//   const { userCheckpoints, isLoadingUserCheckpoints } =
//     useUserCheckpointsContext();
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         const rawData = userCheckpoints;
//         const processedData = processUserCheckpoints(rawData);
//         setData(processedData);
//       } catch (err: any) {
//         setError('Erro ao buscar os dados. Por favor, tente novamente.');
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, [userCheckpoints]);
//   if (loading || isLoadingUserCheckpoints) {
//     return (
//       <Card sx={{ padding: 2, marginTop: 6, textAlign: 'center' }}>
//         <Box
//           display="flex"
//           alignItems="center"
//           justifyContent="center"
//           color={colors.basic.black}
//           my={4}
//           width={'100%'}
//           minHeight={'200px'}
//         >
//           <CircularProgress color="primary" size={60} />
//         </Box>
//       </Card>
//     );
//   }
//   if (error) {
//     return (
//       <Card sx={{ padding: 2, marginTop: 6, textAlign: 'center' }}>
//         <Typography variant="body1" color="error">
//           {error}
//         </Typography>
//       </Card>
//     );
//   }
//   return (
//     <div>
//       <HoursSummaryTable data={data} />
//     </div>
//   );
// };
// export default UserHoursDashboard;
//////////////////////////////////////////////////////////
// import React, { useEffect, useState } from 'react';
// import {
//   Box,
//   Card,
//   CircularProgress,
//   Typography,
//   useMediaQuery,
// } from '@mui/material';
// import { colors } from '@src/styles/colors';
// import { useUserCheckpointsContext } from '../../hooks/useUserCheckpointsContext';
// import HoursSummaryTable from '../HoursSummaryTable';
// import processUserCheckpoints from './ProcessUserCheckpoints';
// const UserHoursDashboard = () => {
//   const { userCheckpoints, isLoadingUserCheckpoints } =
//     useUserCheckpointsContext();
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const isMobile = useMediaQuery('(max-width:600px)'); // Detecção de telas pequenas
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         const rawData = userCheckpoints;
//         const processedData = processUserCheckpoints(rawData);
//         setData(processedData);
//       } catch (err: any) {
//         setError('Erro ao buscar os dados. Por favor, tente novamente.');
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, [userCheckpoints]);
//   if (loading || isLoadingUserCheckpoints) {
//     return (
//       <Card sx={{ padding: 2, marginTop: 6, textAlign: 'center' }}>
//         <Box
//           display="flex"
//           alignItems="center"
//           justifyContent="center"
//           color={colors.basic.black}
//           my={4}
//           width={'100%'}
//           minHeight={'200px'}
//         >
//           <CircularProgress color="primary" size={60} />
//         </Box>
//       </Card>
//     );
//   }
//   if (error) {
//     return (
//       <Card sx={{ padding: 2, marginTop: 6, textAlign: 'center' }}>
//         <Typography variant="body1" color="error">
//           {error}
//         </Typography>
//       </Card>
//     );
//   }
//   return (
//     <div>
//       {isMobile ? (
//         <Box display="grid" gridTemplateColumns="1fr" gap={2}>
//           <Box fontSize="18px" fontWeight="bold">
//             Banco de horas
//           </Box>
//           {data.map((item: any) => (
//             <Card key={item.userId}>
//               <Box bgcolor={colors.info.states.outlinedBorder} p={2}>
//                 <Typography variant="h6">{item.name}</Typography>
//                 <Typography variant="body2">
//                   Total de horas: {item.totalHours}
//                 </Typography>
//                 <Typography variant="body2">
//                   Horas justificadas: {item.justifiedHours}
//                 </Typography>
//                 <Typography variant="body2">
//                   Ausências: {item.absences}
//                 </Typography>
//                 <Typography variant="body2">
//                   Dias trabalhados: {item.daysWorked}
//                 </Typography>
//               </Box>
//             </Card>
//           ))}
//         </Box>
//       ) : (
//         <HoursSummaryTable data={data} />
//       )}
//     </div>
//   );
// };
// export default UserHoursDashboard;
///////////////////////////////////////////////////
import React, { useEffect, useState } from 'react';

import {
  Box,
  Card,
  CircularProgress,
  Pagination,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { colors } from '@src/styles/colors';

import { useUserCheckpointsContext } from '../../hooks/useUserCheckpointsContext';
import HoursSummaryTable from '../HoursSummaryTable';

import processUserCheckpoints from './ProcessUserCheckpoints';

const UserHoursDashboard = () => {
  const { userCheckpoints, isLoadingUserCheckpoints } =
    useUserCheckpointsContext();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const isMobile = useMediaQuery('(max-width:600px)'); // Detecção de telas pequenas

  // Paginação
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleChangePage = (_: React.ChangeEvent<unknown>, newPage: number) => {
    setCurrentPage(newPage);
  };

  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const rawData = userCheckpoints;
        const processedData = processUserCheckpoints(rawData);
        setData(processedData);
      } catch (err: any) {
        setError('Erro ao buscar os dados. Por favor, tente novamente.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userCheckpoints]);

  if (loading || isLoadingUserCheckpoints) {
    return (
      <Card sx={{ padding: 2, marginTop: 6, textAlign: 'center' }}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          color={colors.basic.black}
          my={4}
          width={'100%'}
          minHeight={'200px'}
        >
          <CircularProgress color="primary" size={60} />
        </Box>
      </Card>
    );
  }

  if (error) {
    return (
      <Card sx={{ padding: 2, marginTop: 6, textAlign: 'center' }}>
        <Typography variant="body1" color="error">
          {error}
        </Typography>
      </Card>
    );
  }

  return (
    <div>
      {isMobile ? (
        <Box>
          <Box fontSize="18px" fontWeight="bold" mb={2}>
            Banco de horas
          </Box>
          <Box display="grid" gridTemplateColumns="1fr" gap={2}>
            {paginatedData.map((item: any) => (
              <Card key={item.userId}>
                <Box bgcolor={colors.info.states.outlinedBorder} p={2}>
                  <Typography variant="h6">{item.name}</Typography>
                  <Typography variant="body2">
                    Total de horas: {item.totalHours}
                  </Typography>
                  <Typography variant="body2">
                    Horas justificadas: {item.justifiedHours}
                  </Typography>
                  <Typography variant="body2">
                    Ausências: {item.absences}
                  </Typography>
                  <Typography variant="body2">
                    Dias trabalhados: {item.daysWorked}
                  </Typography>
                </Box>
              </Card>
            ))}
          </Box>
          <Box mt={4} display="flex" justifyContent="center">
            <Pagination
              count={Math.ceil(data.length / itemsPerPage)}
              page={currentPage}
              onChange={handleChangePage}
              color="primary"
              siblingCount={0}
            />
          </Box>
        </Box>
      ) : (
        <HoursSummaryTable data={data} />
      )}
    </div>
  );
};

export default UserHoursDashboard;
