import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PostList from '../components/mainP/PostList';
import DropdownButton from '../components/mainP/DropdownButton';
import { useAppSelector } from '../hooks';
import { postListApi } from '../api/postListapi';
import Pagenation from '../components/common/Pagination';
import { AiOutlineExclamationCircle } from 'react-icons/ai';

const Search = () => {
  //페이지네이션
  const [pageOffset, setPageOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const { postCategory, orderby } = useAppSelector(({ main }) => main);
  const { searchQuery } = useAppSelector(({ header }) => header);
  const postListquery = postListApi.useGetPostListQuery({
    postSetting: postCategory,
    page: currentPage,
    orderby: orderby,
    search: searchQuery,
  });
  const { data, isSuccess } = postListquery;

  return (
    <>
      <FilterWrap>
        {isSuccess && <h1>검색결과 {data.posts.length}개</h1>}
        <DropdownButton />
      </FilterWrap>
      {isSuccess && data.posts.length === 0 && (
        <Nodata>
          <div>
            <AiOutlineExclamationCircle size={80} />
          </div>
          <h1>검색결과가 없습니다.</h1>
        </Nodata>
      )}
      {isSuccess && data.posts.length !== 0 && (
        <PostList posts={data.posts} currentPage={currentPage} />
      )}
      {isSuccess && data.posts.length !== 0 && (
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

export default Search;

const FilterWrap = styled.div`
  display: flex;
  justify-content: space-between;
  h1 {
    font-size: 20px;
    font-weight: 400;
  }
`;
const Nodata = styled.div`
  display: flex;
  align-items: center;
  justify-items: center;
  flex-direction: column;
  margin-top: 80px;
  svg {
    color: var(--border-color);
    margin-bottom: 20px;
  }
  h1 {
    font-size: 24px;
  }
`;
