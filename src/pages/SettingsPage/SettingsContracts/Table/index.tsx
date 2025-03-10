import React, { useEffect, useState } from 'react';

import { IconButton } from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import { useAuth } from '@src/hooks/useAuth';
import { useDeleteContract } from '@src/services/contractsService/queries';
import { colors } from '@src/styles/colors';
import { basicNames } from '@src/utils/constants';
import { formatDateDayMonthAndYear } from '@src/utils/dates';
import { UseMutateFunction } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import ModalConfirm from '@src/components/ModalConfirm';
import TableDataGrid from '@src/components/TableDataGrid';

import ModalContracts from '../ModalContracts';

interface TableContractsProps {
  contracts: any[];
  getContracts?: UseMutateFunction<
    any,
    AxiosError<unknown, any>,
    unknown,
    unknown
  >;
  isPending: boolean;
}

function Table({ contracts, getContracts, isPending }: TableContractsProps) {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [contractName, setContractName] = useState(null);
  const [contractStatus, setContractStatus] = useState(null);
  const [contractValidity, setContractValidity] = useState(null);
  const [contractId, setContractId] = useState(null);
  const [isOpenModalDelete, setIsOpenModalDelete] = useState<boolean>(false);
  const [contractIdToDelete, setContractIdToDelete] = useState<number | null>(
    null,
  );

  const {
    mutateAsync: deleteContract,
    isPending: isPendingDelete,
    isSuccess: isSuccessDelete,
  } = useDeleteContract();

  const handleCloseModal = () => {
    setOpenDialog(false);
  };
  const { permissions } = useAuth();

  const handleOpenModal = (name, id, status, validity) => {
    setOpenDialog(true);
    setContractName(name);
    setContractId(id);
    setContractStatus(status);
    setContractValidity(validity);
  };

  const handleOpenModalDelete = (id: number) => {
    setIsOpenModalDelete(true);
    setContractIdToDelete(id);
  };

  const handleCloseModalDelete = () => {
    setIsOpenModalDelete(false);
    setContractIdToDelete(null);
  };

  const handleDelete = async () => {
    await deleteContract({ id: contractIdToDelete });
    handleCloseModalDelete();
  };

  useEffect(() => {
    getContracts({});
  }, []);

  useEffect(() => {
    if (isSuccessDelete) {
      getContracts({});
    }
  }, [isSuccessDelete]);

  const columns = [
    {
      field: 'name',
      headerName: basicNames.sector.singular,
      flex: 2,
      headerClassName: 'table-header',
      cellClassName: 'table-body',
    },
    {
      field: 'quantityUsers',
      headerName: 'N° de usuários por contrato',
      flex: 2,
      headerClassName: 'table-header',
      cellClassName: 'table-body',
    },
    {
      field: 'quantitySectors',
      headerName: 'N° de setores',
      flex: 2,
      headerClassName: 'table-header',
      cellClassName: 'table-body',
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 2,
      headerClassName: 'table-header',
      cellClassName: 'table-body',
    },
    {
      field: 'validity',
      headerName: 'Vigência',
      flex: 2,
      headerClassName: 'table-header',
      cellClassName: 'table-body',
      renderCell: (params) => (
        <div>{params.value ? formatDateDayMonthAndYear(params.value) : ''}</div>
      ),
    },
    {
      field: 'actions',
      headerName: '',
      flex: 1,
      headerClassName: 'table-header',
      cellClassName: 'table-body',
      renderCell: (params) => (
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '100%',
          }}
        >
          <Tooltip title="Editar" placement="top">
            <IconButton
              disabled={!permissions?.['editUser']}
              onClick={() =>
                handleOpenModal(
                  params.row.name,
                  params.row.id,
                  params.row.status,
                  params.row.validity,
                )
              }
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
              <div
                style={{
                  display: 'flex',
                  color: 'var(--Danger)',
                }}
              >
                <DeleteOutlinedIcon fontSize="medium" />
              </div>
            </IconButton>
          </Tooltip>
        </div>
      ),
    },
  ];

  return !isPending ? (
    <>
      <TableDataGrid
        columns={columns}
        rows={contracts}
        pageSize={8}
        messageNoRows="Sem contratos para exibir"
        loading={isPending}
      />
      {openDialog && (
        <ModalContracts
          openDialog={openDialog}
          handleClose={handleCloseModal}
          contractName={contractName}
          contractId={contractId}
          getContracts={getContracts}
          contractStatus={contractStatus}
          contractValidity={contractValidity}
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
            'Essa ação não poderá ser desfeita. Deseja realmente excluir este contrato?'
          }
          titleModal={'Excluir'}
        />
      )}
    </>
  ) : null;
}

export default Table;
