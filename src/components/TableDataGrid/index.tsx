import React from 'react';
// import { DataGrid, DataGridProps } from '@material-ui/data-grid';
// import { makeStyles } from '@material-ui/core/styles';

import { Box, makeStyles } from '@material-ui/core';
import { DataGrid, DataGridProps } from '@mui/x-data-grid';

const useStyles = makeStyles({
  root: {
    // border: 0,
    '& .table-header': {
      fontWeight: 'bold',
      color: 'var(--GrayDark100)',
      background: 'var(--Light) !important',
    },
    '& .table-body': {
      color: 'var(--GrayDark200)',
      background: 'var(--Light)',
      borderBottom: '1px solid var(--Secundary)',
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
  rows: Array<any>;
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
        // className={classes}
        classes={classes}
      />
    </Box>
  );
}

{
  /* <DataGrid
  // className={classes.root}
  rows={rows}
  columns={columns}
  // pageSizeOptions={pageSize || 10}
  // autoHeight
  // disableColumnMenu
  // disableSelectionOnClick
  // hideFooterPagination={hidePagination || false}
  // hideFooter={hidePagination || false}
  // {...rest}
/> */
}
