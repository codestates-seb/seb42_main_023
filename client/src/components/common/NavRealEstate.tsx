import React from 'react';
import styled from 'styled-components';
import { useState } from 'react';

const NavRealEstate: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<number>(1);

  const setCurrentTabHandler = (tab: number): void => {
    setCurrentTab(tab);
  };

  return (
    <NavContainer>
      <NavItems>
        <li
          className={currentTab === 1 ? 'current' : ''}
          onClick={(): void => setCurrentTabHandler(1)}
        >
          서울전월세평균
        </li>
        <li
          className={currentTab === 2 ? 'current' : ''}
          onClick={(): void => setCurrentTabHandler(2)}
        >
          공공대출추천
        </li>
        <li
          className={currentTab === 3 ? 'current' : ''}
          onClick={(): void => setCurrentTabHandler(3)}
        >
          행복주택공고
        </li>
      </NavItems>
    </NavContainer>
  );
};

export default NavRealEstate;

const NavContainer = styled.nav`
  width: 165px;
  height: 350px;
  border: 2px solid #d4d4d4;
`;

const NavItems = styled.ul`
  height: 200px;
  width: 160px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  > li {
    width: 130px;
    height: 50px;
    text-align: center;
    padding-top: 17px;
  }
`;
