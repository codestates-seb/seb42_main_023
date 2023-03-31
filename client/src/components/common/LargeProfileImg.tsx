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
  width: 100px;
  height: 100px;
`;
const Cover = styled.div`
  border-radius: 50%;
  margin-right: 30px;
  width: 100px;
  height: 100px;
  background-color: #fff;
  box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.15);
`;
