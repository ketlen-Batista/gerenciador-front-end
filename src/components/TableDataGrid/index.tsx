import React, { ReactNode } from 'react';

import { makeStyles } from '@material-ui/core';
import { InfoOutlined } from '@mui/icons-material';
import { Box } from '@mui/material';
import { DataGrid, DataGridProps, GridValidRowModel } from '@mui/x-data-grid';
import { colors } from '@src/styles/colors';

import Typography from '../Typography';

const useStyles = makeStyles({
  root: {
    // border: 0,
    '& .table-header': {
      fontWeight: 'bold !important',
      color: `${colors.basic.black} !important`,
      background: 'var(--Light) !important',
    },
    '& .table-body': {
      color: 'var(--Dark) !important',
      background: 'var(--Light) !important',
      borderBottom: '1px solid var(--Secundary) !important',
    },
    '& .MuiDataGrid-withBorderColor': {
      color: 'var(--GrayDark200)',
      background: 'var(--Light)  !important',
      borderBottom: '1px solid var(--Secundary)',
    },
    '& .MuiDataGrid-iconSeparator': {
      display: 'none',
    },
    '& .MuiDataGrid-colCellTitle': {
      whiteSpace: 'initial',
    },
  },
  footer: {
    color: 'var(--GrayDark200)',
    background: 'var(--Light)  !important',
    borderBottom: '1px solid var(--Secundary)',
  },
});

interface TableProps extends DataGridProps {
  rows: GridValidRowModel[];
  columns: Array<any>;
  pageSize?: number | any;
  messageNoRows?: string;
  //   hidePagination?: boolean;
  [propName: string]: any;
}

export default function TableDataGrid({
  rows,
  columns,
  pageSize,
  messageNoRows,
  //   hidePagination,
  //   extraStyles = {},
  ...rest
}: TableProps): JSX.Element {
  const classes = useStyles();

  const CustomNoRowsOverlay = () => (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
      }}
    >
      <Typography variant="h6">Sem dados para exibir</Typography>
    </Box>
  );

  return (
    // <div style={{ width: '100%', ...extraStyles }}>

    <Box width="100%" height={'100%'}>
      {!rows?.length ? (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          gap={1}
          height="200px"
        >
          <InfoOutlined color="warning" sx={{ height: 28, width: 28 }} />
          <Typography variant="body1" fontSize={17} color="warning.main">
            {messageNoRows ?? 'Sem dados para exibir'}
          </Typography>
        </Box>
      ) : (
        // <DataGrid
        //   rows={rows || []}
        //   columns={columns}
        //   autoHeight
        //   disableColumnMenu
        //   initialState={{
        //     pagination: {
        //       paginationModel: {
        //         pageSize: pageSize || 5,
        //       },
        //     },
        //   }}
        //   // pageSizeOptions={[5]}
        //   // pagination
        //   disableRowSelectionOnClick
        //   classes={classes}
        //   {...rest}
        // />

        <DataGrid
          rows={rows || []}
          columns={columns}
          // autoHeight
          disableColumnMenu
          disableRowSelectionOnClick
          initialState={{
            pagination: {
              paginationModel: { pageSize: pageSize || 5 },
            },
          }}
          classes={classes}
          {...rest}
        />
      )}
    </Box>
  );
}
