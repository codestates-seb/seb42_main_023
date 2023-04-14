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
      <Main onClick={() => navigate('/')} aria-label="logo">
        <LogoSVG />
      </Main>
      {'/' === pathname ? (
        <NavBtnClicked id="communityOn">커뮤니티</NavBtnClicked>
      ) : (
        <NavBtn
          onClick={() => {
            navigate('/');
            window.scrollTo(0, 0);
          }}
          id="community"
        >
          커뮤니티
        </NavBtn>
      )}
      {'/seoulrent' === pathname ? (
        <NavBtnClicked id="seoulrentOn">서울전월세평균</NavBtnClicked>
      ) : (
        <NavBtn
          onClick={() => {
            navigate('/seoulrent');
            window.scrollTo(0, 0);
          }}
          id="seoulrent"
        >
          서울전월세평균
        </NavBtn>
      )}
      {'/recommendedloan' === pathname ? (
        <NavBtnClicked id="recommendedloanOn">공공대출추천</NavBtnClicked>
      ) : (
        <NavBtn
          onClick={() => navigate('/recommendedloan')}
          id="recommendedloan"
        >
          공공대출추천
        </NavBtn>
      )}
      {'/happyhouse' === pathname ? (
        <NavBtnClicked id="happyhouseOn">공공주택공고</NavBtnClicked>
      ) : (
        <NavBtn onClick={() => navigate('/happyhouse')} id="happyhouse">
          공공주택공고
        </NavBtn>
      )}
    </nav>
  );
}
export default HeaderNav;
const Main = styled.button`
  background-color: #fff;
  cursor: pointer;
`;
