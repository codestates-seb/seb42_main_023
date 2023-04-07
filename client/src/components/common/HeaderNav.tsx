import React from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import { LogoSVG } from '../../assets/common/LogoSVG';
import { NavBtn, NavBtnClicked } from '../common/Btn';

function HeaderNav() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  return (
    <nav>
      <Main onClick={() => navigate('/')}>
        <LogoSVG />
      </Main>
      {'/' === pathname ? (
        <NavBtnClicked>커뮤니티</NavBtnClicked>
      ) : (
        <NavBtn
          onClick={() => {
            navigate('/');
            window.scrollTo(0, 0);
          }}
        >
          커뮤니티
        </NavBtn>
      )}
      {'/seoulrent' === pathname ? (
        <NavBtnClicked>서울전월세평균</NavBtnClicked>
      ) : (
        <NavBtn
          onClick={() => {
            navigate('/seoulrent');
            window.scrollTo(0, 0);
          }}
        >
          서울전월세평균
        </NavBtn>
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
const Main = styled.button`
  background-color: #fff;
  cursor: pointer;
`;
