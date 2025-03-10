import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import { useGetContracts } from '@src/services/contractsService/queries';
import { useGetJobPositions } from '@src/services/jobPositions/queries';
import { useGetSectors } from '@src/services/sectorService/queries';
import { useGetUsers } from '@src/services/users/queries';

interface EmployeesFilterContextType {
  search: number | string | null;
  setSearch: (search: number | string | null) => void;
  cargo: number | string | null;
  setCargo: (cargo: number | string | null) => void;
  setSetor: (setor: number | string | null) => void;
  setContrato: (contrato: number | string | null) => void;
  setor: number | string | null;
  contrato: number | string | null;
  filteredUsers: any[];
  jobs: any[];
  contracts: any[];
  sectors: any[];
  filteredSectors: any[];
  filteredContracts: any[];
  isLoadingUsers: boolean;
}

const EmployeesFilterContext = createContext<EmployeesFilterContextType>({
  search: null,
  setSearch: () => {},
  cargo: null,
  setCargo: () => {},
  setSetor: () => {},
  setContrato: () => {},
  setor: null,
  contrato: null,
  filteredUsers: [],
  jobs: [],
  contracts: [],
  sectors: [],
  filteredSectors: [],
  filteredContracts: [],
  isLoadingUsers: true,
});

type EmployeesFilterProviderProps = {
  children: ReactNode;
};

export const EmployeesFilterProvider = ({
  children,
}: EmployeesFilterProviderProps) => {
  const [search, setSearch] = useState<number | string | null>(null);
  const [cargo, setCargo] = useState<number | string | null>(null);
  const [setor, setSetor] = useState<number | string | null>(null);
  const [contrato, setContrato] = useState<number | string | null>(null);

  const { data: jobs, mutate: getJobs } = useGetJobPositions();
  const { data: contracts, mutate: getContracts } = useGetContracts();
  const { data: sectors, mutate: getSectors } = useGetSectors();
  const {
    data: users,
    mutate: getUsers,
    isPending: isLoadingUsers,
  } = useGetUsers();

  let filteredUsers = users?.users?.filter((user) => {
    let matches = true;

    if (setor && user.sector_value !== setor) {
      matches = false;
    }

    if (contrato && user.contracts_value !== contrato) {
      matches = false;
    }

    if (cargo && user.jobPosition_id !== cargo) {
      matches = false;
    }

    if (
      search &&
      !user.name.toLowerCase().includes(String(search).toLowerCase())
    ) {
      matches = false;
    }

    return matches;
  });

  const [filteredSectors, setFilteredSectors] = useState<any[]>([]);
  const [filteredContracts, setFilteredContracts] = useState<any[]>([]);

  useEffect(() => {
    setFilteredSectors(
      sectors?.filter((item) => {
        let matches = true;

        if (contrato && item.contractId !== contrato) {
          matches = false;
        }

        return matches;
      }),
    );
  }, [contrato, sectors]);

  useEffect(() => {
    setFilteredContracts(
      contracts?.filter((item) => {
        let matches = true;

        if (setor && item.value !== setor) {
          matches = false;
        }

        return matches;
      }),
    );
  }, [setor, contracts]);

  useEffect(() => {
    getJobs({});
    getContracts({});
    getSectors({});
    getUsers({});
  }, []);

  return (
    <EmployeesFilterContext.Provider
      value={{
        search,
        setSearch,
        cargo,
        setCargo,
        setSetor,
        setContrato,
        setor,
        contrato,
        filteredUsers,
        jobs,
        contracts,
        sectors,
        filteredSectors,
        filteredContracts,
        isLoadingUsers,
      }}
    >
      {children}
    </EmployeesFilterContext.Provider>
  );
};

export const useEmployeesFilter = () => useContext(EmployeesFilterContext);
