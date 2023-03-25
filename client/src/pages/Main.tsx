import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import PostList from '../components/mainP/PostList';
import DropdownButton from '../components/mainP/DropdownButton';
import { AiOutlineTrophy } from 'react-icons/ai';
import { NavBtn } from '../components/common/Btn';
import { useAppDispatch, useAppSelector } from '../hooks';
import { postListApi } from '../api/postListapi';
import { setPostSetting, setCurrentPage } from '../slices/mainSlice';
import Pagenation from '../components/common/Pagination';

const Main = () => {
  const dispatch = useAppDispatch();
  //페이지네이션
  const [pageOffset, setPageOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const { postSetting, orderby } = useAppSelector(({ main }) => main);
  const { searchQuery } = useAppSelector(({ header }) => header);
  const postListquery = postListApi.useGetPostListQuery({
    postSetting: postSetting,
    page: currentPage,
    orderby: orderby,
    search: searchQuery,
  });
  const { data, isSuccess } = postListquery;

  return (
    <>
      <FilterWrap>
        <div>
          {postSetting === '' ? (
            <ClickComuntyBtn>커뮤니티</ClickComuntyBtn>
          ) : (
            <ComuntyBtn
              onClick={() => {
                setCurrentPage(1);
                setPageOffset(0);
                dispatch(setPostSetting(''));
              }}
            >
              커뮤니티
            </ComuntyBtn>
          )}
          {postSetting === '/best-awards' ? (
            <ClickComuntyBtn>
              <AiOutlineTrophy size={20} />
              명예의전당
            </ClickComuntyBtn>
          ) : (
            <ComuntyBtn
              onClick={() => {
                setCurrentPage(1);
                setPageOffset(0);
                dispatch(setPostSetting('/best-awards'));
              }}
            >
              <AiOutlineTrophy size={20} />
              명예의전당
            </ComuntyBtn>
          )}
          <DropdownButton />
        </div>
      </FilterWrap>
      {isSuccess && <PostList posts={data.posts} currentPage={currentPage} />}
      {isSuccess && (
        <Pagenation
          pageInfo={data.pageInfo}
          pageOffset={pageOffset}
          setPageOffset={setPageOffset}
          setCurrentPage={setCurrentPage}
        />
      )}
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
