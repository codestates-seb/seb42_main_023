import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Logo from '../../assets/Logo.png';
import LoginBtn from './LoginBtn';
import SearchBar from './SearchBar';

function HeaderDefault() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  useEffect(() => console.log(pathname), []);
  return (
    <Head>
      <div>
        <button onClick={() => navigate('/')}>
          <img src={Logo} height={30}></img>
        </button>
        <nav>
          <Btn onClick={() => navigate('/happyhouse')} value={pathname}>
            집구하기
          </Btn>
          <Btn onClick={() => navigate('/')} value={pathname}>
            뜨는주식
          </Btn>
          <Btn onClick={() => navigate('/')} value={pathname}>
            세금계산기
          </Btn>
        </nav>
        <LoginBtn />
      </div>
    </Head>
  );
}
interface BtnProps {
  value: string;
  children: ReactNode;
  onClick: () => void;
}
const Btn = styled.button<BtnProps>`
  :nth-child(1) {
    border-bottom: ${({ value }) =>
      ['/seoulrent', '/recommendloan', '/happyhouse'].includes(value)
        ? '1px solid #0069CA'
        : ''};
    color: ${({ value }) =>
      ['/seoulrent', '/recommendloan', '/happyhouse'].includes(value)
        ? '#0069CA'
        : ''};
  }
  :nth-child(2) {
    border-bottom: ${({ value }) =>
      ['/stock'].includes(value) ? '1px solid #0069CA' : ''};
    color: ${({ value }) => (['/stock'].includes(value) ? '#0069CA' : '')};
  }
  :nth-child(3) {
    border-bottom: ${({ value }) =>
      ['/calculator'].includes(value) ? '1px solid #0069CA' : ''};
    color: ${({ value }) => (['/calculator'].includes(value) ? '#0069CA' : '')};
  }
`;
export default HeaderDefault;

const Head = styled.header`
  border-bottom: 1px solid #d9d9d9;
  background-color: #fff;
  z-index: 199;
  button {
    background-color: #fff;
    cursor: pointer;
  }
  div {
    max-width: 1100px;
    display: flex;
    align-items: center;
    height: inherit;
    margin: 0 auto;
    justify-content: space-between;
  }
  nav {
    width: 400px;
    display: flex;
    justify-content: space-between;
    button {
      :hover {
        color: #0069ca;
        transition: 0.3s;
      }
    }
  }
`;
