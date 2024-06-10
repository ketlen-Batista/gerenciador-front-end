import React from 'react';

import ApartmentIcon from '@mui/icons-material/Apartment';
import GroupIcon from '@mui/icons-material/Group';
import HailIcon from '@mui/icons-material/Hail';
import StoreIcon from '@mui/icons-material/Store';
import { Box, Chip, Grid } from '@mui/material';
import { colors } from '@src/styles/colors';
import DefaultPage from '@src/templates/DefaultPage';
import { sectorsData, setores } from '@src/utils/constants';
import Chart from 'react-apexcharts';

import ButtonFilter from '@src/components/ButtonFilter';
import Typography from '@src/components/Typography';

const HomePage = () => {
  // const options = {
  //   series: [44, 100, 13, 43, 22],
  //   chart: {
  //     width: 400,
  //     type: 'pie',
  //   },
  //   labels: [
  //     'Licença Paternidade',
  //     'Trabalhando',
  //     'Licença Maternidade',
  //     'Atestado',
  //     'Férias',
  //   ],
  //   legend: {
  //     show: true, // Ocultar legenda padrão
  //   },
  //   responsive: [
  //     {
  //       breakpoint: 480,
  //       options: {
  //         chart: {
  //           width: 300,
  //         },
  //       },
  //     },
  //   ],
  // };

  const options = {
    series: [44, 100, 13, 43, 22],
    chart: {
      type: 'pie',
      width: 500,
    },
    labels: [
      'Licença Paternidade',
      'Trabalhando',
      'Licença Maternidade',
      'Atestado',
      'Férias',
    ],
    colors: ['#008FFB', '#00E396', '#FEB019', '#FF4560', '#775DD0'],
    legend: {
      show: true,
      showForSingleSeries: false,
      showForNullSeries: true,
      showForZeroSeries: true,
      position: 'left',
      horizontalAlign: 'center',
      verticalAlign: 'middle',
      fontSize: '16px',
      fontWeight: 400,
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 300,
          },
        },
      },
    ],
  };

  return (
    <DefaultPage pageTitle="Início">
      <Grid container spacing={2} px={8}>
        <Grid item xs={12}>
          <Box display="flex" flexDirection="row" justifyContent="flex-end">
            {setores?.map((item) => (
              <ButtonFilter key={item.value} textButton={item.name} />
            ))}
          </Box>
        </Grid>

        <Grid item xs={6} p={10} mt={6}>
          <Grid container spacing={1}>
            {sectorsData &&
              sectorsData.map((item) => (
                <Grid item xs={5}>
                  <Box
                    bgcolor={colors.basic.white}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    height="180px"
                    borderRadius={2}
                    flexDirection="column"
                    color={colors.basic.black}
                  >
                    {item.value?.toLowerCase() === 'sector' && (
                      <ApartmentIcon color="inherit" fontSize="large" />
                    )}
                    {item.value?.toLowerCase() === 'section' && (
                      <StoreIcon color="inherit" fontSize="large" />
                    )}
                    {item.value?.toLowerCase() === 'employee' && (
                      <GroupIcon color="inherit" fontSize="large" />
                    )}
                    {item.value?.toLowerCase() === 'manager' && (
                      <HailIcon color="inherit" fontSize="large" />
                    )}
                    <Typography>
                      {item.quantity > 1
                        ? `${item.quantity} ${item.namePlural}`
                        : `${item.quantity} ${item.nameSingular}`}
                    </Typography>
                  </Box>
                </Grid>
              ))}
          </Grid>
        </Grid>

        <Grid
          item
          xs={6}
          mt={6}
          display="flex"
          justifyContent="center"
          // alignItems="center"
        >
          <Box
            display="flex"
            flexDirection="column"
            bgcolor={colors.basic.white}
            borderRadius={2}
            height={'390px'}
            px={5}
            pt={2}
          >
            <Typography variant="h6" fontWeight={600} mb={5}>
              Status de funcionários
            </Typography>

            <Chart
              options={options}
              series={options.series}
              type="pie"
              width={500}
            />
          </Box>
        </Grid>
      </Grid>
    </DefaultPage>
  );
};

export default HomePage;
