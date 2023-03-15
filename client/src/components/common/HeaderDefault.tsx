import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAppSelector } from '../../hooks';
import Logo from '../../assets/Logo.png';
import LoginBtn from './LoginBtn';
import SearchBar from './SearchBar';
import SearchBtn from './SearchBtn';
import PostBtn from './PostBtn';
import MediumProfileImg from './MediumProfileImg';

function HeaderDefault() {
  const navigate = useNavigate();
  const state = useAppSelector((state) => state);

  const { pathname } = useLocation();
  return state.header.search ? (
    <SearchHead>
      <SearchBar />
    </SearchHead>
  ) : (
    <NavHead>
      <div>
        <Home onClick={() => navigate('/')}>
          <img src={Logo} height={30}></img>
        </Home>
        <nav>
          <NavBtn onClick={() => navigate('/happyhouse')} value={pathname}>
            집구하기
          </NavBtn>
          <NavBtn onClick={() => navigate('/')} value={pathname}>
            뜨는주식
          </NavBtn>
          <NavBtn onClick={() => navigate('/')} value={pathname}>
            세금계산기
          </NavBtn>
        </nav>
        <Btns>
          {pathname === '/' && <SearchBtn />}
          {state.header.login ? (
            <>
              <PostBtn /> <MediumProfileImg />
            </>
          ) : (
            <>
              <LoginBtn />
            </>
          )}
        </Btns>
      </div>
    </NavHead>
  );
}
export default HeaderDefault;

interface BtnProps {
  value: string;
  children: ReactNode;
  onClick: () => void;
}
const NavBtn = styled.button<BtnProps>`
  background-color: #fff;
  cursor: pointer;
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

const Home = styled.button`
  background-color: #fff;
  cursor: pointer;
`;
const NavHead = styled.header`
  border-bottom: 1px solid #d9d9d9;
  background-color: #fff;
  z-index: 98;
  padding: 10px 0;
  margin: 0 auto;
  div {
    max-width: 1100px;
    align-items: center;
    :first-child {
      margin: 0px auto;
      display: flex;
      justify-content: space-between;
    }
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
const SearchHead = styled.header`
  border-bottom: 1px solid #d9d9d9;
  background-color: #fff;
  padding: 10px 0;
  z-index: 98;
  div {
    max-width: 1100px;
    align-items: center;
    :first-child {
      display: flex;
      justify-content: space-between;
    }
  }
`;
const Btns = styled.div`
  display: flex;
`;
