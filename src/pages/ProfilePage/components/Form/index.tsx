import React, { useEffect, useState } from 'react';

import { Tooltip } from '@material-ui/core';
import {
  CameraAltOutlined as CameraAltOutlinedIcon,
  DateRangeOutlined as DateRangeOutlinedIcon,
  DeleteOutline as DeleteOutlineIcon,
  DescriptionOutlined as DescriptionOutlinedIcon,
  EqualizerOutlined as EqualizerOutlinedIcon,
} from '@material-ui/icons';
import { Box } from '@mui/material';
import { useProfilePage } from '@pages/ProfilePage/contexts/ProfilePageContext';
import { useAuth } from '@src/hooks/useAuth';
import { AvailableRoutes } from '@src/routes/availableRoutes';
import { useDeleteUser, useGetUser } from '@src/services/users/queries';
import { colors } from '@src/styles/colors';
import { getImageUrlServer } from '@src/utils/functions';
import { useLocation, useNavigate } from 'react-router-dom';

import BasicsData from '@pages/ProfilePage/components/BasicsData';
import AccordionCustom from '@src/components/AccordionCustom';
import ModalConfirm from '@src/components/ModalConfirm';

import ImageAvatar from '@components/ImageAvatar';

import * as S from './styles';

interface IconTooltipProps {
  title: string;
  icon: React.ReactElement;
  onClick?: () => void;
}

const IconTooltip = ({ title, icon, onClick }: IconTooltipProps) => (
  <Tooltip title={title} placement="top">
    <div onClick={onClick ?? null}>
      <S.CircleIcon>{icon}</S.CircleIcon>
    </div>
  </Tooltip>
);

function Form() {
  const location = useLocation();
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState<string | boolean>('panel1');
  const [isNewEmployee, setIsNewEmployee] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState<string | null>(null);
  const [photoUrl, setPhotoUrl] = useState(null);

  const {
    user: userGeneralContext,
    userPhoto,
    // , updateUserGeneral
  } = useAuth();

  const { formik, getUser, isLoadingUser, user } = useProfilePage();

  const { mutate: handleDeleteUser, isPending: isPendingDeleteUser } =
    useDeleteUser();

  // const handleOpenModalDelete = () => {
  //   setIsOpenModal(true);
  //   setUserIdToDelete(user?.user?.id);
  // };

  const handleCloseModalDelete = () => {
    setIsOpenModal(false);
    setUserIdToDelete(null);
  };

  const handleDelete = () => {
    handleDeleteUser(userIdToDelete);
    handleCloseModalDelete();
  };

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const handleNavigate = (page: string, userId: string, tab?: string) => {
    navigate(page || '', { state: { userId: userId ?? '', tab: tab ?? '' } });
  };

  useEffect(() => {
    if (userGeneralContext?.id) {
      getUser({ userId: userGeneralContext?.id });
    } else {
      setIsNewEmployee(true);
    }
    // updateUserGeneral();
  }, [userGeneralContext?.id, getUser]);

  useEffect(() => {
    if (user?.photo_avatar_id) {
      (async () => {
        const urlImage = await getImageUrlServer(user?.photo_avatar_id);
        setPhotoUrl(urlImage);
      })();
    }
  }, [user?.photo_avatar_id]);
  return (
    <>
      <S.Container>
        <S.ContainerHeader>
          <ImageAvatar
            imageSrc={photoUrl ?? null}
            height={'100px'}
            width={'100px'}
            fontSize={100}
          />
        </S.ContainerHeader>

        <AccordionCustom
          panel="panel1"
          expanded={expanded}
          handleChange={handleChange}
          title="Dados Básicos"
        >
          <BasicsData
            user={isNewEmployee ? {} : user}
            // isLoadingUser={isLoadingUser}
          />
        </AccordionCustom>

        {/* <AccordionCustom
          panel="panel2"
          expanded={expanded}
          handleChange={handleChange}
          title="Permissões"
          >
          <div>Permissões do usuário</div>
          </AccordionCustom> */}

        <form onSubmit={formik?.handleSubmit}>
          <S.ContainerButton>
            <S.ButtonStyle type="submit" disableElevation>
              Salvar
            </S.ButtonStyle>
          </S.ContainerButton>
        </form>
      </S.Container>
      {isOpenModal && (
        <ModalConfirm
          openDialog={isOpenModal}
          handleClose={handleCloseModalDelete}
          handleConfirm={handleDelete}
          isLoading={isPendingDeleteUser}
          textButtonConfirm={'Excluir usuário'}
          colorButtonConfirm={colors.error.dark}
          text={
            'Essa ação não poderá ser desfeita. Deseja realmente excluir este usuário?'
          }
          titleModal={'Deletar'}
        />
      )}
    </>
  );
}

export default Form;
