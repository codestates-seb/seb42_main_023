import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { CommentListItem } from '../../types/PostList';
import { FaRegThumbsDown } from 'react-icons/fa';
import { FaRegThumbsUp } from 'react-icons/fa';
import TimeIcon from '../../assets/common/TimeIcon';
import { getTimeSince } from '../../util/timeCalculator';

const CommentItem = ({ item }: { item: CommentListItem }) => {
  return (
    <li key={item.commentId}>
      <Link
        to={
          item.comment !== '신고된 댓글입니다.' ? `/posts/${item.postId}` : `#`
        }
        className={item.comment !== '신고된 댓글입니다.' ? '' : 'disabled-link'}
      >
        {item.comment === '신고된 댓글입니다.' ? (
          <div style={{ color: '#94969b' }}>{item.comment}</div>
        ) : (
          <div>{item.comment}</div>
        )}
        <CommentInfo>
          <span>
            <TimeIcon />
            {getTimeSince(item.createdAt)}
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
};

export default CommentItem;
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
