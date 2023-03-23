import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

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

const Btn = styled.button`
  padding: 6px 20px;
  background-color: #fff;
  box-sizing: border-box;
  border: 1px solid #d9d9d9;
  margin-left: 4px;
  :hover {
    background-color: #f9f6f6;
    transition: 0.3s;
    color: #5c5c5c;
  }
`;
