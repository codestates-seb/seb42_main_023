import React from 'react';
import styled from 'styled-components';
import { IoIosArrowForward } from 'react-icons/io';

function NextPageIcon({ handler }: { handler: () => void }) {
  return (
    <Btn onClick={handler}>
      <IoIosArrowForward color="#94969b" />
    </Btn>
  );
}

export default NextPageIcon;

const Btn = styled.button`
  background-color: #fff;
  cursor: pointer;
`;
