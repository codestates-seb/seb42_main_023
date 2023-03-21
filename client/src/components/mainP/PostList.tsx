import React from 'react';
import styled from 'styled-components';
import WeeklyPopular from './WeeklyPopular';
import { useAppSelector } from '../../hooks';
import LikeIcon from '../../assets/common/LikeIcon';
import TimeIcon from '../../assets/common/TimeIcon';
import ViewIcon from '../../assets/common/ViewIcon';
import Thumnail from './Thumnail';
import Pagenation from './Pagenation';
import { TagItem } from '../common/Tag';
import { Link } from 'react-router-dom';
import { postListApi } from '../../api/postListapi';
import { timeSince } from '../mainP/Timecalculator';

export interface Tags {
  id: number;
  tagName: string;
}

export interface PostItem {
  postId: number;
  imgUrl: string;
  title: string;
  tags: Tags[];
  memberName: string;
  createdAt: string;
  modified_at: string;
  viewCount: number;
  thumbupCount: number;
}

function PostList() {
  const { community } = useAppSelector(({ main }) => main);
  const postListquery = postListApi.useGetPostListQuery({
    endpoint: community,
  });
  const { data, isSuccess } = postListquery;

  if (!isSuccess) {
    return <div>Loading...</div>;
  }

  return (
    <List>
      {community === '' && data.pageInfo.page === 1 && <WeeklyPopular />}
      {isSuccess &&
        data.posts.map((post: PostItem) => {
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
                    {post.tags.map((tag) => (
                      <Tag key={tag.id}>{tag.tagName}</Tag>
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
      {isSuccess && <Pagenation />}
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
