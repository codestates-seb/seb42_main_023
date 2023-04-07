import React from 'react';
import styled from 'styled-components';
import { NoimgSVG } from '../../assets/common/NoimgSVG';

interface Props {
  content: string;
}

const Thumbnail = ({ content }: Props) => {
  return (
    <>
      {content === null ? (
        <None>
          <NoimgSVG />
        </None>
      ) : (
        <Item src={content} />
      )}
    </>
  );
};

export default Thumbnail;
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
  display: flex;
  justify-content: center;
  align-items: center;
`;
