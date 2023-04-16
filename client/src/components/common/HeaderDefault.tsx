import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import LoginBtn from './LoginBtn';
import SearchBar from './SearchBar';
import SearchBtn from './SearchToggle';
import PostBtn from './PostBtn';
import MediumProfileImg from './MediumProfileImg';
import HeaderNav from './HeaderNav';
import { MdManageAccounts } from 'react-icons/md';
import Cookies from 'js-cookie';
import { LogoSVG } from '../../assets/common/LogoSVG';
import { AiOutlineMenu } from 'react-icons/ai';

function HeaderDefault() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const header = useAppSelector(({ header }) => header);
  const auth = Cookies.get('Authorization');
  const adim = localStorage.getItem('role');
  const [memberImg, setMemberImg] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (auth !== undefined) {
      const img = localStorage.getItem('picture');
      if (img) {
        setMemberImg(img);
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
        <Main onClick={() => navigate('/')} aria-label="logo">
          <LogoSVG />
        </Main>
        <HeaderNav menuOpen={menuOpen} />
        <Btns>
          {(pathname === '/' || pathname === '/search') && <SearchBtn />}
          {auth === undefined && <LoginBtn />}
          {auth !== undefined && adim !== 'ADMIN' && (
            <>
              <PostBtn /> <MediumProfileImg memberImg={memberImg} />
            </>
          )}
          {auth !== undefined && adim === 'ADMIN' && (
            <Adminwrap>
              <PostBtn />
              <MediumProfileImg memberImg={memberImg} />
              <button
                onClick={() => navigate('reports/standby')}
                id="managing-page"
              >
                <MdManageAccounts size={30} />
              </button>
            </Adminwrap>
          )}
          <MenuBtn onClick={() => setMenuOpen(!menuOpen)}>
            <AiOutlineMenu size={30} />
          </MenuBtn>
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

  @media (max-width: 1100px) {
    height: 55px;
    div {
      align-items: center;
      :first-child {
        flex-direction: column;
        width: 100%;
      }
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
      position: relative;
    }
  }
  @media (max-width: 1100px) {
    padding: 10px 10px;
    div {
      :first-child {
        flex-direction: column;
        margin-top: 4px;
        width: 100%;
        margin-bottom: 28px;
        align-items: flex-start;
      }
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
  @media (max-width: 1100px) {
    position: absolute;
    right: 10px;
  }
`;
const MenuBtn = styled.button`
  display: none;
  @media (max-width: 1100px) {
    display: block;
  }
`;
const Adminwrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Main = styled.button`
  background-color: #fff;
  cursor: pointer;
  @media (max-width: 1100px) {
    position: absolute;
    left: 10px;
  }
`;
