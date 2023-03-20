import React, { useState, useEffect } from 'react';
import LikeIcon from '../../assets/common/LikeIcon';
import TimeIcon from '../../assets/common/TimeIcon';
import ViewIcon from '../../assets/common/ViewIcon';
import Thumnail from './Thumnail';
import { BsTrophy } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { weeklyPopularApi } from '../../api/postListapi';
import { timeSince } from '../mainP/Timecalculator';
import { PostItem, Itemside, Info, Tag } from './PostList';

function WeeklyPopular() {
  const weeklyPopularquery = weeklyPopularApi.useGetPostListQuery({
    endpoint: 'weekly-popular',
  });
  const { data, isSuccess } = weeklyPopularquery;

  return (
    <>
      {isSuccess &&
        data.posts.map((post: PostItem, index: number) => {
          return (
            <WeeklyBestItem key={post.postId}>
              <div>
                <Link to={`/posts/${post.postId}`}>
                  <Thumnail content={post.imgUrl} />
                </Link>
              </div>
              <div>
                <Link to={`/posts/${post.postId}`}>
                  <h1>
                    {post.title}
                    <div>
                      <BsTrophy size={20} />
                      <span>{index + 1}</span>
                    </div>
                  </h1>
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
            </WeeklyBestItem>
          );
        })}
    </>
  );
}

export default WeeklyPopular;
const Item = styled.li`
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
const WeeklyBestItem = styled(Item)`
  background-color: var(--background-blue-color);
  h1 {
    div {
      position: relative;
      display: inline-block;
      svg {
        color: var(--point-blue-color);
        margin-left: 10px;
        transform: translateY(2px);
      }
      span {
        position: absolute;
        font-size: 10px;
        right: 7px;
        top: 3px;
        color: var(--point-blue-color);
      }
    }
  }
`;
