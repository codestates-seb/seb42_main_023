import React from 'react';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const NavAdmin: React.FC = () => {
  const navigate = useNavigate();

  const [currentTab, setCurrentTab] = useState<number>(1);

  useEffect(() => {
    switch (window.location.pathname) {
      case '/':
        setCurrentTab(0);
        break;
      case '/':
        setCurrentTab(1);
        break;
      case '/happyhouse':
        setCurrentTab(2);
        break;
      default:
        setCurrentTab(1);
        break;
    }
  }, []);

  return (
    <NavContainer>
      <ul>
        <li
          className={currentTab === 0 ? 'current' : ''}
          onClick={(): void => {
            navigate('/');
          }}
        >
          서울전월세평균
        </li>
        <li
          className={currentTab === 1 ? 'current' : ''}
          onClick={(): void => {
            navigate('/recommendedloan');
          }}
        >
          공공대출추천
        </li>
        <li
          className={currentTab === 2 ? 'current' : ''}
          onClick={(): void => {
            navigate('/happyhouse');
          }}
        >
          행복주택공고
        </li>
      </ul>
    </NavContainer>
  );
};

export default NavAdmin;

// nav 컨테이너
const NavContainer = styled.nav`
  width: 140px;
  height: 100%;
  background-color: #102940;
  /* border: 2px solid var(--border-color); */
  > ul {
    height: 200px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    > li {
      width: 120px;
      height: 50px;
      text-align: center;
      padding-top: 16px;
      margin-top: 18px;
      cursor: pointer;
    }
    > .current {
      background-color: var(--background-dark-color);
      border: 1px solid var(--border-color);
      font-weight: 700;
    }
  }
`;
