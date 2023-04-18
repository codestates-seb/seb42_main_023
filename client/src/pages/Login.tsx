import React from 'react';
import styled from 'styled-components';
import { MainContainer, FormContainer } from '../components/common/Container';
import { FcGoogle } from 'react-icons/fc';
import { LogoSVG } from '../assets/common/LogoSVG';

const Login: React.FC = () => {
  const loginGoogleHandler = () => {
    return window.location.assign(
      'https://thedragonmoney.com/oauth2/authorization/google',
    );
  };

  return (
    <MainContainer>
      <FormContainer>
        <LogoSVG />
        <p>회원가입 없이 간편하게 로그인하세요</p>
        <LoginBtnContainer>
          <button className="btn google" onClick={loginGoogleHandler}>
            <FcGoogle size="24" style={{ margin: '10px' }} />
            Google로 로그인하기
          </button>
        </LoginBtnContainer>
      </FormContainer>
    </MainContainer>
  );
};

export default Login;

const LoginBtnContainer = styled.div`
  width: 431px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  > .btn {
    height: 50px;
    border: 1px solid var(--border-color);
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 3px;
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
  }
  > .google {
    background-color: #fff;
    color: #7b7b7b;
  }
`;
