import React, { useState, useEffect } from 'react';
import LikeIcon from '../../assets/common/LikeIcon';
import TimeIcon from '../../assets/common/TimeIcon';
import ViewIcon from '../../assets/common/ViewIcon';
import Thumnail from './Thumnail';
import { TagItem } from '../common/Tag';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { weeklyPopularApi } from '../../api/postListapi';
import { timeSince } from '../mainP/Timecalculator';
import { PostItem, Item, Itemside, Info, Tag } from './CommunityPost';

function WeeklyPopular() {
  //   useEffect(() => {
  //     axios('http://localhost:3000/posts/weekly-popular').then((response) => {
  //       console.log(response.data);
  //     });
  //   }, []);
  const weeklyPopularquery = weeklyPopularApi.useGetPostListQuery({
    endpoint: 'weekly-popular',
  });
  const { data, isSuccess } = weeklyPopularquery;

  return (
    <>
      {isSuccess &&
        data.posts.map((post: PostItem) => {
          return (
            <WeeklyBestItem key={post.postId}>
              <div>
                <a href="#">
                  <Thumnail content={post.imgUrl} />
                </a>
              </div>
              <div>
                <Link to={`#`}>
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
            </WeeklyBestItem>
          );
        })}
    </>
  );
}

export default WeeklyPopular;

const WeeklyBestItem = styled(Item)`
  background-color: var(--background-blue-color);
`;
