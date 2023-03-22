import React from 'react';
import styled from 'styled-components';

interface Props {
  content: string;
}

const Thumnail = ({ content }: Props) => {
  return <>{content.length === 0 ? <None /> : <Item src={content} />}</>;
};

export default Thumnail;
const Item = styled.img`
  width: 74px;
  height: 50px;
  margin-right: 20px;
  border-radius: 4px;
  object-fit: cover;
`;
const None = styled.div`
  width: 74px;
  height: 50px;
  background-color: #e3e8f0;
  margin-right: 20px;
  border-radius: 4px;
`;
