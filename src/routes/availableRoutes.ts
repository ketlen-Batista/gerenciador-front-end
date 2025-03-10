const rootPath = '/gerenciador-gic';

export enum AvailableRoutes {
  // * Home
  home = `${rootPath}`,

  // PÁGINA DE DOCUMENTOS
  documentsPage = `${rootPath}/documentos`,

  //PÁGINA DE DADOS DO FUNCIONÁRIO
  employeesDataPage = `${rootPath}/dados-do-funcionario`,

  // PÁGINA DE RELATÓRIOS
  reportsPage = `${rootPath}/relatorios`,

  //PÁGINA FUNCIONÁRIOS
  employeesPage = `${rootPath}/funcionarios`,

  //PÁGINA DE CONFIGURAÇÕES
  settingsPage = `${rootPath}/configuracoes`,

  //PÁGINA MEU PERFIL
  profilePage = `${rootPath}/meu-perfil`,

  //PÁGINA DADOS DA EMPRESA
  company = `${rootPath}/empresa`,

  //ERRO
  // error404 = `${rootPath}/error`,
}
