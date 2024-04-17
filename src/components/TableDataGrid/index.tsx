import React from 'react';
// import { DataGrid, DataGridProps } from '@material-ui/data-grid';
// import { makeStyles } from '@material-ui/core/styles';

import { Box, makeStyles } from '@material-ui/core';
import { DataGrid, DataGridProps } from '@mui/x-data-grid';

const useStyles = makeStyles({
  root: {
    // border: 0,
    '& .table-header': {
      fontFamily: 'Poppins Regular',
      fontWeight: 600,
      color: 'var(--ColorFont)',
      background: 'var(--Background) !important',
      // borderBottom: 1px solid ${Colors.gray.nearWhite},
    },
    '& .table-body': {
      fontFamily: 'Poppins Regular',
      color: 'var(--ColorFont)',
      background: 'var(--Background)',
      borderBottom: '1px solid var(--Secundary)',
    },
    '& .MuiDataGrid-iconSeparator': {
      display: 'none',
    },
    '& .MuiDataGrid-colCellTitle': {
      whiteSpace: 'initial',
    },
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

    <Box sx={{ width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
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
