import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

function PostBtn() {
  const navigate = useNavigate();
  return (
    <>
      <Btn onClick={() => navigate('/post/update')}>글쓰기</Btn>
    </>
  );
}

export default PostBtn;
const Btn = styled.button`
  padding: 6px 20px;
  box-sizing: border-box;
  border: 1px solid #d9d9d9;
  background-color: #fff;
  margin-left: 4px;
  :hover {
    background-color: #f9f6f6;
    transition: 0.3s;
    color: #5c5c5c;
  }
`;
