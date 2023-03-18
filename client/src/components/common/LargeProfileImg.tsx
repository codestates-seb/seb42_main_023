import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
const LargeProfileImg = () => {
  const navigate = useNavigate();
  return (
    <Cover onClick={() => navigate('/mypage')}>
      <Item
        src={
          'https://preview.free3d.com/img/2018/03/2269226802687772611/8mk0tyu6.jpg'
        }
      />
    </Cover>
  );
};

export default LargeProfileImg;
const Item = styled.img`
  box-sizing: border-box;
  border-radius: 50%;
  object-fit: cover;
  width: 100px;
  height: 100px;
  transition: all 0.3s linear;
  :hover {
    transform: scale(1.2);
  }
`;
const Cover = styled.div`
  border-radius: 50%;
  width: 100px;
  height: 100px;
  background-color: #fff;
  overflow: hidden;
  box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.15);
`;
