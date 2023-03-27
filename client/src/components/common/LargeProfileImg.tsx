import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
const LargeProfileImg = ({ url }: { url: string }) => {
  const navigate = useNavigate();
  return (
    <Cover onClick={() => navigate('/mypage')}>
      <Item src={url} />
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
