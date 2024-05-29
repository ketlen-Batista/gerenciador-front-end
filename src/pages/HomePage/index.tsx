import React from 'react';

import { Box, Chip, Grid } from '@mui/material';
import DefaultPage from '@src/templates/DefaultPage';
import { setores } from '@src/utils/constants';
import Chart from 'react-apexcharts';

import ButtonFilter from '@src/components/ButtonFilter';

const HomePage = () => {
  var options = {
    series: [44, 100, 13, 43, 22],
    chart: {
      width: 400,
      type: 'pie',
    },
    labels: [
      'Licença Paternidade',
      'Trabalhando',
      'Licença Maternidade',
      'Atestado',
      'Férias',
    ],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 400,
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
  };

  return (
    <DefaultPage pageTitle="Início">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box display="flex" flexDirection="row" justifyContent="flex-end">
            {setores?.map((item) => (
              <ButtonFilter key={item.value} textButton={item.name} />
            ))}
          </Box>
        </Grid>

        <Grid item xs={6}>
          <Chip label="Small" size="small" />
        </Grid>

        <Grid item xs={6}>
          <Chart
            options={options}
            series={options.series}
            type="pie"
            width={500}
          />
        </Grid>
      </Grid>
    </DefaultPage>
  );
};

export default HomePage;
