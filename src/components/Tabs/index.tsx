import React from 'react';
import { Fragment, ReactNode, useEffect, useState } from 'react';

import TabContext from '@mui/lab/TabContext';

import * as S from './styles';

export interface Tab {
  content: ReactNode;
  disabled?: boolean;
  id: string;
  isInitialTab?: boolean;
  label: ReactNode;
}

interface Props {
  commonFooterComponent?: ReactNode;
  commonHeaderComponent?: ReactNode;
  onChangeTab?: (id: string) => void;
  tabs: Tab[];
  currentTab?: string;
}

function Tabs({
  tabs,
  currentTab,
  commonHeaderComponent,
  commonFooterComponent,
  onChangeTab,
}: Props) {
  const initialTab = tabs?.find((tab) => tab?.isInitialTab) || tabs?.[0];

  const [currentTabId, setCurrentTabId] = useState(initialTab?.id);

  useEffect(() => {
    if (onChangeTab) onChangeTab(currentTabId);
  }, [currentTabId]);

  useEffect(() => {
    if (currentTab) {
      setCurrentTabId(currentTab);
    }
  }, [currentTab]);

  return (
    <Fragment>
      <TabContext value={currentTabId}>
        <S.TabList onChange={(_, value) => setCurrentTabId(value)}>
          {tabs?.map((tab, index) => (
            <S.Tab
              key={`list-${tab.id}-${index}`}
              value={tab.id}
              label={tab.label}
              disabled={tab?.disabled}
              wrapped
            />
          ))}
        </S.TabList>
        {commonHeaderComponent}
        {tabs?.map((tab, index) => (
          <S.TabPanel key={`panel-${tab.id}-${index}`} value={tab.id}>
            {tab.content}
          </S.TabPanel>
        ))}
        {commonFooterComponent}
      </TabContext>
    </Fragment>
  );
}

export default Tabs;
