import React from 'react';
import TimeIcon from '../../assets/common/TimeIcon';
import ViewIcon from '../../assets/common/ViewIcon';
import CommentIcon from '../../assets/common/CommentIcon';
import Thumnail from '../common/Thumbnail';
import { BsTrophy } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { weeklyPopularApi } from '../../api/postListapi';
import { getTimeSince } from '../common/timeCalculator';
import { Itemside, Info, Tag } from '../common/PostList';
import { PostListItem } from '../../types/PostList';
import { FaRegThumbsUp } from 'react-icons/fa';
import { Item } from '../common/PostList';

function WeeklyPopular() {
  const weeklyPopularquery = weeklyPopularApi.useGetWeekPostListQuery({
    endpoint: 'weekly-popular',
  });
  const { data, isSuccess } = weeklyPopularquery;

  return (
    <List>
      {isSuccess &&
        data.posts.map((post: PostListItem, index: number) => {
          return (
            <WeeklyBestItem key={post.postId}>
              <Link to={`/posts/${post.postId}`}>
                <div>
                  <Thumnail content={post.imgUrl} />
                </div>
                <div>
                  <h1>
                    {post.title}
                    <div>
                      <BsTrophy size={20} />
                      <span>{index + 1}</span>
                    </div>
                  </h1>
                  <Itemside>
                    <div>
                      {post.tags.map((tag, index) => (
                        <Tag key={index}>{tag.tagName}</Tag>
                      ))}
                    </div>
                    <Info>
                      <span>{post.memberName}</span>
                      <span>
                        <CommentIcon checked={false} />
                        {post.commentCount}
                      </span>
                      <span>
                        <TimeIcon />
                        {getTimeSince(post.createdAt)}
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
              </Link>
            </WeeklyBestItem>
          );
        })}
    </List>
  );
}

export default WeeklyPopular;
const List = styled.ul`
  margin-top: -4px;
  border-top: 1px solid var(--border-color);
`;

const WeeklyBestItem = styled(Item)`
  background-color: var(--background-blue-color);
  a {
    :hover {
      background-color: var(--background-hover-blue-color);
    }
  }
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
