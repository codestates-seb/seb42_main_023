import React, { useEffect, useState } from 'react';
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
import Cookies from 'js-cookie';
import { LogoSVG } from '../../assets/common/LogoSVG';
import { AiOutlineMenu } from 'react-icons/ai';
import { setSearch } from '../../slices/headerSlice';

function HeaderDefault() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const header = useAppSelector(({ header }) => header);
  const auth = Cookies.get('Authorization');
  const adim = 'ADMIN';
  //localStorage.getItem('role');
  const [memberImg, setMemberImg] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    if (pathname === '/search') {
      dispatch(setSearch(true));
    }
    if (pathname !== '/search') {
      dispatch(setSearch(false));
    }
  }, [pathname]);
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
        <div>
          <LogoBtn onClick={() => navigate('/')} aria-label="logo">
            <LogoSVG />
          </LogoBtn>
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
                  aria-label="managingPage"
                >
                  <MdManageAccounts size={30} />
                </button>
              </Adminwrap>
            )}
            <MenuBtn onClick={() => setMenuOpen(!menuOpen)} aria-label="menu">
              <AiOutlineMenu size={30} />
            </MenuBtn>
          </Btns>
        </div>
        <HeaderNav menuOpen={menuOpen} />
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
  > div {
    max-width: 1100px;
    margin: 0px auto;
    position: relative;
    div {
      display: flex;
      justify-content: space-between;
    }
  }

  @media (max-width: 1100px) {
    height: 55px;
    padding: 10px;
    div {
      :first-child {
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
    display: flex;
    justify-content: space-between;
    position: relative;
  }
  @media (max-width: 1100px) {
    padding: 10px;
    div {
      :first-child {
        flex-direction: column;
        margin-top: 4px;
        width: 100%;
        margin-bottom: 28px;
        align-items: center;
      }
    }
  }
`;
const Btns = styled.div`
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
const MenuBtn = styled.button`
  display: none;
  @media (max-width: 1100px) {
    display: block;
    transform: translateY(2px);
  }
`;
const Adminwrap = styled.div`
  display: flex;
`;
const LogoBtn = styled.button`
  background-color: #fff;
  cursor: pointer;
  @media (max-width: 1100px) {
    left: 10px;
  }
`;
