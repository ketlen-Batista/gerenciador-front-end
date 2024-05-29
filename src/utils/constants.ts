export const recebidos = [
  {
    name: 'Todos',
    value: 'todos',
  },
  {
    name: 'Enviados',
    value: 'enviados',
  },
  {
    name: 'Recebidos',
    value: 'recebidos',
  },
];
export const setores = [
  {
    name: 'Todos',
    value: 'todos',
  },
  {
    name: 'Saúde',
    value: 'saude',
  },
  {
    name: 'Educação',
    value: 'educacao',
  },
  {
    name: 'TJ',
    value: 'tj',
  },
];

export const cargos = [
  {
    name: 'Todos',
    value: 'todos',
  },
  {
    name: 'Gerente',
    value: 'gerente',
  },
  {
    name: 'Auxiliar',
    value: 'auxiliar',
  },
  {
    name: 'Encarregado',
    value: 'encarregado',
  },
  {
    name: 'Diretor',
    value: 'diretor',
  },
];

export const seções = [
  {
    name: 'Todos',
    value: 'todos',
  },
  {
    name: 'Escola 1',
    value: 'escola1',
  },
  {
    name: 'Escola 1',
    value: 'escola1',
  },
  {
    name: 'Escola 2',
    value: 'escola2',
  },
  {
    name: 'Escola 3',
    value: 'escola3',
  },
  {
    name: 'Escola 4',
    value: 'escola4',
  },
];

export const basicNames = {
  sector: {
    singular: 'Contrato',
    plural: 'Contratos',
  },
  section: {
    singular: 'Setor',
    plural: 'Setores',
  },
  permission: {
    singular: 'Permissão',
    plural: 'Permissões',
  },
};

export const permissionsNames = [
  {
    id: 0,
    name: 'Página Início',
  },
  {
    id: 1,
    name: 'Página Funcionários',
  },
  {
    id: 2,
    name: 'Página Relatórios',
  },
  {
    id: 3,
    name: 'Página Documentos',
  },
  {
    id: 4,
    name: 'Página Configurações',
    subPermissions: [
      {
        id: 0,
        name: 'Contratos e Setores',
      },
      {
        id: 1,
        name: 'Cargos',
      },
      {
        id: 2,
        name: 'Permissões',
      },
    ],
  },
];
