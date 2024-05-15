import { ButtonBase } from "@material-ui/core";
import styled from "styled-components";

export const Title = styled.div `
color: var(--GrayDark200);
height: 50px;
font-size: 30px;
height: 70px;
`;

export const SubTitle = styled.div `
color: black;
font-size: 20px;
height: 10px;

`;

export const ContainerTitles = styled.div `
display: flex;
flex-direction: column;

`;

export const ContainerButtonsAndTitles = styled.div `
    display: flex ;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 25px;
    
`;


export const  ContainerButton= styled.div `

   display: flex;
 
  /* align-items: center;

  justify-content: right; */

`;

export const  Button= styled(ButtonBase) `
  font-size: 17px;
  display: flex;
  color: var(--ColorFont);
  height: 50px;
  align-items: center;
  flex: 5;
  justify-content: right;
  padding: 15px;
  background-color: var(--Secondary);
  border-radius: 100px;
  
`;