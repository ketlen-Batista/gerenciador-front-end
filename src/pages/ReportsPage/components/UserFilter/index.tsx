// import React, { useRef } from 'react';
// import { FormControl, Grid } from '@mui/material';
// import { useUserCheckpointsContext } from '@pages/ReportsPage/hooks/useUserCheckpointsContext';
// import { INIT_DATE_RANGE } from '@src/utils/dates';
// import DateFilter from '@src/components/DateFilter';
// import Select from '@src/components/Select';
// import { basicNames } from '@src/utils/constants';
// const UserFilter = () => {
//   const ref = useRef(null);
//   const { users, setFilterUserId, filterUserId, handleDateFilter,
//     cargo,
//     setCargo,
//     setSetor,
//     setContrato,
//     setor,
//     contrato,
//    } =
//     useUserCheckpointsContext();
//   const usersCustomSelect = users.map((user) => {
//     return {
//       value: user.id,
//       name: user.name,
//     };
//   });
//   const handleChangeFilter = (name: string, value?: number | string | null) => {
//     switch (name) {
//       // case 'search':
//       //   setSearch(value);
//       //   break;
//       case 'cargo':
//         setCargo(value);
//         break;
//       case 'setor':
//         setSetor(value);
//         break;
//       case 'contrato':
//         setContrato(value);
//         break;
//       default:
//         break;
//     }
//   };
//   return (
//     <Grid container spacing={2} alignItems="center">
//       <Grid item xs={3}>
//         <FormControl fullWidth>
//           <Select
//             label="Usuário"
//             options={usersCustomSelect}
//             value={filterUserId}
//             onChange={(e) => setFilterUserId(e.value)}
//             clearable
//           />
//         </FormControl>
//       </Grid>
//       <Grid item xs={2}>
//         {/* <S.FieldBox> */}
//         <Select
//           options={jobs}
//           value={cargo}
//           onChange={(e) => handleChangeFilter('cargo', e.value)}
//           label={basicNames.office.singular}
//           clearable
//         />
//         {/* </S.FieldBox> */}
//       </Grid>
//       <Grid item xs={2}>
//         {/* <S.FieldBox> */}
//         <Select
//           options={filteredContracts}
//           value={contrato}
//           onChange={(e) => handleChangeFilter('contrato', e.value)}
//           label={basicNames.sector.singular}
//           clearable
//         />
//         {/* </S.FieldBox> */}
//       </Grid>
//       <Grid item xs={2}>
//         {/* <S.FieldBox> */}
//         <Select
//           options={filteredSectors}
//           value={setor}
//           onChange={(e) => handleChangeFilter('setor', e.value)}
//           label={basicNames.section.singular}
//           clearable
//         />
//         {/* </S.FieldBox> */}
//       </Grid>
//       <Grid item xs={3}>
//         <DateFilter
//           ref={ref}
//           initialRange={INIT_DATE_RANGE}
//           onFilter={handleDateFilter}
//         />
//       </Grid>
//     </Grid>
//   );
// };
// export default UserFilter;
/////////////////////////////////////////////////////////
// import React, { useRef } from 'react';
// import { FormControl, Grid } from '@mui/material';
// import { useUserCheckpointsContext } from '@pages/ReportsPage/hooks/useUserCheckpointsContext';
// import { basicNames } from '@src/utils/constants';
// import { INIT_DATE_RANGE } from '@src/utils/dates';
// import DateFilter from '@src/components/DateFilter';
// import Select from '@src/components/Select';
// const UserFilter = () => {
//   const ref = useRef(null);
//   const {
//     users,
//     setFilterUserId,
//     filterUserId,
//     handleDateFilter,
//     cargo,
//     setCargo,
//     setSetor,
//     setContrato,
//     setor,
//     contrato,
//     jobs,
//     contracts,
//     sectors,
//   } = useUserCheckpointsContext();
//   const usersCustomSelect = users.map((user) => {
//     return {
//       value: user.id,
//       name: user.name,
//     };
//   });
//   const handleChangeFilter = (name: string, value?: number | string | null) => {
//     switch (name) {
//       case 'cargo':
//         setCargo(value);
//         break;
//       case 'setor':
//         setSetor(value);
//         break;
//       case 'contrato':
//         setContrato(value);
//         break;
//       default:
//         break;
//     }
//   };
//   return (
//     <Grid container spacing={2} alignItems="center">
//       <Grid item xs={3}>
//         <FormControl fullWidth>
//           <Select
//             label="Usuário"
//             options={usersCustomSelect}
//             value={filterUserId}
//             onChange={(e) => setFilterUserId(e.value as string)}
//             clearable
//           />
//         </FormControl>
//       </Grid>
//       <Grid item xs={2}>
//         <Select
//           options={jobs}
//           value={cargo}
//           onChange={(e) => handleChangeFilter('cargo', e.value)}
//           label={basicNames.office.singular}
//           clearable
//         />
//       </Grid>
//       <Grid item xs={2}>
//         <Select
//           options={contracts}
//           value={contrato}
//           onChange={(e) => handleChangeFilter('contrato', e.value)}
//           label={basicNames.sector.singular}
//           clearable
//         />
//       </Grid>
//       <Grid item xs={2}>
//         <Select
//           options={sectors}
//           value={setor}
//           onChange={(e) => handleChangeFilter('setor', e.value)}
//           label={basicNames.section.singular}
//           clearable
//         />
//       </Grid>
//       <Grid item xs={3}>
//         <DateFilter
//           ref={ref}
//           initialRange={INIT_DATE_RANGE}
//           onFilter={handleDateFilter}
//         />
//       </Grid>
//     </Grid>
//   );
// };
// export default UserFilter;
////////////////////////////////
import React, { useRef } from 'react';

