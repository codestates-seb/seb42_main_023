import React from 'react';
import styled from 'styled-components';

const Item = styled.span`
  background-color: #e3e8f0;
  box-sizing: border-box;
  padding: 4px 10px;
  margin-right: 4px;
  border-radius: 30px;
  font-size: 12px;
`;

interface Props {
  content: string;
}

const Tag = ({ content }: Props) => {
  return (
    <>
      <Item>{content}</Item>
    </>
  );
};

export default Tag;
