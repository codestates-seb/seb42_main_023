import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Btn = styled.button`
  height: 40px;
  width: 100px;
  background-color: #fff;
  box-sizing: border-box;
  border: 1px solid #d9d9d9;
  :hover {
    background-color: #f9f6f6;
    transition: 0.3s;
    color: #5c5c5c;
  }
`;

function LoginBtn() {
  const navigate = useNavigate();
  return (
    <>
      <Btn
        onClick={() => {
          navigate('/login');
        }}
      >
        로그인
      </Btn>
    </>
  );
}

export default LoginBtn;
