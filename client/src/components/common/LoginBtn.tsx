import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Btn = styled.button`
  height: 40px;
  width: 100px;
  background-color: #fff;
  box-sizing: border-box;
  border: 1px solid #d4d4d4;
`;

function LoginBtn() {
  return (
    <>
      <Btn>로그인</Btn>
    </>
  );
}

export default LoginBtn;
