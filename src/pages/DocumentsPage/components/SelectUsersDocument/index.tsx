import React, { useEffect, useState } from 'react';

import { Box, Grid } from '@mui/material';
import { useGetContracts } from '@src/services/contractsService/queries';
import { useGetJobPositions } from '@src/services/jobPositions/queries';
import { useGetSectors } from '@src/services/sectorService/queries';
import { useGetUsers } from '@src/services/users/queries';
import { basicNames } from '@src/utils/constants';

import Checkbox from '@src/components/Checkbox';
import Select from '@src/components/Select';

import * as S from './styles';

interface SelectUsersDocumentProps {
  recipientId: string[];
  setRecipientId: React.Dispatch<React.SetStateAction<string[]>>;
}

const SelectUsersDocument = ({
  recipientId,
  setRecipientId,
}: SelectUsersDocumentProps) => {
  const [cargo, setCargo] = useState(null);
  const [setor, setSetor] = useState(null);
  const [contrato, setContrato] = useState(null);

  const { data: jobs, mutate: getJobs } = useGetJobPositions();
  const { data: contracts, mutate: getContracts } = useGetContracts();
  const { data: sectors, mutate: getSectors } = useGetSectors();
  const {
    data: users,
    mutate: getUsers,
    isPending: isPendingUsers,
  } = useGetUsers();

  let filteredUsers = users?.users?.filter((user) => {
    let matches = true;

    if (setor && user.sector_value !== setor) {
      matches = false;
    }

    if (contrato && user.contracts_value !== contrato) {
      matches = false;
    }

    if (cargo && user.jobPosition_id !== cargo) {
      matches = false;
    }

    return matches;
  });

  useEffect(() => {
    getJobs({});
    getContracts({});
    getSectors({});
    getUsers({});
    setCargo(null);
    setSetor(null);
    setContrato(null);
    setRecipientId([]);
  }, []);

  const handleCheckboxChange = (userId: string) => {
    if (recipientId.includes(userId)) {
      setRecipientId(recipientId.filter((id) => id !== userId));
    } else {
      setRecipientId([...recipientId, userId]);
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      gap={3}
      py={3}
      px={5}
      width="100%"
    >
      <S.ContainerSelects>
        <Grid container spacing={1}>
          <Grid item xs={4}>
            <S.FieldBox>
              <Select
                options={jobs}
                value={cargo}
                name={jobs?.find((item) => item.value === cargo)?.name}
                onChange={(e) => setCargo(e.value)}
                label={basicNames.office.singular}
                clearable
              />
            </S.FieldBox>
          </Grid>
          <Grid item xs={4}>
            <S.FieldBox>
              <Select
                options={contracts}
                value={contrato}
                name={contracts?.find((item) => item.value === setor)?.name}
                onChange={(e) => setContrato(e.value)}
                label={basicNames.sector.singular}
                clearable
              />
            </S.FieldBox>
          </Grid>
          <Grid item xs={4}>
            <S.FieldBox>
              <Select
                options={sectors}
                value={setor}
                name={sectors?.find((item) => item.value === setor)?.name}
                onChange={(e) => setSetor(e.value)}
                label={basicNames.section.singular}
                clearable
              />
            </S.FieldBox>
          </Grid>
        </Grid>
      </S.ContainerSelects>

      <Box fontSize="16px" fontWeight={500}>
        Selecione o(s) destinatário(s):
      </Box>

      <Grid container spacing={1}>
        {!isPendingUsers &&
          filteredUsers?.map((user) => (
            <Grid item xs={6} key={user.id}>
              <Checkbox
                label={user.name}
                checked={recipientId.includes(user.id)}
                onChange={() => handleCheckboxChange(user.id)}
                color="primary"
                size="medium"
              />
            </Grid>
          ))}
      </Grid>
    </Box>
  );
};

export default SelectUsersDocument;
