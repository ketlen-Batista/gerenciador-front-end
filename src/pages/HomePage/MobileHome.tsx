import React, { useEffect } from 'react';

import { InfoOutlined } from '@mui/icons-material';
import ApartmentIcon from '@mui/icons-material/Apartment';
import GroupIcon from '@mui/icons-material/Group';
import StoreIcon from '@mui/icons-material/Store';
import { Box, Grid } from '@mui/material';
import { useAuth } from '@src/hooks/useAuth';
import {
  useGetItemsCountHome,
  useGetStatusCountHome,
} from '@src/services/homeServices/queries';
import { colors } from '@src/styles/colors';
import Chart from 'react-apexcharts';

import Typography from '@src/components/Typography';

const MobileHome = () => {
  const {
    data: itemsCountHome,
    mutateAsync: getItemsCountHome,
    isPending: isPendingItemsCountHome,
  } = useGetItemsCountHome();

  const { data: statusCountHome, mutateAsync: getStatusCountHome } =
    useGetStatusCountHome();

  const { permissions } = useAuth();
  console.log({ permissions });
  const options = {
    series: statusCountHome
      ? statusCountHome.map((item) => item?.count || 0)
      : [],
    chart: {
      type: 'pie',
      width: 500,
    },
    labels: statusCountHome
      ? statusCountHome.map((item) => item?.name || 'Desconhecido')
      : [],
    colors: ['#008FFB', '#00E396', '#FEB019', '#FF4560', '#775DD0'],
    legend: {
      show: true,
      showForSingleSeries: false,
      showForNullSeries: true,
      showForZeroSeries: true,
      position: 'top',
      horizontalAlign: 'center',
      verticalAlign: 'middle',
      fontSize: '14px',
      fontWeight: 400,
    },
    responsive: [
      {
        breakpoint: 280,
        options: {
          chart: {
            width: 500,
          },
        },
      },
    ],
  };

  useEffect(() => {
    getItemsCountHome({});
    getStatusCountHome({});
  }, []);
  // console.log({ itemsCountHome });
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} mt={6}>
        <Grid container spacing={1}>
          {!isPendingItemsCountHome &&
            itemsCountHome &&
            itemsCountHome?.map((item, index) => (
              <Grid item xs={6} key={index}>
                <Box
                  bgcolor={colors.basic.white}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  height="180px"
                  width={'100%'}
                  borderRadius={2}
                  flexDirection="column"
                  color={colors.basic.black}
                >
                  {item?.type && item?.count !== undefined && (
                    <>
                      {item?.type === 'contracts' && (
                        <>
                          <ApartmentIcon color="inherit" fontSize="large" />
                          <Typography>
                            {item?.count > 1
                              ? `${item?.count} contratos`
                              : `${item?.count} contrato`}
                          </Typography>
                        </>
                      )}
                      {item?.type === 'sectors' && (
                        <>
                          <StoreIcon color="inherit" fontSize="large" />
                          <Typography>
                            {item?.count > 1
                              ? `${item?.count} setores`
                              : `${item?.count} setor`}
                          </Typography>
                        </>
                      )}

                      {item?.type === 'jobs' && (
                        <>
                          <GroupIcon color="inherit" fontSize="large" />
                          <Typography>
                            {item?.count > 1
                              ? `${item?.count} cargos`
                              : `${item?.count} cargo`}
                          </Typography>
                        </>
                      )}
                    </>
                  )}

                  {item?.type === 'users' && (
                    <>
                      <GroupIcon color="inherit" fontSize="large" />
                      <Typography>
                        {item?.count > 1
                          ? `${item?.count} funcionários`
                          : `${item?.count} funcionário`}
                      </Typography>
                    </>
                  )}

                  {/* {item?.type === 'manager' && (
                      <HailIcon color="inherit" fontSize="large" />
                    )} */}
                </Box>
              </Grid>
            ))}
        </Grid>
      </Grid>

      <Grid
        item
        xs={12}
        mt={6}
        display="flex"
        justifyContent="center"
        // alignItems="center"
      >
        <Box
          display="flex"
          flexDirection="column"
          bgcolor={'var(--background'}
          color={'var(--ColorFont)'}
          borderRadius={2}
          height={'390px'}
          px={1}
          pt={2}
          mx={4}
        >
          <Typography
            variant="h6"
            fontWeight={600}
            mb={5}
            pl={6}
            color={'var(--ColorFont)'}
          >
            Status de funcionários
          </Typography>

          {!statusCountHome ? (
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              gap={1}
              height="100%"
              width="20rem"
              color={'var(--ColorFont)'}
            >
              <InfoOutlined color="warning" sx={{ height: 28, width: 28 }} />
              <Typography variant="body1" fontSize={17} color="warning.main">
                Sem dados para exibir
              </Typography>
            </Box>
          ) : (
            <Chart
              options={options ?? []}
              series={options.series ?? []}
              type="pie"
              width={320}
            />
          )}
        </Box>
      </Grid>
    </Grid>
  );
};

export default MobileHome;
