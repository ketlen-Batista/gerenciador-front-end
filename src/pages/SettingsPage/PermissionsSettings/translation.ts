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
    home: 'Início',
    homeAdmin: 'Administração do Início',
    homeBasic: 'Início Básico',
    pageEmployess: 'Página de Funcionários',
    deleteUser: 'Excluir Usuário',
    editUser: 'Editar Usuário',
    company: 'Dados da Empresa',
    companyAdmin: 'Administração da Empresa',
    companyBasic: 'Empresa Básica',
    reports: 'Relatórios',
    pointEletronic: 'Ponto Eletrônico',
    servicesRegister: 'Registro de Serviços',
    documentsPage: 'Página de Documentos',
    documentsAdmin: 'Administração de Documentos',
    documentsBasic: 'Documentos Básicos',
    configs: 'Configurações',
    configContract: 'Configuração de Contratos',
    configSector: 'Configuração de Setores',
    configOffice: 'Configuração de Cargos',
    configPermission: 'Configuração de Permissões',
    mobile: 'Aplicativo',
    desktop: 'Desktop',
    'Select a position': 'Selecione um cargo',
    'Select a position to configure permissions':
      'Selecione um cargo para configurar as permissões',
    'Save Permissions': 'Salvar Permissões',
  },
};

export const translate = (key, lang = 'pt') => {
  return translations[lang][key] || key;
};
