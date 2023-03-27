import React from 'react';
import styled from 'styled-components';
import { IoIosArrowForward } from 'react-icons/io';
const Button = styled.button`
  background-color: #fff;
  cursor: pointer;
`;

function NextPageIcon({ handler }: { handler: () => void }) {
  return (
    <Button onClick={handler}>
      <IoIosArrowForward color="#94969b" />
    </Button>
  );
}

export default NextPageIcon;
