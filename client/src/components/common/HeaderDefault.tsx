import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks';
import Logo from '../../assets/Logo.png';
import LoginBtn from './LoginBtn';
import SearchBar from './SearchBar';
import SearchBtn from './SearchToggle';
import PostBtn from './PostBtn';
import MediumProfileImg from './MediumProfileImg';
import HeaderNav from './HeaderNav';
import { MdManageAccounts } from 'react-icons/md';
import {
  setPostQuery,
  setCommentQuery,
  setMemberName,
  setMemberImg,
} from '../../slices/headerSlice';
import Cookies from 'js-cookie';

function HeaderDefault() {
  const navigate = useNavigate();
  const header = useAppSelector(({ header }) => header);
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const auth = Cookies.get('Authorization');
  const adim = 'ADMIN';
  //localStorage.getItem('role');

  //TODO: 로그인시 유저데이터 저장
  useEffect(() => {
    if (auth !== undefined) {
      const loginUser = localStorage.getItem('name');
      const memberImg = localStorage.getItem('picture');

      if (loginUser && memberImg) {
        dispatch(setPostQuery(loginUser));
        dispatch(setCommentQuery(loginUser));
        dispatch(setMemberName(loginUser));
        dispatch(setMemberImg(memberImg));
      }
    }
  }, []);
  return header.search ? (
    <SearchHead>
      <SearchBar />
    </SearchHead>
  ) : (
    <NavHead>
      <div>
        <Main onClick={() => navigate('/')}>
          <img src={Logo} height={30}></img>
        </Main>
        <HeaderNav />
        <Btns>
          {pathname === '/' && <SearchBtn />}
          {/* {auth === undefined && <LoginBtn />} */}
          {auth !== undefined && adim !== 'ADMIN' && (
            <>
              <PostBtn /> <MediumProfileImg />
            </>
          )}
          {adim === 'ADMIN' && (
            <Adminwrap>
              <PostBtn />
              <MediumProfileImg />
              <button onClick={() => navigate('reports/standby')}>
                <MdManageAccounts size={30} />
              </button>
            </Adminwrap>
          )}
        </Btns>
      </div>
    </NavHead>
  );
}
export default HeaderDefault;

const Main = styled.button`
  background-color: #fff;
  cursor: pointer;
`;
const NavHead = styled.header`
  border-bottom: 1px solid var(--border-color);
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
  }
`;
const SearchHead = styled.header`
  border-bottom: 1px solid var(--border-color);
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
  button {
    margin-left: 10px;
    svg {
      width: 30px;
      :hover {
        transition: 0.3s;
        color: var(--hover-font-gray-color);
      }
    }
  }
`;
const Adminwrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
