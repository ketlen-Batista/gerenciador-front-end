import React, { useEffect, useState } from 'react';

import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import { IconButton, Tooltip } from '@mui/material';
import {
  useDeleteJobPosition,
  useGetJobPositions,
} from '@src/services/jobPositions/queries';
import { colors } from '@src/styles/colors';
import { basicNames } from '@src/utils/constants';
import { UseMutateFunction } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import ModalConfirm from '@src/components/ModalConfirm';
import TableDataGrid from '@src/components/TableDataGrid';

import ModalJob from '../ModalJob';

type CustomJobsRequest = { value: number; name: string };
type CustomJobsResponse = { id: number; name: string };

interface TableJobsProps {
  jobs: any[];
  getJobs?: UseMutateFunction<any, AxiosError<unknown, any>, unknown, unknown>;
  isPending: boolean;
  handleOpenModal: (name: string, id: number) => void;
  handleOpenModalDelete: (id: number) => void;
}
function Table({
  jobs,
  getJobs,
  isPending,
  handleOpenModal,
  handleOpenModalDelete,
}: TableJobsProps) {
  const customJobs = (
    jobsparams: CustomJobsRequest[],
  ): CustomJobsResponse[] => {
    return jobsparams?.map((job: { value: number; name: string }) => ({
      id: job.value,
      name: job.name,
    }));
  };

  useEffect(() => {
    getJobs({});
  }, []);

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
      flex: 1,
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
            <IconButton>
              <div
                style={{
                  display: 'flex',
                  color: 'var(--GrayDark200)',
                }}
                onClick={() => handleOpenModal(params.row.name, params.row.id)}
              >
                <CreateOutlinedIcon fontSize="medium" />
              </div>
            </IconButton>
          </Tooltip>

          <Tooltip title="Deletar" placement="top">
            <IconButton>
              <div
                style={{
                  display: 'flex',
                  color: 'var(--Danger)',
                }}
                onClick={() => handleOpenModalDelete(params.row.id)}
              >
                <DeleteOutlinedIcon fontSize="medium" />
              </div>
            </IconButton>
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    !isPending && (
      <>
        <TableDataGrid columns={columns} rows={customJobs(jobs || [])} />
      </>
    )
  );
}

export default Table;
