import React, { useState } from 'react';

import DefaultPage from '@templates/DefaultPage';

import Tabs, { Tab } from '@src/components/Tabs';

import OfficesSettings from './OfficesSettings';
import SectorSettings from './SectorSettings';

const SettingsPage = () => {
  const [currentTabId, setCurrentTabId] = useState<string>('sectors');

  const tabs: Tab[] = [
    {
      id: 'sectors',
      label: 'Setores',
      content: <SectorSettings />,
    },
    {
      id: 'offices',
      label: 'Cargos',
      content: <OfficesSettings />,
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
