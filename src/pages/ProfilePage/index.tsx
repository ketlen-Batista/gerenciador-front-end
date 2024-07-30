import React from 'react';

import DefaultPage from '@templates/DefaultPage';

import Form from '@pages/ProfilePage/components/Form';

import { ProfilePageProvider } from './contexts/ProfilePageContext';

function ProfilePage() {
  return (
    <DefaultPage pageTitle="Meu perfil">
      <ProfilePageProvider>
        <Form />
      </ProfilePageProvider>
    </DefaultPage>
  );
}

export default ProfilePage;
