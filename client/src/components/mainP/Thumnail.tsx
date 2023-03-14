import React from 'react';
import styled from 'styled-components';

const Item = styled.img`
  width: 74px;
  height: 50px;
  background-color: #e3e8f0;
  box-sizing: border-box;
  margin-right: 20px;
  border-radius: 4px;
`;

interface Props {
  content: string;
}

const Thumnail = ({ content }: Props) => {
  return (
    <>
      <Item src={content} />
    </>
  );
};

export default Thumnail;
