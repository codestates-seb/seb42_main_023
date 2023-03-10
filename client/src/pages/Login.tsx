import React from 'react';
import styled from 'styled-components';

const Login: React.FC = () => {
  return (
    <>
      <LoginMain>
        <LoginForm />
      </LoginMain>
    </>
  );
};

export default Login;

const LoginMain = styled.div`
  width: 100%;
  /* min-height: 448px; */
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: yellow;
`;
const LoginForm = styled.div`
  width: 503px;
  height: 426px;
  /* margin: auto; */
  background-color: black;
`;
