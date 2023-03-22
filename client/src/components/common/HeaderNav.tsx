import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { NavBtn, NavBtnClicked } from '../common/Btn';

function HeaderNav() {
  const navigate = useNavigate();
  const state = useAppSelector((state) => state);
  const { pathname } = useLocation();
  return (
    <nav>
      {['/seoulrent', '/recommendloan', '/happyhouse'].includes(pathname) ? (
        <NavBtnClicked onClick={() => navigate('/happyhouse')}>
          집구하기
        </NavBtnClicked>
      ) : (
        <NavBtn onClick={() => navigate('/happyhouse')}>집구하기</NavBtn>
      )}
      {['/stock'].includes(pathname) ? (
        <NavBtnClicked onClick={() => navigate('/')}>뜨는주식</NavBtnClicked>
      ) : (
        <NavBtn onClick={() => navigate('/')}>뜨는주식</NavBtn>
      )}
      {['/calculator'].includes(pathname) ? (
        <NavBtnClicked onClick={() => navigate('/')}>세금계산기</NavBtnClicked>
      ) : (
        <NavBtn onClick={() => navigate('/')}>세금계산기</NavBtn>
      )}
    </nav>
  );
}
export default HeaderNav;
