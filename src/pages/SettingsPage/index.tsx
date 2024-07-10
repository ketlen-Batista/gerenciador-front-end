import React, { useState } from 'react';

import { basicNames } from '@src/utils/constants';
import DefaultPage from '@templates/DefaultPage';

import Tabs, { Tab } from '@src/components/Tabs';

import OfficesSettings from './OfficesSettings';
import PermissionsSettings from './PermissionsSettings';
import SectorSettings from './SectorSettings';
import SettingsContracts from './SettingsContracts';

const SettingsPage = () => {
  const [currentTabId, setCurrentTabId] = useState<string>('contracts');

  const tabs: Tab[] = [
    {
      id: 'contracts',
      label: `${basicNames.sector.plural}`,
      content: <SettingsContracts />,
    },
    {
      id: 'sectors',
      label: `${basicNames.section.plural}`,
      content: <SectorSettings />,
    },

    {
      id: 'offices',
      label: 'Cargos',
      content: <OfficesSettings />,
    },

    {
      id: 'permissions',
      label: 'Permissões',
      content: <PermissionsSettings />,
    },
  ];

  return (
    <DefaultPage pageTitle="Configurações">
      <Tabs
        tabs={tabs}
        currentTab={currentTabId}
        onChangeTab={() => {
          setCurrentTabId('');
        }}
      />
    </DefaultPage>
  );
};

export default SettingsPage;
