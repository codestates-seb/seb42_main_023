import React from 'react';
import styled from 'styled-components';
import { useAppSelector } from '../../hooks';
import DislikeIcon from '../../assets/common/DislikeIcon';
import LikeIcon from '../../assets/common/LikeIcon';
import TimeIcon from '../../assets/common/TimeIcon';
import { Link } from 'react-router-dom';
import { membersCommentsListApi } from '../../api/memberapi';
import { timeSince } from '../mainP/Timecalculator';
import { CommentInfo } from '../postDetailP/Comment';
import { CommentType } from '../../types/PostDetail';
const MyCommentList = () => {
  const { memberName } = useAppSelector(({ header }) => header);
  const membersCommentsListquery = membersCommentsListApi.useGetPostListQuery({
    name: memberName,
  });
  const { data, isSuccess } = membersCommentsListquery;

  if (!isSuccess) {
    return <div>Loading...</div>;
  }
  return (
    <List>
      {isSuccess &&
        data.comments.map((comment: CommentType) => {
          <>
            {/* <li>{comment.content}</li> */}
            {/* <li>{comment.memberName}</li> */}
            {/* <li>{comment.createdAt}</li>
            <li>{comment.thumbupCount}</li>
            <li>{comment.thumbDownCount}</li> */}
          </>;
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
`;
const CommentItem = styled(CommentInfo)``;
