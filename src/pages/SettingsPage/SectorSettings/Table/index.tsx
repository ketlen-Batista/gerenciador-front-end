import React, { useEffect, useState } from 'react';

import { IconButton } from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import { useAuth } from '@src/hooks/useAuth';
import { useDeleteSector } from '@src/services/sectorService/queries';
import { colors } from '@src/styles/colors';
import { basicNames } from '@src/utils/constants';
import { UseMutateFunction } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import ModalConfirm from '@src/components/ModalConfirm';
import TableDataGrid from '@src/components/TableDataGrid';

import ModalSectors from '../ModalSectors';

interface TableSectorsProps {
  sectors: any[];
  getSectors?: UseMutateFunction<
    any,
    AxiosError<unknown, any>,
    unknown,
    unknown
  >;
  isPending: boolean;
}

function Table({ sectors, isPending, getSectors }: TableSectorsProps) {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [sectorName, setSectorName] = useState(null);
  const [contractId, setContractId] = useState(null);
  const [linkLocation, setLinkLocation] = useState('');
  const [sectorId, setSectorId] = useState(null);

  const [email, setEmail] = useState('');
  const [daySignature, setDaySignature] = useState(null);
  const [isOpenModalDelete, setIsOpenModalDelete] = useState<boolean>(false);
  const [sectorIdToDelete, setSectorIdToDelete] = useState<number | null>(null);

  const { permissions } = useAuth();

  const {
    mutateAsync: deleteContract,
    isPending: isPendingDelete,
    isSuccess: isSuccessDelete,
  } = useDeleteSector();

  const handleCloseModal = () => {
    setOpenDialog(false);
  };

  const handleOpenModal = (
    name,
    id,
    idContract,
    locationLink,
    email,
    daySignature,
  ) => {
    setOpenDialog(true);
    setSectorName(name);
    setEmail(email);
    setDaySignature(daySignature);
    setLinkLocation(locationLink);
    setSectorId(id);
    setContractId(idContract);
  };

  const handleOpenModalDelete = (id: number) => {
    setIsOpenModalDelete(true);
    setSectorIdToDelete(id);
  };

  const handleCloseModalDelete = () => {
    setIsOpenModalDelete(false);
    setSectorIdToDelete(null);
  };

  const handleDelete = () => {
    deleteContract({ id: sectorIdToDelete });
    handleCloseModalDelete();
  };

  useEffect(() => {
    getSectors({});
  }, []);

  useEffect(() => {
    if (isSuccessDelete) {
      getSectors({});
    }
  }, [isSuccessDelete]);

  const columns = [
    {
      field: 'name',
      headerName: basicNames.section.singular,
      flex: 3,
      headerClassName: 'table-header',
      cellClassName: 'table-body',
    },
    {
      field: 'contractName',
      headerName: basicNames.sector.singular,
      flex: 2,
      headerClassName: 'table-header',
      cellClassName: 'table-body',
    },
    {
      field: 'quantityUsers',
      headerName: 'N° de usuários por Setor',
      flex: 2,
      headerClassName: 'table-header',
      cellClassName: 'table-body',
    },
    {
      field: 'phone',
      headerName: 'Telefone',
      flex: 2,
      headerClassName: 'table-header',
      cellClassName: 'table-body',
    },
    {
      field: 'location',
      headerName: 'Localização',
      flex: 2,
      headerClassName: 'table-header',
      cellClassName: 'table-body',
      renderCell: (params) =>
        params.row.linkLocation ? (
          <a
            href={params.row.linkLocation}
            target="_blank"
            rel="noopener noreferrer"
          >
            Ver localização
          </a>
        ) : null,
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
              onClick={() =>
                handleOpenModal(
                  params.row.name,
                  params.row.id,
                  params.row.contractId,
                  params.row.linkLocation,
                  params.row.email,
                  params.row.signatureDate,
                )
              }
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
      <TableDataGrid columns={columns} rows={sectors} loading={isPending} />

      {openDialog && (
        <ModalSectors
          openDialog={openDialog}
          handleClose={handleCloseModal}
          sectorName={sectorName}
          idContract={contractId}
          linkLocation={linkLocation}
          sectorId={sectorId}
          email={email}
          daySignature={daySignature}
          getSectors={getSectors}
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
            'Essa ação não poderá ser desfeita. Deseja realmente excluir este setor?'
          }
          titleModal={'Excluir'}
        />
      )}
    </>
  ) : null;
}

export default Table;
