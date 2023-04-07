import React from 'react';
import styled from 'styled-components';
import { SidebarBtn, SidebarBtnClicked } from '../common/Btn';
import { useNavigate, useLocation } from 'react-router-dom';

const NavRealEstate: React.FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <NavContainer>
      <ul>
        {pathname === '/seoulrent' ? (
          <SidebarBtnClicked>서울전월세평균</SidebarBtnClicked>
        ) : (
          <SidebarBtn
            onClick={(): void => {
              navigate('/seoulrent');
            }}
          >
            서울전월세평균
          </SidebarBtn>
        )}
        {pathname === '/recommendedloan' ? (
          <SidebarBtnClicked>공공대출추천</SidebarBtnClicked>
        ) : (
          <SidebarBtn
            onClick={(): void => {
              navigate('/recommendedloan');
            }}
          >
            공공대출추천
          </SidebarBtn>
        )}
        {pathname === '/happyhouse' ? (
          <SidebarBtnClicked>행복주택공고</SidebarBtnClicked>
        ) : (
          <SidebarBtn
            onClick={(): void => {
              navigate('/happyhouse');
            }}
          >
            행복주택공고
          </SidebarBtn>
        )}
      </ul>
    </NavContainer>
  );
};

export default NavRealEstate;

// nav 컨테이너
const NavContainer = styled.nav`
  width: 160px;
  height: 400px;
  border: 1px solid var(--border-color);
  > ul {
    height: 200px;
    width: 100%;
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;
