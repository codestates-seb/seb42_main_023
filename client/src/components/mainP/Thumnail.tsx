import React from 'react';
import styled from 'styled-components';
import { NoimgSVG } from '../../assets/common/NoimgSVG';

const Item = styled.img`
  width: 74px;
  height: 50px;
  background-color: #e3e8f0;
  box-sizing: border-box;
  margin-right: 20px;
  border-radius: 4px;
  border: none;
  object-fit: cover;
`;

interface Props {
  content: string;
}

<<<<<<<< HEAD:client/src/components/common/Thumbnail.tsx
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
========
const Thumnail = ({ content }: Props) => {
  return <>{content.length === 0 ? <Item /> : <Item src={content} />}</>;
};

export default Thumnail;
>>>>>>>> 6038065ce9f8ca42c1f373aae8d2621ff9d4483d:client/src/components/mainP/Thumnail.tsx
