import React, { useEffect, useState } from 'react';

import { Box, Grid } from '@mui/material';
import useResponsive from '@src/hooks/useResponsive';
import useSnackbar from '@src/hooks/useSnackbar';
import { useGetJobPositions } from '@src/services/jobPositions/queries';
import { PermissionsUpdate } from '@src/services/permissions/dto';
import { colors } from '@src/styles/colors';

import Checkbox from '@src/components/Checkbox';
import CircularProgress from '@src/components/CircularProgress';
import Select from '@src/components/Select';
import Typography from '@src/components/Typography';

import {
  useGetPermissions,
  useUpdatePermissions,
} from '@services/permissions/queries';

import { translate } from './translation';

import * as S from './styles';

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
  const [permissions, setPermissions] = useState<Record<string, boolean>>({});
  const { mutateAsync: fetchPermissions } = useGetPermissions();
  const { mutateAsync: updatePermissions, isPending: isLoadingUpdate } =
    useUpdatePermissions();
  const { data: jobs, mutate: getJobs } = useGetJobPositions();
  const { showSnackbar } = useSnackbar();
  const { isDesktop } = useResponsive();

  useEffect(() => {
    if (cargo?.value) {
      fetchPermissions(Number(cargo.value))
        .then((data) => setPermissions(data))
        .catch((error) => console.error('Erro ao buscar permissões:', error));
    }
  }, [cargo, fetchPermissions]);
  const handleCheckboxChange = (permission: string) => {
    setPermissions((prevPermissions) => ({
      ...prevPermissions,
      [permission]: !prevPermissions[permission],
    }));
  };
  const handleSave = () => {
    if (cargo.value) {
      const dataToUpdate: PermissionsUpdate = {
        jobId: Number(cargo.value),
        ...permissions,
      };
      updatePermissions(dataToUpdate)
        .then(() =>
          showSnackbar({
            message: 'Atualização feita com sucesso.',
            type: 'success',
          }),
        )
        .catch((error) =>
          console.error('Erro ao atualizar permissões:', error),
        );
    }
  };
  useEffect(() => {
    getJobs({});
  }, [getJobs]);
  // Permissões definidas diretamente
  const permissionsNames = [
    { id: 'mobile', name: translate('mobile', 'pt') },
    { id: 'desktop', name: translate('desktop', 'pt') },
    { id: 'home', name: translate('home', 'pt') },
    // { id: 'homeAdmin', name: translate('homeAdmin', 'pt') },
    // { id: 'homeBasic', name: translate('homeBasic', 'pt') },
    { id: 'pageEmployess', name: translate('pageEmployess', 'pt') },
    // { id: 'deleteUser', name: translate('deleteUser', 'pt') },
    // { id: 'editUser', name: translate('editUser', 'pt') },
    { id: 'company', name: translate('company', 'pt') },
    // { id: 'companyAdmin', name: translate('companyAdmin', 'pt') },
    // { id: 'companyBasic', name: translate('companyBasic', 'pt') },
    { id: 'reports', name: translate('reports', 'pt') },
    { id: 'pointEletronic', name: translate('pointEletronic', 'pt') },
    { id: 'servicesRegister', name: translate('servicesRegister', 'pt') },
    { id: 'documentsPage', name: translate('documentsPage', 'pt') },
    // { id: 'documentsAdmin', name: translate('documentsAdmin', 'pt') },
    // { id: 'documentsBasic', name: translate('documentsBasic', 'pt') },
    { id: 'configs', name: translate('configs', 'pt') },
    { id: 'configContract', name: translate('configContract', 'pt') },
    { id: 'configSector', name: translate('configSector', 'pt') },
    { id: 'configOffice', name: translate('configOffice', 'pt') },
    { id: 'configPermission', name: translate('configPermission', 'pt') },
  ];
  return (
    <div>
      {isDesktop ? (
        <S.Container>
          <S.ContainerTitles>
            <S.Title>Configuração de Permissões</S.Title>
          </S.ContainerTitles>
          <Box width={'30%'}>
            <Select
              options={jobs}
              value={cargo?.value}
              name={cargo?.name}
              onChange={(event) => {
                const selectedValue = event.value;
                const selectedOption = jobs.find(
                  (job) => job.value === selectedValue,
                );
                setCargo(selectedOption || OptionEmpty);
              }}
              label={translate('Select a position')}
              clearable
            />
          </Box>
        </S.Container>
      ) : (
        <Grid container mb={3}>
          <Grid item xs={12}>
            <S.ContainerTitles>
              <S.Title>Configuração de Permissões</S.Title>
            </S.ContainerTitles>
          </Grid>
          <Grid item xs={12}>
            <Select
              options={jobs}
              value={cargo?.value}
              name={cargo?.name}
              onChange={(event) => {
                const selectedValue = event.value;
                const selectedOption = jobs.find(
                  (job) => job.value === selectedValue,
                );
                setCargo(selectedOption || OptionEmpty);
              }}
              label={translate('Select a position')}
              clearable
            />
          </Grid>
        </Grid>
      )}
      {cargo?.value ? (
        <>
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
                key={permission.id}
              >
                <Checkbox
                  label={permission.name}
                  name={permission.id}
                  checked={permissions[permission.id] || false}
                  onChange={() => handleCheckboxChange(permission.id)}
                  color="primary"
                  size="medium"
                />
              </Grid>
            ))}
          </Grid>
          <Box mt={2}>
            <Box display="flex" justifyContent="flex-end" width="100%">
              <S.ButtonClick onClick={handleSave}>
                {isLoadingUpdate ? (
                  <CircularProgress size="small" color="primary" />
                ) : (
                  'Salvar'
                )}
              </S.ButtonClick>
            </Box>
          </Box>
        </>
      ) : (
        <Box
          display="flex"
          height={400}
          justifyContent="center"
          alignItems="center"
          color={colors.error.dark}
        >
          <Typography>
            {translate('Select a position to configure permissions')}
          </Typography>
        </Box>
      )}
    </div>
  );
};
export default PermissionsSettings;
