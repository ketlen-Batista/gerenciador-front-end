import React, { useEffect, useState } from 'react';

import { Card, CircularProgress, Typography } from '@mui/material';
// Substitua pelo caminho correto
import { useListUserCheckpoints } from '@src/services/CheckinsPoints/queries';

import { useUserCheckpointsContext } from '../../hooks/useUserCheckpointsContext';
// Substitua pelo caminho correto
import HoursSummaryTable from '../HoursSummaryTable';

import processUserCheckpoints from './ProcessUserCheckpoints';

const UserHoursDashboard = () => {
  // const { mutateAsync: fetchUserCheckpoints } = useListUserCheckpoints();
  const {
    userCheckpoints,

    // loading,
  } = useUserCheckpointsContext();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       setLoading(true);
  //       const rawData = await fetchUserCheckpoints({});
  //       const processedData = processUserCheckpoints(rawData);
  //       setData(processedData);
  //     } catch (err: any) {
  //       setError('Erro ao buscar os dados. Por favor, tente novamente.');
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, [fetchUserCheckpoints]);

  useEffect(() => {
    // setData(userCheckpoints);

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

  if (loading) {
    return (
      <Card sx={{ padding: 4, margin: 2, textAlign: 'center' }}>
        <CircularProgress />
        <Typography variant="body1" sx={{ marginTop: 2 }}>
          Carregando dados...
        </Typography>
      </Card>
    );
  }

  if (error) {
    return (
      <Card sx={{ padding: 4, margin: 2, textAlign: 'center' }}>
        <Typography variant="body1" color="error">
          {error}
        </Typography>
      </Card>
    );
  }

  return (
    <div>
      <HoursSummaryTable data={data} />
    </div>
  );
};

export default UserHoursDashboard;
