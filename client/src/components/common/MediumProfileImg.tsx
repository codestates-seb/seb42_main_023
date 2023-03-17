import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
const MediumProfileImg = () => {
  const navigate = useNavigate();
  return (
    <Btn onClick={() => navigate('/mypage')}>
      <Item
        src={
          'https://preview.free3d.com/img/2018/03/2269226802687772611/8mk0tyu6.jpg'
        }
      />
    </Btn>
  );
};

export default MediumProfileImg;
const Item = styled.img`
  box-sizing: border-box;
  border-radius: 50%;
  object-fit: cover;
  width: 50px;
  height: 50px;
  cursor: pointer;

  transition: all 0.3s linear;
  :hover {
    transform: scale(1.2);
  }
`;
const Btn = styled.button`
  margin-left: 10px;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  background-color: #fff;
  overflow: hidden;
`;
