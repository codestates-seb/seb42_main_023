import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { NavBtn, NavBtnClicked } from '../common/Btn';

function HeaderNav() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  return (
    <nav>
      {'/' === pathname ? (
        <NavBtnClicked>커뮤니티</NavBtnClicked>
      ) : (
        <NavBtn onClick={() => navigate('/')}>커뮤니티</NavBtn>
      )}
      {'/seoulrent' === pathname ? (
        <NavBtnClicked>서울전월세평균</NavBtnClicked>
      ) : (
        <NavBtn onClick={() => navigate('/seoulrent')}>서울전월세평균</NavBtn>
      )}
      {'/recommendedloan' === pathname ? (
        <NavBtnClicked>공공대출추천</NavBtnClicked>
      ) : (
        <NavBtn onClick={() => navigate('/recommendedloan')}>
          공공대출추천
        </NavBtn>
      )}
      {'/happyhouse' === pathname ? (
        <NavBtnClicked>공공주택공고</NavBtnClicked>
      ) : (
        <NavBtn onClick={() => navigate('/happyhouse')}>공공주택공고</NavBtn>
      )}
    </nav>
  );
}
export default HeaderNav;
