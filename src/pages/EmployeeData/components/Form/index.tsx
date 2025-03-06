import React, { useEffect, useState } from 'react';

import { Tooltip } from '@material-ui/core';
import {
  CameraAltOutlined as CameraAltOutlinedIcon,
  DateRangeOutlined as DateRangeOutlinedIcon,
  DeleteOutline as DeleteOutlineIcon,
  DescriptionOutlined as DescriptionOutlinedIcon,
} from '@material-ui/icons';
import { Box, Grid } from '@mui/material';
import { useEmployeeData } from '@pages/EmployeeData/contexts/EmployeeDataContext';
import { useAuth } from '@src/hooks/useAuth';
import useResponsive from '@src/hooks/useResponsive';
import { AvailableRoutes } from '@src/routes/availableRoutes';
import { useDeleteUser } from '@src/services/users/queries';
import { colors } from '@src/styles/colors';
import { getImageUrlServer } from '@src/utils/functions';
import { useLocation, useNavigate } from 'react-router-dom';

import BasicsData from '@pages/EmployeeData/components/BasicsData';
import AccordionCustom from '@src/components/AccordionCustom';
import HourSchedule from '@src/components/HourSchedule';
import ModalConfirm from '@src/components/ModalConfirm';

import ImageAvatar from '@components/ImageAvatar';

import MobileBasicsData from '../MobileBasicsData';

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
  const { employeeId, fieldsDisabled } = location.state || {};
  const [expanded, setExpanded] = useState<string | boolean>('panel1');
  const [isNewEmployee, setIsNewEmployee] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState<string | null>(null);
  const [photoUrl, setPhotoUrl] = useState(null);

  const { getUser, user: userEmployeeData } = useEmployeeData();

  const { user: userGeneralContext } = useAuth();

  const user = userEmployeeData?.user;

  const { isDesktop } = useResponsive();

  const { mutate: handleDeleteUser, isPending: isPendingDeleteUser } =
    useDeleteUser();

  const handleOpenModalDelete = () => {
    setIsOpenModal(true);
    setUserIdToDelete(user?.id);
  };

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

  // useEffect(() => {
  //   if (employeeId) {
  //     getUser({ userId: employeeId });
  //   } else {
  //     setIsNewEmployee(true);
  //   }
  // }, [employeeId, getUser]);

  useEffect(() => {
    if (employeeId) {
      getUser({ userId: employeeId });
    } else {
      setIsNewEmployee(true);
    }
  }, [employeeId, userGeneralContext?.id, getUser]);

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
        {isDesktop ? (
          <S.ContainerHeader>
            <ImageAvatar
              // imageAvatar={user?.photo?.photoFile?.data ?? null}
              imageSrc={photoUrl ?? null}
              height={'100px'}
              width={'100px'}
              fontSize={100}
            />
            {employeeId ? (
              <S.ContainerIcons>
                {/* <IconTooltip
              title="Relatórios"
              icon={<EqualizerOutlinedIcon fontSize="medium" />}
            /> */}
                <IconTooltip
                  title="Registro de Serviços"
                  icon={<CameraAltOutlinedIcon fontSize="medium" />}
                  onClick={() =>
                    handleNavigate(
                      AvailableRoutes.reportsPage,
                      employeeId,
                      'serviceRegister',
                    )
                  }
                />
                <IconTooltip
                  title="Documentos"
                  icon={<DescriptionOutlinedIcon fontSize="medium" />}
                  onClick={() =>
                    handleNavigate(AvailableRoutes.documentsPage, employeeId)
                  }
                />
                <IconTooltip
                  title="Folha de Ponto"
                  icon={<DateRangeOutlinedIcon fontSize="medium" />}
                  onClick={() =>
                    handleNavigate(
                      AvailableRoutes.reportsPage,
                      employeeId,
                      'pointCheckins',
                    )
                  }
                />
                <IconTooltip
                  title="Deletar"
                  icon={<DeleteOutlineIcon fontSize="medium" />}
                  onClick={handleOpenModalDelete}
                />
              </S.ContainerIcons>
            ) : null}
          </S.ContainerHeader>
        ) : (
          <Grid container>
            <Grid item xs={12}>
              <Box
                display={'flex'}
                justifyContent={'center'}
                alignItems={'center'}
              >
                <ImageAvatar
                  // imageAvatar={user?.photo?.photoFile?.data ?? null}
                  imageSrc={photoUrl ?? null}
                  height={'100px'}
                  width={'100px'}
                  fontSize={50}
                />
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Box
                display={'flex'}
                justifyContent={'center'}
                alignItems={'center'}
                gap={2}
                mb={2}
              >
                {/* <IconTooltip
              title="Relatórios"
              icon={<EqualizerOutlinedIcon fontSize="medium" />}
            /> */}
                <IconTooltip
                  title="Registro de Serviços"
                  icon={<CameraAltOutlinedIcon fontSize="medium" />}
                  onClick={() =>
                    handleNavigate(
                      AvailableRoutes.reportsPage,
                      employeeId,
                      'serviceRegister',
                    )
                  }
                />
                <IconTooltip
                  title="Documentos"
                  icon={<DescriptionOutlinedIcon fontSize="medium" />}
                  onClick={() =>
                    handleNavigate(AvailableRoutes.documentsPage, employeeId)
                  }
                />
                <IconTooltip
                  title="Folha de Ponto"
                  icon={<DateRangeOutlinedIcon fontSize="medium" />}
                  onClick={() =>
                    handleNavigate(
                      AvailableRoutes.reportsPage,
                      employeeId,
                      'pointCheckins',
                    )
                  }
                />
                <IconTooltip
                  title="Deletar"
                  icon={<DeleteOutlineIcon fontSize="medium" />}
                  onClick={handleOpenModalDelete}
                />
              </Box>
            </Grid>
          </Grid>
        )}

        <AccordionCustom
          panel="panel1"
          expanded={expanded}
          handleChange={handleChange}
          title="Dados Básicos"
        >
          {isDesktop ? (
            <BasicsData
              fieldsDisabled={fieldsDisabled}
              // isLoadingUser={isLoadingUser}
            />
          ) : (
            <MobileBasicsData fieldsDisabled={fieldsDisabled} />
          )}
        </AccordionCustom>

        <Box width={'100%'} mt={5}>
          <AccordionCustom
            panel="panel2"
            expanded={expanded}
            handleChange={handleChange}
            title="Horários de Trabalho"
          >
            <Box width={'100%'}>
              <HourSchedule
                employeeId={employeeId as string}
                fieldsDisabled={fieldsDisabled}
              />
            </Box>
          </AccordionCustom>
        </Box>
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
