import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks';
import LoginBtn from './LoginBtn';
import SearchBar from './SearchBar';
import SearchBtn from './SearchToggle';
import PostBtn from './PostBtn';
import MediumProfileImg from './MediumProfileImg';
import HeaderNav from './HeaderNav';
import { MdManageAccounts } from 'react-icons/md';
import { setMemberImg, setMemberName } from '../../slices/headerSlice';
import Cookies from 'js-cookie';

function HeaderDefault() {
  const navigate = useNavigate();
  const header = useAppSelector(({ header }) => header);
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const auth = Cookies.get('Authorization');
  const adim = localStorage.getItem('role');

  //TODO: 로그인시 유저데이터 저장
  useEffect(() => {
    if (auth !== undefined) {
      const memberImg = localStorage.getItem('picture');
      const memberName = localStorage.getItem('name');
      if (memberImg && memberName) {
        console.log(memberName);
        dispatch(setMemberImg(memberImg));
        dispatch(setMemberName(memberName));
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
        <HeaderNav />
        <Btns>
          {(pathname === '/' || pathname === '/search') && <SearchBtn />}
          {auth === undefined && <LoginBtn />}
          {auth !== undefined && adim !== 'ADMIN' && (
            <>
              <PostBtn /> <MediumProfileImg />
            </>
          )}
          {auth !== undefined && adim === 'ADMIN' && (
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
    width: 780px;
    display: flex;
    justify-content: space-between;
    button {
      margin-right: 30px;
    }
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
      color: var(--hover-font-gray-color);
      :hover {
        transition: 0.3s;
        color: var(--main-font-color);
      }
    }
  }
`;
const Adminwrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
