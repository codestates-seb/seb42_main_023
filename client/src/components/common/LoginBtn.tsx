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
  padding: 4px 14px;
  font-size: 14px;
  background-color: #fff;
  box-sizing: border-box;
  border: 1px solid #d9d9d9;
<<<<<<< HEAD
  margin-left: 4px;
  font-weight: 600;
=======
>>>>>>> 6038065ce9f8ca42c1f373aae8d2621ff9d4483d
  :hover {
    background-color: #f9f6f6;
    transition: 0.3s;
    color: #5c5c5c;
  }
`;
