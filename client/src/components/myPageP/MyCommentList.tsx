import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useAppSelector } from '../../hooks';
import { PostListWrap } from './MyPostList';
import { membersCommentsListApi } from '../../api/memberApi';
import Pagination from '../common/Pagination';
import Nolist from './Nolist';
import CommentItem from './CommentItem';
import { CommentListItem } from '../../types/PostList';

const MyCommentList = () => {
  const [pageOffset, setPageOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const { memberName } = useAppSelector(({ header }) => header);
  const membersCommentsListquery =
    membersCommentsListApi.useGetCommentsListQuery({
      name: memberName,
      page: currentPage,
    });
  const { data, isSuccess, refetch } = membersCommentsListquery;

  useEffect(() => {
    refetch();
  }, []);

  return (
    <PostListWrap>
      {isSuccess && data.comments.length === 0 && (
        <Nolist name={'작성한 댓글이'} />
      )}
      <List>
        {isSuccess &&
          data.comments.length !== 0 &&
          data.comments.map((item: CommentListItem) => {
            return <CommentItem item={item} key={item.commentId} />;
          })}
      </List>
      {isSuccess && data.comments.length !== 0 && (
        <Pagination
          pageInfo={data.pageInfo}
          pageOffset={pageOffset}
          setPageOffset={setPageOffset}
          setCurrentPage={setCurrentPage}
        />
      )}
    </PostListWrap>
  );
};
export default MyCommentList;
const List = styled.ul`
  width: 100%;
  overflow: scroll;
  display: flex;
  flex-direction: column;
  li {
    a {
      width: 100%;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid var(--border-color);
      padding: 20px 20px;
      div {
        :first-child {
          max-width: 70%;
        }
      }
      :hover {
        background-color: var(--background-color);
      }
    }
  }
`;
