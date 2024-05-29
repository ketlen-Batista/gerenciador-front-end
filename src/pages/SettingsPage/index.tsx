import React, { useState } from 'react';

import { basicNames } from '@src/utils/constants';
import DefaultPage from '@templates/DefaultPage';

import Tabs, { Tab } from '@src/components/Tabs';

import OfficesSettings from './OfficesSettings';
import PermissionsSettings from './PermissionsSettings';
import SectorSettings from './SectorSettings';

const SettingsPage = () => {
  const [currentTabId, setCurrentTabId] = useState<string>('sectors');

  const tabs: Tab[] = [
    {
      id: 'sectors',
      label: `${basicNames.sector.plural} e ${basicNames.section.plural}`,
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
