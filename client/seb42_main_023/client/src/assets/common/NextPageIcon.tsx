import React from 'react';
import { IoIosArrowForward } from 'react-icons/io';
import styled from 'styled-components';
const Button = styled.button`
  background-color: #fff;
  cursor: pointer;
`;
function NextPageIcon() {
  return (
    <Button>
      <IoIosArrowForward color="#94969b" />
    </Button>
  );
}

export default NextPageIcon;