import { FormControl, Grid } from '@mui/material';
import { useUserCheckpointsContext } from '@pages/ReportsPage/hooks/useUserCheckpointsContext';
import useResponsive from '@src/hooks/useResponsive';
import { basicNames } from '@src/utils/constants';
import { INIT_DATE_RANGE } from '@src/utils/dates';

import DateFilter from '@src/components/DateFilter';
import Select from '@src/components/Select';

const UserFilter = () => {
  const ref = useRef(null);
  const {
    users,
    setFilterUserId,
    filterUserId,
    handleDateFilter,
    cargo,
    setCargo,
    setSetor,
    setContrato,
    setor,
    contrato,
    jobs,
    contracts,
    sectors,
  } = useUserCheckpointsContext();
  const { isDesktop } = useResponsive();

  const usersCustomSelect = users.map((user) => ({
    value: user?.id,
    name: user?.name,
  }));

  const handleChangeFilter = (name: string, value?: number | string | null) => {
    switch (name) {
      case 'cargo':
        setCargo(value);
        break;
      case 'setor':
        setSetor(value);
        break;
      case 'contrato':
        setContrato(value);
        break;
      default:
        break;
    }
  };

  return (
    <Grid
      // container
      // spacing={2}
      // alignItems="center"
      container
      spacing={2}
      direction={isDesktop ? 'row' : 'column'} // Ajusta a direção do layout com base na responsividade
    >
      <Grid item xs={!isDesktop ? 12 : 2}>
        <Select
          label="Usuário"
          options={usersCustomSelect}
          value={filterUserId}
          onChange={(e) => setFilterUserId(e.value as string)}
          clearable
        />
      </Grid>

      <Grid item xs={!isDesktop ? 12 : 2}>
        <Select
          options={jobs}
          value={cargo}
          onChange={(e) => handleChangeFilter('cargo', e.value)}
          label={basicNames.office.singular}
          clearable
        />
      </Grid>
      <Grid item xs={!isDesktop ? 12 : 2}>
        <Select
          options={contracts}
          value={contrato}
          onChange={(e) => handleChangeFilter('contrato', e.value)}
          label={basicNames.sector.singular}
          clearable
        />
      </Grid>
      <Grid item xs={!isDesktop ? 12 : 3}>
        <Select
          options={sectors}
          value={setor}
          onChange={(e) => handleChangeFilter('setor', e.value)}
          label={basicNames.section.singular}
          clearable
        />
      </Grid>
      <Grid item xs={!isDesktop ? 12 : 3}>
        <DateFilter
          ref={ref}
          initialRange={INIT_DATE_RANGE}
          onFilter={handleDateFilter}
        />
      </Grid>
    </Grid>
  );
};

export default UserFilter;
