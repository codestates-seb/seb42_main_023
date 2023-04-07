import React from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import styled from 'styled-components';
const Button = styled.button`
  background-color: #fff;
  cursor: pointer;
`;
function PrevPageIcon({ handler }: { handler: () => void }) {
  return (
    <Button onClick={handler}>
      <IoIosArrowBack color="#94969b" />
    </Button>
  );
}

export default PrevPageIcon;
