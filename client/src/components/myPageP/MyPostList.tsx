import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAppSelector } from '../../hooks';
import { membersPostListApi } from '../../api/memberapi';
import Pagination from '../common/Pagination';
import { PostListItem } from '../../types/PostList';
import Nolist from './Nolist';
import PostItem from '../mainP/PostItem';

function MyPostList() {
  const [pageOffset, setPageOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const { memberName } = useAppSelector(({ header }) => header);

  const membersPostListquery = membersPostListApi.useGetMemberPostListQuery({
    name: memberName,
    page: currentPage,
  });
  const { data, isSuccess, refetch } = membersPostListquery;

  useEffect(() => {
    refetch();
  }, []);

  return (
    <PostListWrap>
      <List>
        {isSuccess && data.posts.length === 0 && (
          <Nolist name={'작성한 글이'} />
        )}
        {data?.posts.map((post: PostListItem) => {
          return <PostItem post={post} key={post.postId} />;
        })}
      </List>
      {data && data.posts.length !== 0 && (
        <Pagination
          pageInfo={data.pageInfo}
          pageOffset={pageOffset}
          setPageOffset={setPageOffset}
          setCurrentPage={setCurrentPage}
        />
      )}
    </PostListWrap>
  );
}

export default MyPostList;

const List = styled.ul`
  width: 100%;
`;

export const PostListWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 1000px;
`;
