import React, { useState } from 'react';

import { Box, Grid } from '@mui/material';
import { colors } from '@src/styles/colors';
import { basicNames, cargos, permissionsNames } from '@src/utils/constants';

import Checkbox from '@src/components/Checkbox';
import Select from '@src/components/Select';
import Typography from '@src/components/Typography';

import * as S from '../styles';

type OptionType = {
  value: string | number;
  name: string;
};

const OptionEmpty = {
  value: '',
  name: '',
};

const PermissionsSettings = () => {
  const [cargo, setCargo] = useState<OptionType>(OptionEmpty);

  return (
    <div>
      <S.Container>
        <S.ContainerTitles>
          <S.Title>{basicNames.permission.plural}</S.Title>
          {/* <S.SubTitle>Lista de seções</S.SubTitle> */}
        </S.ContainerTitles>
        <Select
          label="Cargo"
          options={cargos}
          value={cargo?.value}
          name={cargo.name}
          onChange={setCargo}
          clearable
        />
      </S.Container>
      {cargo?.value !== '' && cargo?.value !== 'todos' ? (
        <Grid container>
          {permissionsNames.map((permission) => (
            <Grid
              item
              xs={12}
              mb={1}
              pt={1}
              px={1}
              pb={5}
              borderRadius={1}
              bgcolor={colors.secondary.states.focus}
            >
              <Checkbox
                label={permission.name}
                name={permission.name}
                key={permission.id}
                color="primary"
                size="medium"
              />

              <Grid container>
                {permission.subPermissions &&
                  permission.subPermissions.map((subPermission) => (
                    <Grid item xs={2} pl={4} mt={2}>
                      <Checkbox
                        label={subPermission.name}
                        name={subPermission.name}
                        key={subPermission.id}
                        color="primary"
                        size="small"
                      />
                    </Grid>
                  ))}
              </Grid>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box
          display="flex"
          height={400}
          justifyContent="center"
          alignItems="center"
          color={colors.error.dark}
        >
          <Typography>
            Selecione um cargo para configurar as permissões
          </Typography>
        </Box>
      )}
    </div>
  );
};

export default PermissionsSettings;
