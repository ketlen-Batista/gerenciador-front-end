import React, { useState } from 'react';

import DefaultPage from '@src/templates/DefaultPage';

import Tabs, { Tab } from '@src/components/Tabs';

import PointCheckins from './pages/PointCheckins';

const ReportsPage = () => {
  const [currentTabId, setCurrentTabId] = useState<string>('pointCheckins');

  const tabs: Tab[] = [
    {
      id: 'pointCheckins',
      label: 'Folha de Ponto',
      content: <PointCheckins />,
    },
  ];
  return (
    <DefaultPage pageTitle="Relatórios">
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

export default ReportsPage;
