import React from 'react';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import * as S from './styles';

type Props = {
  imageAvatar?: string;
  mt?: string;
  mb?: string;
};

const ImageAvatar = ({ imageAvatar, mt, mb }: Props) => {
  return (
    <div>
      <S.Image
        style={{
          marginTop: mt ?? '16px',
          marginBottom: mb ?? '16px',
          // width: '150px',
          // height: '150px',
          // borderRadius: '50%',
          // margin: 'auto',
        }}
        src={imageAvatar}
      />
      {/* <S.ContainerButton>
       
        <CreateOutlinedIcon />
     
      </S.ContainerButton> */}
    </div>
  );
};

export default ImageAvatar;
