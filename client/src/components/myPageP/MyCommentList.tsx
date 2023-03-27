import React, { useState } from 'react';
import styled from 'styled-components';
import { useAppSelector } from '../../hooks';
import { FaRegThumbsDown } from 'react-icons/fa';
import { FaRegThumbsUp } from 'react-icons/fa';
import TimeIcon from '../../assets/common/TimeIcon';
import { Link } from 'react-router-dom';
import { membersCommentsListApi } from '../../api/memberapi';
import { timeSince } from '../mainP/Timecalculator';
import { PostListWrap } from './MyPostList';
import Pagination from '../common/Pagination';

const MyCommentList = () => {
  const [pageOffset, setPageOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const { commentQuery } = useAppSelector(({ header }) => header);
  const membersCommentsListquery =
    membersCommentsListApi.useGetCommentsListQuery({
      commentQuery: commentQuery,
      page: currentPage,
    });
  const { data, isSuccess } = membersCommentsListquery;
  interface CommentType {
    commentId: number;
    memberName: string;
    memberImage: string;
    createdAt: string;
    modifiedAt: string;
    isModified: boolean;
    replyCount: number;
    thumbupCount: number;
    thumbdownCount: number; //thumbDownCount
    isThumbup: boolean;
    isThumbdown: boolean;
    length: number;
    comment: string; //content
  }
  if (!isSuccess) {
    return <div>Loading...</div>;
  }
  return (
    <PostListWrap>
      <List>
        {isSuccess &&
          data.comments.map((item: CommentType) => {
            return (
              <li key={item.commentId}>
                <div>{item.comment}</div>
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
              </li>
            );
          })}
      </List>
      {isSuccess && (
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
