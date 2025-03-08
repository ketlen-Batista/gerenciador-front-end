// src/utils/translate.js

export const translations = {
  en: {
    home: 'Home',
    homeAdmin: 'Home Admin',
    homeBasic: 'Home Basic',
    pageEmployess: 'Page Employees',
    deleteUser: 'Delete User',
    editUser: 'Edit User',
    company: 'Company',
    companyAdmin: 'Company Admin',
    companyBasic: 'Company Basic',
    reports: 'Reports',
    pointEletronic: 'Electronic Point',
    servicesRegister: 'Services Register',
    documentsPage: 'Documents Page',
    documentsAdmin: 'Documents Admin',
    documentsBasic: 'Documents Basic',
    configs: 'Configs',
    configContract: 'Contract Config',
    configSector: 'Sector Config',
    configOffice: 'Office Config',
    configPermission: 'Permission Config',
    mobile: 'Mobile',
    desktop: 'Desktop',
    'Select a position': 'Select a position',
    'Select a position to configure permissions':
      'Select a position to configure permissions',
    'Save Permissions': 'Save Permissions',
  },
  pt: {
    home: 'Página de Início',
    homeAdmin: 'Administração do Início',
    homeBasic: 'Início Básico',
    pageEmployess: 'Página de Funcionários',
    deleteUser: 'Excluir Usuário',
    editUser: 'Editar Usuário',
    company: 'Página de Dados da Empresa',
    companyAdmin: 'Administração da Empresa',
    companyBasic: 'Empresa Básica',
    reports: 'Página de Relatórios',
    pointEletronic: 'Página de Ponto Eletrônico',
    servicesRegister: 'Página de Registro de Serviços',
    documentsPage: 'Página de Documentos',
    documentsAdmin: 'Página de Administração de Documentos',
    documentsBasic: 'Página de Documentos Básicos',
    configs: 'Página de Configurações',
    configContract: 'Página de Configuração de Contratos',
    configSector: 'Página de Configuração de Setores',
    configOffice: 'Página de Configuração de Cargos',
    configPermission: 'Página de Configuração de Permissões',
    mobile: 'Aplicativo',
    desktop: 'Desktop - (site web)',
    'Select a position': 'Selecione um cargo',
    'Select a position to configure permissions':
      'Selecione um cargo para configurar as permissões',
    'Save Permissions': 'Salvar Permissões',
  },
};

export const translate = (key, lang = 'pt') => {
  return translations[lang][key] || key;
};
