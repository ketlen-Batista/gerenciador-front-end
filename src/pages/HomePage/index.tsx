import React from 'react';

import { Box, Grid } from '@mui/material';
import DefaultPage from '@src/templates/DefaultPage';
import { setores } from '@src/utils/constants';

import ButtonFilter from '@src/components/ButtonFilter';

const HomePage = () => {
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
      </Grid>
    </DefaultPage>
  );
};

export default HomePage;
