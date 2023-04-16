import React from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import { NavBtn, NavBtnClicked } from '../common/Btn';

function HeaderNav({ menuOpen }: { menuOpen: boolean }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  return (
    <NavList menuOpen={menuOpen}>
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
    </NavList>
  );
}
export default HeaderNav;
interface Nav {
  menuOpen: boolean;
}

const NavList = styled.nav<Nav>`
  width: 780px;
  margin-left: 80px;
  justify-content: space-between;
  background-color: #fff;
  button {
    margin-right: 30px;
  }
  @media (max-width: 1100px) {
    margin: 0;
    margin-top: 42px;
    width: 100%;
    display: ${({ menuOpen }) => (menuOpen ? 'flex' : 'none')};
    flex-direction: column;
    padding: 20px 0;
    border-bottom: 1px solid var(--border-color);
    box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.15);
    button {
      margin-right: 0;
      font-size: 20px;
    }
  }
`;
