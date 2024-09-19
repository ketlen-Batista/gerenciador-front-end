import React from 'react';
import { Fragment, ReactNode, useEffect, useState } from 'react';

import TabContext from '@mui/lab/TabContext';
import { Box, Divider } from '@mui/material';
import useResponsive from '@src/hooks/useResponsive';
import { colors } from '@src/styles/colors';

import Select from '../Select';

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

// function Tabs({
//   tabs,
//   currentTab,
//   commonHeaderComponent,
//   commonFooterComponent,
//   onChangeTab,
// }: Props) {
//   const initialTab = tabs?.find((tab) => tab?.isInitialTab) || tabs?.[0];

//   const [currentTabId, setCurrentTabId] = useState(initialTab?.id);

//   useEffect(() => {
//     if (onChangeTab) onChangeTab(currentTabId);
//   }, [currentTabId]);

//   useEffect(() => {
//     if (currentTab) {
//       setCurrentTabId(currentTab);
//     }
//   }, [currentTab]);

//   return (
//     <Fragment>
//       <TabContext value={currentTabId}>
//         <S.TabList onChange={(_, value) => setCurrentTabId(value)}>
//           {tabs?.map((tab, index) => (
//             <S.Tab
//               key={`list-${tab.id}-${index}`}
//               value={tab.id}
//               label={tab.label}
//               disabled={tab?.disabled}
//               wrapped
//               style={{ paddingLeft: '10px', paddingRight: '10px' }}
//             />
//           ))}
//         </S.TabList>
//         {commonHeaderComponent}
//         {tabs?.map((tab, index) => (
//           <S.TabPanel key={`panel-${tab.id}-${index}`} value={tab.id}>
//             {tab.content}
//           </S.TabPanel>
//         ))}
//         {commonFooterComponent}
//       </TabContext>
//     </Fragment>
//   );
// }

// export default Tabs;

export default function Tabs({
  tabs,
  currentTab,
  commonHeaderComponent,
  commonFooterComponent,
  onChangeTab,
}: Props) {
  const { isDesktop } = useResponsive();
  console.log({ isDesktop });
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

  const handleTabChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setCurrentTabId(event.target.value as string);
  };

  return (
    <Fragment>
      <TabContext value={currentTabId}>
        {!isDesktop ? (
          // Layout para telas pequenas (mobile)
          <Box>
            <Box mb={3} mt={1}>
              <Select
                onChange={(event) => setCurrentTabId(event?.value as string)}
                options={tabs.map((tab) => ({
                  value: String(tab.id),
                  label: String(tab.label),
                  name: String(tab.label),
                }))}
                value={currentTabId}
              />
            </Box>
            <Divider />
          </Box>
        ) : (
          // Layout para telas maiores
          <S.TabList onChange={(_, value) => setCurrentTabId(value)}>
            {tabs.map((tab, index) => (
              <S.Tab
                key={`list-${tab.id}-${index}`}
                value={tab.id}
                label={tab.label}
                disabled={tab?.disabled}
                wrapped
                style={{ paddingLeft: '10px', paddingRight: '10px' }}
              />
            ))}
          </S.TabList>
        )}
        {commonHeaderComponent}
        {tabs.map((tab, index) => (
          <S.TabPanel key={`panel-${tab.id}-${index}`} value={tab.id}>
            {tab.content}
          </S.TabPanel>
        ))}
        {commonFooterComponent}
      </TabContext>
    </Fragment>
  );
}
