import Button from '@material-ui/core/Button';
import styled from 'styled-components';

export const Title = styled.div`
  display: flex;
  font-size: 30px;
  color: var(--Dark);
  margin-bottom: 20px;
`;

export const SubTitle = styled.div`
  display: flex;
  font-size: 20px;
  color: var(--ColorFont);
  padding-top: 10px;
  margin-bottom: 20px;
`;

export const ButtonClick = styled(Button)`
  display: flex;
  background: var(--Dark) !important;
  width: auto;
  height: 50px;
  border-radius: 250px !important;
  color: #fff;
  cursor: pointer !important;
  margin-bottom: 20px;
  margin-left: 10px;
  padding: 0px 20px !important;
`;

export const ContainerTitles = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ContainerButtons = styled.div`
  display: flex;
`;

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;
  margin-bottom: 20px;
`;

export const ContainerButtonsAdd = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 0px 50px;
`;
