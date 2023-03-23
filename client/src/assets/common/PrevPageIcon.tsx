import React from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import styled from 'styled-components';
const Button = styled.button`
  background-color: #fff;
  cursor: pointer;
`;
function PrevPageIcon() {
  return (
    <Button>
      <IoIosArrowBack color="#94969b" />
    </Button>
  );
}

export default PrevPageIcon;
