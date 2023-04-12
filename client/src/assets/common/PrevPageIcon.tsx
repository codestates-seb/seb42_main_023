import React from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import styled from 'styled-components';
function PrevPageIcon({ handler }: { handler: () => void }) {
  return (
    <Btn onClick={handler}>
      <IoIosArrowBack color="#94969b" />
    </Btn>
  );
}

export default PrevPageIcon;
const Btn = styled.button`
  background-color: #fff;
  cursor: pointer;
`;
