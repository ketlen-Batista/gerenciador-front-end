import React, { ReactNode } from 'react';

import { Box, makeStyles } from '@material-ui/core';
import { DataGrid, DataGridProps, GridValidRowModel } from '@mui/x-data-grid';
import { colors } from '@src/styles/colors';

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
  //   hidePagination?: boolean;
  //   [propName: string]: any;
}

export default function TableDataGrid({
  rows,
  columns,
  pageSize,
  //   hidePagination,
  //   extraStyles = {},
  //   ...rest
}: TableProps): JSX.Element {
  const classes = useStyles();

  return (
    // <div style={{ width: '100%', ...extraStyles }}>

    <Box width="100%">
      <DataGrid
        rows={rows}
        columns={columns}
        autoHeight
        disableColumnMenu
        // hideFooterPagination={hidePagination || false}
        // hideFooter={hidePagination || false}
        // pageSize={pageSize || 10}
        // disableSelectionOnClick
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: pageSize || 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        // checkboxSelection
        disableRowSelectionOnClick
        classes={classes}
      />
    </Box>
  );
}
