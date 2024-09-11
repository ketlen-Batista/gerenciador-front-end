// import React, { useState } from 'react';
// import { basicNames } from '@src/utils/constants';
// import DefaultPage from '@templates/DefaultPage';
// import Tabs, { Tab } from '@src/components/Tabs';
// import OfficesSettings from './OfficesSettings';
// import PermissionsSettings from './PermissionsSettings';
// import SectorSettings from './SectorSettings';
// import SettingsContracts from './SettingsContracts';
// const SettingsPage = () => {
//   const [currentTabId, setCurrentTabId] = useState<string>('contracts');
//   const tabs: Tab[] = [
//     {
//       id: 'contracts',
//       label: `${basicNames.sector.plural}`,
//       content: <SettingsContracts />,
//     },
//     {
//       id: 'sectors',
//       label: `${basicNames.section.plural}`,
//       content: <SectorSettings />,
//     },
//     {
//       id: 'offices',
//       label: 'Cargos',
//       content: <OfficesSettings />,
//     },
//     {
//       id: 'permissions',
//       label: 'Permissões',
//       content: <PermissionsSettings />,
//     },
//   ];
//   return (
//     <DefaultPage pageTitle="Configurações">
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
// export default SettingsPage;
////////////////////////////////////////////////////////
import React, { useState } from 'react';

// Supondo que você já tenha esse hook
import { basicNames } from '@src/utils/constants';
import DefaultPage from '@templates/DefaultPage';

import Tabs, { Tab } from '@src/components/Tabs';

import { useAuth } from '@hooks/useAuth';

import OfficesSettings from './OfficesSettings';
import PermissionsSettings from './PermissionsSettings';
import SectorSettings from './SectorSettings';
import SettingsContracts from './SettingsContracts';
import Status from './Status';

const SettingsPage = () => {
  const { permissions } = useAuth(); // Obtém as permissões do usuário

  // Define as abas com base nas permissões
  const tabs: Tab[] = [
    {
      id: 'contracts',
      label: `${basicNames.sector.plural}`,
      content: <SettingsContracts />,
      isVisible: permissions?.configContract ? true : false, // Verifica a permissão
    },
    {
      id: 'sectors',
      label: `${basicNames.section.plural}`,
      content: <SectorSettings />,
      isVisible: permissions?.configSector ? true : false, // Verifica a permissão
    },
    {
      id: 'offices',
      label: 'Cargos',
      content: <OfficesSettings />,
      isVisible: permissions?.configOffice ? true : false, // Verifica a permissão
    },
    {
      id: 'permissions',
      label: 'Permissões',
      content: <PermissionsSettings />,
      isVisible: permissions?.configPermission ? true : false, // Verifica a permissão
    },
    {
      id: 'status',
      label: 'Status',
      content: <Status />,
      isVisible: true, // Verifica a permissão
    },
  ].filter((tab) => tab.isVisible); // Filtra as abas com base na visibilidade

  const [currentTabId, setCurrentTabId] = useState<string | null>(
    tabs.length > 0 ? tabs[0].id : null,
  );

  return (
    <DefaultPage pageTitle="Configurações">
      <Tabs
        tabs={tabs}
        currentTab={currentTabId}
        onChangeTab={(tabId) => setCurrentTabId(tabId)} // Atualiza a aba selecionada
      />
    </DefaultPage>
  );
};

export default SettingsPage;
