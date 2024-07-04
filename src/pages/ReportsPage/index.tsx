import React, { useState } from 'react';

import DefaultPage from '@src/templates/DefaultPage';
import { useLocation } from 'react-router-dom';

import Tabs, { Tab } from '@src/components/Tabs';

import PointCheckins from './pages/PointCheckins';

const ReportsPage = () => {
  const location = useLocation();
  const { tab } = location.state || {};
  const [currentTabId, setCurrentTabId] = useState<string>(
    tab ?? 'pointCheckins',
  );

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
