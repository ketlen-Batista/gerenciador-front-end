// import React, { useState } from 'react';
// import DefaultPage from '@src/templates/DefaultPage';
// import { useLocation } from 'react-router-dom';
// import Tabs, { Tab } from '@src/components/Tabs';
// import PointCheckins from './pages/PointCheckins';
// import ServiceRegister from './pages/ServiceRegister';
// const ReportsPage = () => {
//   const location = useLocation();
//   const { tab } = location.state || {};
//   const [currentTabId, setCurrentTabId] = useState<string>(
//     tab ?? 'pointCheckins',
//   );
//   const tabs: Tab[] = [
//     {
//       id: 'pointCheckins',
//       label: 'Folha de Ponto',
//       content: <PointCheckins />,
//     },
//     {
//       id: 'serviceRegister',
//       label: 'Registros de serviço',
//       content: <ServiceRegister />,
//     },
//   ];
//   return (
//     <DefaultPage pageTitle="Relatórios">
//       <Tabs
//         tabs={tabs}
//         currentTab={currentTabId}
//         onChangeTab={() => {
//           setCurrentTabId('');
//         }}
//       />
//     </DefaultPage>
//   );
// };
// export default ReportsPage;
///////////////////////////////////////////////////////////
import React, { useState } from 'react';

import DefaultPage from '@src/templates/DefaultPage';
import { useLocation } from 'react-router-dom';

import Tabs, { Tab } from '@src/components/Tabs';

import { useAuth } from '@hooks/useAuth';

import CertificatesPage from './pages/CertificatesPage';
import JustificationsPage from './pages/JustificationsPage';
import PointCheckins from './pages/PointCheckins';
import ServiceRegister from './pages/ServiceRegister';

// Supondo que você tenha um hook para obter permissões

const ReportsPage = () => {
  const location = useLocation();
  const { tab } = location.state || {};
  const { permissions } = useAuth(); // Obtém as permissões do usuário
  console.log({ tab });
  // Define as abas com base nas permissões
  const tabs: Tab[] = [
    {
      id: 'pointCheckins',
      label: 'Folha de Ponto',
      content: <PointCheckins />,
      isVisible: !permissions?.pointEletronic ? false : true, // Verifica a permissão
    },
    {
      id: 'serviceRegister',
      label: 'Registros de serviço',
      content: <ServiceRegister />,
      isVisible: !permissions?.servicesRegister ? false : true, // Verifica a permissão
    },
    {
      id: 'justifications',
      label: 'Justificativas',
      content: <JustificationsPage />,
      isVisible: true, // Verifica a permissão
    },
    {
      id: 'certificates',
      label: 'Atestados',
      content: <CertificatesPage />,
      isVisible: true, // Verifica a permissão
    },
  ]?.filter((tab) => tab.isVisible); // Filtra as abas com base na visibilidade

  const [currentTabId, setCurrentTabId] = useState<string>(
    tab?.length ? tab : tabs?.[0]?.id, // Ajuste para não inicializar com uma aba vazia
  );

  return (
    tabs.length && (
      <DefaultPage pageTitle="Relatórios">
        <Tabs
          tabs={tabs}
          currentTab={currentTabId}
          onChangeTab={(tabId) => setCurrentTabId(tabId)} // Atualiza a aba selecionada
        />
      </DefaultPage>
    )
  );
};

export default ReportsPage;
