import React, { useEffect, useState } from 'react';

import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import { Box, IconButton, Tooltip } from '@mui/material';
import { useAuth } from '@src/hooks/useAuth';
import { useDeleteStatus } from '@src/services/status/queries';
import { colors } from '@src/styles/colors';
import { basicNames } from '@src/utils/constants';
import { UseMutateFunction } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import ModalConfirm from '@src/components/ModalConfirm';
import TableDataGrid from '@src/components/TableDataGrid';

import ModalStatus from '../ModalStatus';

type CustomStatussRequest = { value: number; name: string };
type CustomStatussResponse = { id: number; name: string };

interface TableStatussProps {
  status: any[];
  getStatuss?: UseMutateFunction<
    any,
    AxiosError<unknown, any>,
    unknown,
    unknown
  >;
  isPending: boolean;
}
function Table({ status, getStatuss, isPending }: TableStatussProps) {
  const { mutateAsync: handleDeleteStatus, isPending: isPendingDelete } =
    useDeleteStatus();

  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [isOpenModalDelete, setIsOpenModalDelete] = useState<boolean>(false);
  const [statusName, setStatusName] = useState(null);
  const [statusId, setStatusId] = useState(null);

  const { permissions } = useAuth();

  const customStatuss = (
    statusparams: CustomStatussRequest[],
  ): CustomStatussResponse[] => {
    return statusparams?.map((status: { value: number; name: string }) => ({
      id: status.value,
      name: status.name,
    }));
  };

  useEffect(() => {
    getStatuss({});
  }, []);

  const handleCloseModal = () => {
    setOpenDialog(false);
    setStatusId(null);
    getStatuss({});
  };

  const handleOpenModal = (name, id) => {
    setOpenDialog(true);
    setStatusName(name);
    setStatusId(id);
  };

  const handleOpenModalDelete = (id: number) => {
    if (id > 10) {
      setIsOpenModalDelete(true);
      setStatusId(id);
    }
  };

  const handleCloseModalDelete = () => {
    setIsOpenModalDelete(false);
    setStatusId(null);
    getStatuss({});
  };

  const handleDelete = async () => {
    // if (statusId > 7) {
    await handleDeleteStatus(statusId);
    handleCloseModalDelete();
    // }
  };

  const columns = [
    {
      field: 'name',
      headerName: `${basicNames.office.singular}`,
      flex: 3,
      headerClassName: 'table-header',
      cellClassName: 'table-body',
    },
    {
      field: 'actions',
      headerName: '',
      flex: 2,
      headerClassName: 'table-header',
      cellClassName: 'table-body',
      renderCell: (params) => (
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
          }}
        >
          <Tooltip title="Editar" placement="top">
            <IconButton
              onClick={() => handleOpenModal(params.row.name, params.row.id)}
              disabled={!permissions?.['editUser']}
            >
              <div
                style={{
                  display: 'flex',
                  color: 'var(--GrayDark200)',
                }}
              >
                <CreateOutlinedIcon fontSize="medium" />
              </div>
            </IconButton>
          </Tooltip>
          <Tooltip title="Deletar" placement="top">
            <IconButton
              onClick={() => handleOpenModalDelete(params.row.id)}
              disabled={!permissions?.['editUser']}
            >
              <Box
                // style={{
                //   display: 'flex',
                //   color:
                //     params.row.id < 4
                //       ? colors.text.disabled
                //       : colors.error.dark,
                // }}

                display="flex"
                color={colors.error.light}
              >
                <DeleteOutlinedIcon
                  fontSize="medium"
                  color="inherit"
                  htmlColor={
                    params.row.id < 10
                      ? colors.text.disabled
                      : colors.error.dark
                  }
                />
              </Box>
            </IconButton>
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    !isPending && (
      <>
        <TableDataGrid
          columns={columns}
          rows={customStatuss(status || [])}
          pageSize={7}
          loading={isPending}
        />
        {openDialog && (
          <ModalStatus
            openDialog={openDialog}
            handleClose={handleCloseModal}
            statusName={statusName}
            statusId={statusId}
            getStatuss={getStatuss}
          />
        )}
        {isOpenModalDelete && (
          <ModalConfirm
            openDialog={isOpenModalDelete}
            handleClose={handleCloseModalDelete}
            handleConfirm={handleDelete}
            isLoading={isPendingDelete}
            textButtonConfirm={'Excluir'}
            colorButtonConfirm={colors.error.dark}
            text={
              'Essa ação não poderá ser desfeita. Deseja realmente excluir este cargo?'
            }
            titleModal={'Excluir'}
          />
        )}
      </>
    )
  );
}

export default Table;
