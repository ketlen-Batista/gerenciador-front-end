import styled from 'styled-components';
import Button from '@material-ui/core/Button';

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
  /* font-size: 35px; */
  background: var(--Dark) !important;
  width: 90px;
  height: 50px;
  border-radius: 250px !important;
  color: #fff;
  cursor: pointer !important;
  margin-bottom: 20px;
  margin-left: 10px;
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
`;
