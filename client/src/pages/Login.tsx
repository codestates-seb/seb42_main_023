import React from 'react';
import styled from 'styled-components';
import { MainContainer, FormContainer } from '../components/common/Container';
import { FcGoogle } from 'react-icons/fc';
import { SiNaver } from 'react-icons/si';
import { RiKakaoTalkFill } from 'react-icons/ri';

const Login: React.FC = () => {
  const loginGoogleHandler = () => {
    return window.location.assign(
      'https://thedragonmoney.com/oauth2/authorization/google',
    );
  };

  return (
    <MainContainer>
      <FormContainer>
        <div>Logo</div>
        <p>회원가입 없이 간편하게 로그인하세요</p>
        <LoginBtnContainer>
          <button className="btn google" onClick={loginGoogleHandler}>
            <FcGoogle size="24" style={{ margin: '10px' }} />
            Google로 로그인하기
          </button>
          <button className="btn kakao">
            <RiKakaoTalkFill size="24" style={{ margin: '10px' }} />
            Kakao로 로그인하기
          </button>
          <button className="btn naver">
            <SiNaver color="#fff" style={{ margin: '10px' }} />
            Naver로 로그인하기
          </button>
        </LoginBtnContainer>
      </FormContainer>
    </MainContainer>
  );
};

export default Login;

// OAuth 버튼 컨테이너
const LoginBtnContainer = styled.div`
  width: 431px;
  height: 170px;
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
  > .kakao {
    background-color: #f2d303;
    color: #442400;
  }
  > .naver {
    background-color: #03c73c;
    color: #fff;
  }
`;
