import React, { useState } from 'react';
import styled from 'styled-components';
import PostItem from '../components/mainP/PostItem';
import DropdownButton from '../components/mainP/DropdownButton';
import { postListApi } from '../api/postListapi';
import Pagenation from '../components/common/Pagination';
import { PostListItem } from '../types/PostList';
import { List } from '../pages/Main';
import Nolist from '../components/myPageP/Nolist';
import { useLocation } from 'react-router-dom';

const Search = () => {
  const [pageOffset, setPageOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [orderby, setOrderby] = useState('latest');
  const { search } = useLocation();
  const searchQuery = `&${search.slice(1)}`;
  const postListquery = postListApi.useGetPostListQuery({
    postSetting: '/search',
    page: currentPage,
    orderby: orderby,
    search: searchQuery,
  });
  const { data } = postListquery;

  return (
    <>
      <FilterWrap>
        <h1>검색결과 {data?.posts.length}개</h1>
        <DropdownButton setOrderby={setOrderby} />
      </FilterWrap>
      {data?.posts.length === 0 && <Nolist name={'검색결과가'} />}
      {data?.posts.length !== 0 && (
        <List>
          {data?.posts.map((post: PostListItem) => {
            return <PostItem post={post} key={post.postId} />;
          })}
        </List>
      )}
      {data && data.posts.length !== 0 && (
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
  margin: 0 10px;
  h1 {
    font-size: 20px;
    font-weight: 400;
  }
`;
