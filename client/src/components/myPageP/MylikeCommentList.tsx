import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { membersCommentsListApi } from '../../api/membersApi';
import { PostListWrap } from './MyPostList';
import Pagination from '../common/Pagination';
import { CommentListItem } from '../../types/PostList';
import Nolist from './Nolist';
import CommentItem from './CommentItem';

const MylikeCommentList = ({ memberName }: { memberName: string }) => {
  const [pageOffset, setPageOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const membersCommentsListquery =
    membersCommentsListApi.useGetLikeCommentsListQuery({
      name: memberName,
      page: currentPage,
    });
  const { data, isSuccess, refetch } = membersCommentsListquery;
  useEffect(() => {
    refetch();
  }, []);
  return (
    <PostListWrap>
      <List>
        {isSuccess && data.comments.length === 0 && (
          <Nolist name={'좋아요한 댓글이'} />
        )}
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
export default MylikeCommentList;
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
const CommentInfo = styled.div`
  color: var(--sub-font-color);

  span {
    font-size: 12px;
    margin-right: 10px;
    svg {
      transform: translateY(2px);
    }
  }
`;
