import React from 'react';
import styled from 'styled-components';
import { useAppSelector } from '../../hooks';
import { FaRegThumbsDown } from 'react-icons/fa';
import { FaRegThumbsUp } from 'react-icons/fa';
import TimeIcon from '../../assets/common/TimeIcon';
import { Link } from 'react-router-dom';
import { membersCommentsListApi } from '../../api/memberapi';
import { timeSince } from '../mainP/Timecalculator';
import { CommentType } from '../../types/PostDetail';

const MyCommentList = () => {
  const { commentQuery } = useAppSelector(({ header }) => header);
  const membersCommentsListquery = membersCommentsListApi.useGetPostListQuery({
    commentQuery: commentQuery,
  });
  const { data, isSuccess } = membersCommentsListquery;

  if (!isSuccess) {
    return <div>Loading...</div>;
  }
  return (
    <List>
      {isSuccess &&
        data.map((comment: CommentType) => {
          return (
            <li key={comment.commentId}>
              <div>{comment.content}</div>
              <CommentInfo>
                <span>
                  <TimeIcon />
                  {timeSince(comment.createdAt)}
                </span>
                <span>
                  <FaRegThumbsUp size={13} />
                  {comment.thumbupCount}
                </span>
                <span>
                  <FaRegThumbsDown size={13} />
                  {comment.thumbDownCount}
                </span>
              </CommentInfo>
            </li>
          );
        })}
    </List>
  );
};
export default MyCommentList;
const List = styled.ul`
  width: 100%;
  overflow: scroll;
  border: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  li {
    width: 100%;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid var(--border-color);
    padding: 20px 10px;
    div {
      :first-child {
        max-width: 70%;
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
