import React from 'react';

import * as S from './styles';

type Props = {
  textButton: string;
};

const ButtonFilter = ({ textButton }: Props) => {
  return <S.ButtonClick>{textButton}</S.ButtonClick>;
};

export default ButtonFilter;
