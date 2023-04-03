import React from 'react';
<<<<<<< HEAD
import styled from 'styled-components';
import WeeklyPopular from './WeeklyPopular';
import { useAppSelector } from '../../hooks';
import TimeIcon from '../../assets/common/TimeIcon';
import ViewIcon from '../../assets/common/ViewIcon';
import Thumnail from '../common/Thumbnail';
import CommentIcon from '../../assets/common/CommentIcon';
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
            <Link to={`/posts/${post.postId}`}>
              <div>
                <Thumnail content={post.imgUrl} />
              </div>
              <div>
                <h1>{post.title}</h1>
                <Itemside>
                  <div>
                    {post.tags.map((tag, idx) => (
                      <Tag key={idx}>{tag.tagName}</Tag>
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
            </Link>
          </Item>
        );
      })}
    </List>
=======
import Post from './Post';
import axios from 'axios';
import { useEffect, useState } from 'react';
import type { PostItem } from './Post';

function PostList() {
  const [data, setData] = useState<PostItem[]>([]);

  useEffect(() => {
    //post list 불러오기
    axios
      .get(
        'https://main-project-d9049-default-rtdb.asia-southeast1.firebasedatabase.app/POST.json',
      )
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <ul>
      {data &&
        data.map((post) => {
          //key값 이후에 수정하기
          return <Post key={post.writer_id} post={post} />;
        })}
    </ul>
>>>>>>> 6038065ce9f8ca42c1f373aae8d2621ff9d4483d
  );
}

export default PostList;
<<<<<<< HEAD

const List = styled.ul`
  margin-top: -4px;
  border-top: 1px solid var(--border-color);
`;
export const Item = styled.li`
  a {
    height: 100px;
    border-bottom: 1px solid var(--border-color);
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 20px;
    h1 {
      font-size: 20px;
      margin-bottom: 4px;
    }
    > div:nth-child(2) {
      flex-grow: 1;
    }
    :hover {
      background-color: var(--background-color);
    }
    .disabled-link {
      pointer-events: none;
      opacity: 0.5;
      cursor: not-allowed;
    }
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
    svg {
      margin-right: 2px;
    }
  }
`;
export const Tag = styled(TagItem)`
  padding: 4px 10px;
  color: var(--point-blue-color);
  font-size: 12px;
  background-color: #fff;
  border: 1px solid var(--point-blue-color);
`;
=======
>>>>>>> 6038065ce9f8ca42c1f373aae8d2621ff9d4483d
