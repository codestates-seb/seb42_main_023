import React from 'react';
import styled from 'styled-components';
import { MainContainer, FormContainer } from '../components/common/Container';
import { FcGoogle } from 'react-icons/fc';
import { LogoSVG } from '../assets/common/LogoSVG';
import axios from 'axios';
import Cookies from 'js-cookie';

const Login: React.FC = () => {
  const loginGoogleHandler = () => {
    return window.location.assign(
      'https://thedragonmoney.com/oauth2/authorization/google',
    );
  };

  const loginAdminHandler = () => {
    // 체험용 관리자 로그인

    axios
      .get(process.env.REACT_APP_SERVER_ADDRESS + '/manager')
      .then((res) => {
        const { name, picture, role } = res.data;
        localStorage.setItem('name', name);
        localStorage.setItem('picture', picture);
        localStorage.setItem('role', role);

        const { authorization, refresh } = res.headers;
        Cookies.set('Authorization', authorization);
        Cookies.set('Refresh', refresh);

        window.location.href = '/';
      })
      .catch((err) => console.log(err));
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
          <button className="admin" onClick={loginAdminHandler}>
            관리자로 로그인하기
          </button>
          <span>
            **체험을 위해 만든 임시 관리자 로그인 기능입니다. 기존 서비스에는
            지정된 구글 계정을 통해서만 관리자 권한으로 로그인이 가능하게
            설계했습니다.
          </span>
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
    margin-bottom: 10px;
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
  }
  > .google {
    background-color: #fff;
    color: #7b7b7b;
  }

  > .admin {
    color: var(--point-blue-color);
    font-size: 14px;
    height: 20px;
    border: 1px solid var(--border-color);
  }

  > span {
    color: #7b7b7b;
    font-size: 12px;
    margin-top: 3px;
  }
`;
