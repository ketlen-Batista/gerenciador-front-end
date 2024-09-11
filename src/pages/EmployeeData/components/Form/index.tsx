import React, { useEffect, useState } from 'react';

import { Tooltip } from '@material-ui/core';
import {
  CameraAltOutlined as CameraAltOutlinedIcon,
  DateRangeOutlined as DateRangeOutlinedIcon,
  DeleteOutline as DeleteOutlineIcon,
  DescriptionOutlined as DescriptionOutlinedIcon,
  EqualizerOutlined as EqualizerOutlinedIcon,
} from '@material-ui/icons';
import { Box, Grid } from '@mui/material';
import { useEmployeeData } from '@pages/EmployeeData/contexts/EmployeeDataContext';
import { AvailableRoutes } from '@src/routes/availableRoutes';
import { useDeleteUser, useGetUser } from '@src/services/users/queries';
import { colors } from '@src/styles/colors';
import { useLocation, useNavigate } from 'react-router-dom';

import BasicsData from '@pages/EmployeeData/components/BasicsData';
import AccordionCustom from '@src/components/AccordionCustom';
import HourSchedule from '@src/components/HourSchedule';
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
  const { employeeId, fieldsDisabled } = location.state || {};
  const [expanded, setExpanded] = useState<string | boolean>('panel1');
  const [isNewEmployee, setIsNewEmployee] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState<string | null>(null);

  const { formik, getUser, isLoadingUser, user } = useEmployeeData();

  const { mutate: handleDeleteUser, isPending: isPendingDeleteUser } =
    useDeleteUser();

  const handleOpenModalDelete = () => {
    setIsOpenModal(true);
    setUserIdToDelete(user?.user?.id);
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

  useEffect(() => {
    if (employeeId) {
      getUser({ userId: employeeId });
    } else {
      setIsNewEmployee(true);
    }
  }, [employeeId, getUser]);

  ///////////////////////////////////////////
  const [state, setState] = useState({
    seg: {},
    ter: {},
    qua: {},
    qui: {},
    sex: {},
    sab: {},
    dom: {},
    workScheduleMonday: true,
    workScheduleTuesday: true,
    workScheduleWednesday: true,
    workScheduleThursday: true,
    workScheduleFriday: true,
    workScheduleSaturday: true,
    workScheduleSunday: true,
  });

  const schedulesTimeList = [
    { label: '00:00', value: '00:00' },
    { label: '00:30', value: '00:30' },
    { label: '01:00', value: '01:00' },
    { label: '01:30', value: '01:30' },
    { label: '02:00', value: '02:00' },
    { label: '02:30', value: '02:30' },
    { label: '03:00', value: '03:00' },
    { label: '03:30', value: '03:30' },
    { label: '04:00', value: '04:00' },
    { label: '04:30', value: '04:30' },
    { label: '05:00', value: '05:00' },
    { label: '05:30', value: '05:30' },
    { label: '06:00', value: '06:00' },
    { label: '06:30', value: '06:30' },
    { label: '07:00', value: '07:00' },
    { label: '07:30', value: '07:30' },
    { label: '08:00', value: '08:00' },
    { label: '08:30', value: '08:30' },
    { label: '09:00', value: '09:00' },
    { label: '09:30', value: '09:30' },
    { label: '10:00', value: '10:00' },
    { label: '10:30', value: '10:30' },
    { label: '11:00', value: '11:00' },
    { label: '11:30', value: '11:30' },
    { label: '12:00', value: '12:00' },
    { label: '12:30', value: '12:30' },
    { label: '13:00', value: '13:00' },
    { label: '13:30', value: '13:30' },
    { label: '14:00', value: '14:00' },
    { label: '14:30', value: '14:30' },
    { label: '15:00', value: '15:00' },
    { label: '15:30', value: '15:30' },
    { label: '16:00', value: '16:00' },
    { label: '16:30', value: '16:30' },
    { label: '17:00', value: '17:00' },
    { label: '17:30', value: '17:30' },
    { label: '18:00', value: '18:00' },
    { label: '18:30', value: '18:30' },
    { label: '19:00', value: '19:00' },
    { label: '19:30', value: '19:30' },
    { label: '20:00', value: '20:00' },
    { label: '20:30', value: '20:30' },
    { label: '21:00', value: '21:00' },
    { label: '21:30', value: '21:30' },
    { label: '22:00', value: '22:00' },
    { label: '22:30', value: '22:30' },
    { label: '23:00', value: '23:00' },
    { label: '23:30', value: '23:30' },
  ];

  const handleChangeSwitchActive = (day) => {
    console.log(`Switch for ${day} clicked`);
    setState((prevState) => ({
      ...prevState,
      [day]: !prevState[day],
    }));
  };

  const handleChangeHour = (dayOfWeek, type, value) => {
    console.log(`Hour changed for ${dayOfWeek}: ${type} = ${value}`);
    setState((prevState) => ({
      ...prevState,
      [dayOfWeek]: {
        ...prevState[dayOfWeek],
        [type]: value,
      },
    }));
  };

  return (
    <>
      <S.Container>
        <S.ContainerHeader>
          <ImageAvatar
            imageAvatar={user?.user?.photo?.photoFile.data ?? null}
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

        <AccordionCustom
          panel="panel1"
          expanded={expanded}
          handleChange={handleChange}
          title="Dados Básicos"
        >
          <BasicsData
            fieldsDisabled={fieldsDisabled}
            // isLoadingUser={isLoadingUser}
          />
        </AccordionCustom>

        <Box width={'100%'} mt={5}>
          <AccordionCustom
            panel="panel2"
            expanded={expanded}
            handleChange={handleChange}
            title="Horários de Trabalho"
          >
            <HourSchedule
              state={state}
              SchedulesTimeList={schedulesTimeList}
              handleChangeSwitchActive={handleChangeSwitchActive}
              handleChangeHour={handleChangeHour}
            />
          </AccordionCustom>
        </Box>

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
