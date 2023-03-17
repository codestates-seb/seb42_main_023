import React from 'react';
import styled from 'styled-components';
import PostList from '../components/mainP/PostList';
import Pagenation from '../components/mainP/Pagenation';
import DropdownButton from '../components/mainP/DropdownButton';
import { AiOutlineTrophy } from 'react-icons/ai';
import { NavBtn, NavBtnClicked } from '../components/common/Btn';
import { useLocation } from 'react-router-dom';

const Main = () => {
  const { pathname } = useLocation();
  return (
    <>
      <FilterWrap>
        <div>
          <ComuntyBtn>커뮤니티</ComuntyBtn>
          <ComuntyBtn>
            <AiOutlineTrophy size={20} />
            명예의전당
          </ComuntyBtn>
        </div>
        <DropdownButton />
      </FilterWrap>
      <PostList />
      <Pagenation />
    </>
  );
};

export default Main;

const ComuntyBtn = styled(NavBtn)`
  font-size: 20px;
  margin-bottom: 10px;
  margin-right: 20px;
  svg {
    transform: translateY(2px);
  }
`;
const ClickComuntyBtn = styled(ComuntyBtn)`
  color: var(--point-blue-color);
`;
const FilterWrap = styled.div`
  display: flex;
  justify-content: space-between;
`;
