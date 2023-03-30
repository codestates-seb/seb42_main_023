import React from 'react';
import styled from 'styled-components';
import WeeklyPopular from './WeeklyPopular';
import { useAppSelector } from '../../hooks';
import TimeIcon from '../../assets/common/TimeIcon';
import ViewIcon from '../../assets/common/ViewIcon';
import Thumnail from '../common/Thumbnail';
import { TagItem } from '../common/Tag';
import { Link } from 'react-router-dom';
import { timeSince } from '../mainP/Timecalculator';
import { PostListItem } from '../../types/PostList';
import { FaRegThumbsUp } from 'react-icons/fa';

interface Props {
  posts: PostListItem[];
  currentPage: number;
}

function PostList({ posts, currentPage }: Props) {
  const { postSetting } = useAppSelector(({ main }) => main);
  return (
    <List>
      {postSetting === '' && currentPage === 1 && <WeeklyPopular />}
      {posts.map((post: PostListItem) => {
        return (
          <Item key={post.postId}>
            <div>
              <Link to={`/posts/${post.postId}`}>
                <Thumnail content={post.imgUrl} />
              </Link>
            </div>
            <div>
              <Link to={`/posts/${post.postId}`}>
                <h1>{post.title}</h1>
              </Link>
              <Itemside>
                <div>
                  {post.tags.map((tag, idx) => (
                    <Tag key={idx}>{tag.tagName}</Tag>
                  ))}
                </div>
                <Info>
                  <span>{post.memberName}</span>
                  <span>
                    <TimeIcon />
                    {timeSince(post.createdAt)}
                  </span>
                  <span>
                    <ViewIcon />
                    {post.viewCount}
                  </span>
                  <span>
                    <FaRegThumbsUp size={13} />
                    {post.thumbupCount}
                  </span>
                </Info>
              </Itemside>
            </div>
          </Item>
        );
      })}
    </List>
  );
}

export default PostList;

const List = styled.ul`
  margin-top: -4px;
  border-top: 1px solid var(--border-color);
`;
export const Item = styled.li`
  height: 100px;
  border-bottom: 1px solid var(--border-color);
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 30px;
  h1 {
    font-size: 20px;
    margin-bottom: 4px;
  }
  > div:nth-child(2) {
    flex-grow: 1;
  }
`;
export const Itemside = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  > div {
    display: flex;
  }
`;
export const Info = styled.div`
  span {
    color: var(--sub-font-color);
    font-size: var(--sub-font-size);
    margin-left: 20px;
    flex-direction: row;
    display: flex;
    align-items: center;
  }
`;
export const Tag = styled(TagItem)`
  padding: 4px 10px;
  color: var(--point-blue-color);
  font-size: 12px;
  background-color: #fff;
  border: 1px solid var(--point-blue-color);
`;
