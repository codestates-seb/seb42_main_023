import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Btn = styled.button`
  height: 40px;
  width: 100px;
  background-color: #0069ca;
  color: #fff;
  box-sizing: border-box;
`;

function PostBtn() {
  return (
    <>
      <Btn>글쓰기</Btn>
    </>
  );
}

export default PostBtn;
