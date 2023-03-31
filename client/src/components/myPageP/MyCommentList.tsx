import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useAppSelector } from '../../hooks';
import { FaRegThumbsDown } from 'react-icons/fa';
import { FaRegThumbsUp } from 'react-icons/fa';
import TimeIcon from '../../assets/common/TimeIcon';
import { PostListWrap } from './MyPostList';
import { membersCommentsListApi } from '../../api/memberapi';
import { timeSince } from '../mainP/Timecalculator';
import Pagination from '../common/Pagination';
import { CommentType } from '../../types/PostList';
import { Link } from 'react-router-dom';
import Nolist from './Nolist';

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
          data.comments.map((item: CommentType) => {
            return (
              <li key={item.commentId}>
                <Link
                  to={
                    item.comment !== '신고된 댓글입니다.'
                      ? `/posts/${item.postId}`
                      : `#`
                  }
                  className={
                    item.comment !== '신고된 댓글입니다.' ? '' : 'disabled-link'
                  }
                >
                  {item.comment === '신고된 댓글입니다.' ? (
                    <div style={{ color: '#94969b' }}>{item.comment}</div>
                  ) : (
                    <div>{item.comment}</div>
                  )}
                  <CommentInfo>
                    <span>
                      <TimeIcon />
                      {timeSince(item.createdAt)}
                    </span>
                    <span>
                      <FaRegThumbsUp size={13} />
                      {item.thumbupCount}
                    </span>
                    <span>
                      <FaRegThumbsDown size={13} />
                      {item.thumbdownCount}
                    </span>
                  </CommentInfo>
                </Link>
              </li>
            );
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
const CommentInfo = styled.div`
  color: var(--sub-font-color);

  span {
    font-size: 12px;
    margin-right: 10px;
    svg {
      transform: translateY(2px);
      margin-right: 2px;
    }
  }
`;
