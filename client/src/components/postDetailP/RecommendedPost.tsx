import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { PostType } from '../../types/PostDetail';
import { recommendedPostsApi } from '../../api/recommendPostApi';
import { AiFillStar } from 'react-icons/ai';
//AiFillStar
const RecommendedPost: React.FC = () => {
  const recommendPostsQuery = recommendedPostsApi.useGetRomendedPostsQuery({
    recommend: 'recommend',
  });
  const { data } = recommendPostsQuery;

  return (
    <RecommendedPostContainer>
      <ul>
        <h1>
          <AiFillStar />
          추천게시글
        </h1>
        {data?.recommends.map((post: Partial<PostType>) => {
          const url = `/posts/${post.postId}`;
          return (
            <li key={post.postId}>
              <p>
                <Link to={url}>
                  <h2>{post.title}</h2>
                </Link>
              </p>
            </li>
          );
        })}
      </ul>
    </RecommendedPostContainer>
  );
};

export default RecommendedPost;

const RecommendedPostContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  height: 100%;
  margin-top: 18px;

  h1 {
    margin-bottom: 20px;
    font-weight: 500;
    font-size: 18px;
    display: flex;
    align-items: center;
    color: var(--point-blue-color);
    svg {
      color: var(--point-blue-color);
      margin-right: 4px;
    }
  }
  li p {
    margin: 15px 0 15px 0;
    width: 250px;
    height: 25px;
    font-size: 19px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    line-height: 15px;
    cursor: pointer;
  }
  a {
    text-decoration: none;
    color: #5c5c5c;
    font-weight: 550;
    h2 {
      height: 30px;
      width: 250px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    :hover {
      color: var(--point-blue-color);
    }
  }
`;
