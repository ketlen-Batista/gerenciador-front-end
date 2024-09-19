import React from 'react';

import useResponsive from '@src/hooks/useResponsive';
import DefaultPage from '@src/templates/DefaultPage';

import DesktopHome from './DesktopHome';
import MobileHome from './MobileHome';

const HomePage = () => {
  const { isMobile } = useResponsive();
  return (
    <DefaultPage pageTitle="Início">
      {isMobile ? <MobileHome /> : <DesktopHome />}
    </DefaultPage>
  );
};

export default HomePage;
