import React from 'react';
import styled from 'styled-components';
const LargeProfileImg = ({ url }: { url: string }) => {
  return (
    <Cover>
      <Item src={url} alt="userImg" />
    </Cover>
  );
};

export default LargeProfileImg;
const Item = styled.img`
  box-sizing: border-box;
  border-radius: 50%;
  width: 80px;
  height: 80px;
`;
const Cover = styled.div`
  border-radius: 50%;
  margin-right: 30px;
  width: 80px;
  height: 80px;
  background-color: #fff;
  box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.15);
  @media (max-width: 1100px) {
    margin-right: 0;
  }
`;
