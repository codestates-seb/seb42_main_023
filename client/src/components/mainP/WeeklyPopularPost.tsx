import React from 'react';
import TimeIcon from '../../assets/common/TimeIcon';
import ViewIcon from '../../assets/common/ViewIcon';
import CommentIcon from '../../assets/common/CommentIcon';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { getTimeSince } from '../../util/timeCalculator';
import { Tag } from './PostItem';
import { PostListItem } from '../../types/PostList';
import { FaRegThumbsUp } from 'react-icons/fa';

function WeeklyPopularPost({ post }: { post: PostListItem }) {
  return (
    <WeeklyBestItem url={post.imgUrl && post.imgUrl}>
      <Link to={`/posts/${post.postId}`}>
        <h1>{post.title}</h1>
        <TagList>
          {post.tags.map((tag, index) => (
            <Tag key={index}>{tag.tagName}</Tag>
          ))}
        </TagList>
        <Information>
          <div>{post.memberName}</div>
          <div>
            <CommentIcon checked={false} />
            {post.commentCount}
          </div>
          <div>
            <TimeIcon />
            {getTimeSince(post.createdAt)}
          </div>
          <div>
            <ViewIcon />
            {post.viewCount}
          </div>
          <div>
            <FaRegThumbsUp size={13} />
            {post.thumbupCount}
          </div>
        </Information>
      </Link>
    </WeeklyBestItem>
  );
}

export default WeeklyPopularPost;

interface Url {
  url: string;
}
const WeeklyBestItem = styled.li<Url>`
  width: 32.5%;
  position: relative;
  background-image: linear-gradient(rgb(23 0 211 / 72%), rgb(0 25 83 / 94%)),
    url(${(props) => props.url});
  background-size: cover;
  background-position: center;
  border-radius: 10px;
  display: flex;
  a {
    padding: 40px 20px;
    text-align: center;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-radius: 10px;
    transition: background-color 0.2s ease-in;
    h1 {
      color: #fff;
      font-size: 20px;
      margin-bottom: 4px;
    }
    :hover {
      background: rgba(13, 18, 117, 0.434);
    }
    :active {
      box-shadow: inset 0px 0px 30px rgba(3, 1, 22, 0.5);
    }
  }
  @media (max-width: 640px) {
    width: auto;
    margin: 10px 0;
  }
`;
const TagList = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
  flex-wrap: wrap;
`;
const Information = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: baseline;
  div {
    color: #fff;
    margin-right: 6px;
    font-size: 14px;
    svg {
      color: #fff;
      margin-right: 2px;
    }
    :nth-child(3) {
      svg {
        transform: translateY(2px);
      }
    }
    :nth-child(4) {
      svg {
        transform: translateY(3px);
      }
    }
  }
`;
