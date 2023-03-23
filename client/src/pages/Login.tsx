import React from 'react';
import styled from 'styled-components';
import { FcGoogle } from 'react-icons/fc';
import { SiNaver } from 'react-icons/si';
import { RiKakaoTalkFill } from 'react-icons/ri';

const Login: React.FC = () => {
  const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  const requestGoogleLoginHandler = (): void => {
    console.log(CLIENT_ID);
    return window.location.assign(
      `https://accounts.google.com/o/oauth2/v2/auth?scope=profile&response_type=code&client_id=${CLIENT_ID}&redirect_uri=http://hp5234-dragonmoney-front.s3-website.ap-northeast-2.amazonaws.com/setnickname`,
    );
  };
  return (
    <>
      <LoginMain>
        <LoginForm>
          <div>Logo</div>
          <p>회원가입 없이 간편하게 로그인하세요</p>
          <LoginBtnContainer>
            <button className="btn google" onClick={requestGoogleLoginHandler}>
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
        </LoginForm>
      </LoginMain>
    </>
  );
};

export default Login;

// 메인 전체
const LoginMain = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// 로그인 폼
const LoginForm = styled.div`
  width: 503px;
  height: 426px;
  margin: auto;
  background-color: #fcfcfc;
  border: 2px solid #f4f4f4;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  > p {
    color: #5c5c5c;
    font-size: 12px;
  }
`;

// OAuth 버튼 컨테이너
const LoginBtnContainer = styled.div`
  width: 431px;
  height: 170px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  > .btn {
    height: 50px;
    border: 1px solid #d4d4d4;
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
