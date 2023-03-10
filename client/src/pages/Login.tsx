import React from 'react';
import styled from 'styled-components';

const Login: React.FC = () => {
  return (
    <>
      <LoginForm />
    </>
  );
};

export default Login;

const LoginForm = styled.div`
  width: 382px;
  height: 166px;
  background-color: black;
`;
