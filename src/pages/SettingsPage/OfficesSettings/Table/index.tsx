import React, { useEffect } from 'react';

import { useGetJobPositions } from '@src/services/jobPositions/queries';
import { basicNames } from '@src/utils/constants';

import TableDataGrid from '@src/components/TableDataGrid';

type CustomJobsRequest = { value: number; name: string };
type CustomJobsResponse = { id: number; office: string };
function Table() {
  const { data: jobs, mutate: getJobs, isPending } = useGetJobPositions();

  const customJobs = (
    jobsparams: CustomJobsRequest[],
  ): CustomJobsResponse[] => {
    return jobsparams?.map((job: { value: number; name: string }) => ({
      id: job.value,
      office: job.name,
    }));
  };

  useEffect(() => {
    getJobs({});
  }, []);

  const columns = [
    {
      field: 'office',
      headerName: `${basicNames.office.singular}`,
      flex: 1,
      headerClassName: 'table-header',
      cellClassName: 'table-body',
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
