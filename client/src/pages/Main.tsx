import React from 'react';
import styled from 'styled-components';
import PostList from '../components/mainP/PostList';
import Pagenation from '../components/mainP/Pagenation';
import DropdownButton from '../components/mainP/DropdownButton';
import { AiOutlineTrophy } from 'react-icons/ai';
import { NavBtn, NavBtnClicked } from '../components/common/Btn';
import { useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks';
import { setCommunity, setPage } from '../slices/mainSlice';

const Main = () => {
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const { community, filter, page } = useAppSelector(({ main }) => main);
  return (
    <>
      <FilterWrap>
        <div>
          {community ? (
            <ClickComuntyBtn>커뮤니티</ClickComuntyBtn>
          ) : (
            <ComuntyBtn onClick={() => dispatch(setCommunity(!community))}>
              커뮤니티
            </ComuntyBtn>
          )}
          {community ? (
            <ComuntyBtn onClick={() => dispatch(setCommunity(!community))}>
              <AiOutlineTrophy size={20} />
              명예의전당
            </ComuntyBtn>
          ) : (
            <ClickComuntyBtn>
              <AiOutlineTrophy size={20} />
              명예의전당
            </ClickComuntyBtn>
          )}
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
  margin-left: 10px;
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
