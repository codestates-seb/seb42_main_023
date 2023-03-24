import React from 'react';
import styled from 'styled-components';
import WeeklyPopular from './WeeklyPopular';
import { useAppSelector } from '../../hooks';
import LikeIcon from '../../assets/common/LikeIcon';
import TimeIcon from '../../assets/common/TimeIcon';
import ViewIcon from '../../assets/common/ViewIcon';
import Thumnail from '../common/Thumnail';
import { TagItem } from '../common/Tag';
import { Link } from 'react-router-dom';
import { postListApi } from '../../api/postListapi';
import { timeSince } from '../mainP/Timecalculator';
import { PostListItem } from '../../types/PostList';

interface Props {
  posts: PostListItem[];
  currentPage: number;
}

function PostList({ posts, currentPage }: Props) {
  return (
    <List>
      {/* TODO: 서버 Weekly popular 기능 구현시 추가
      {community === '' && currentPage === 1 && <WeeklyPopular />} */}
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
                    <LikeIcon checked={false} />
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

const List = styled.ul``;
export const Item = styled.li`
  height: 100px;
  border-bottom: 1px solid var(--border-color);
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 10px;
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
`;
