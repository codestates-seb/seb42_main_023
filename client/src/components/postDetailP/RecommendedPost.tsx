import React from 'react';
import styled from 'styled-components';
import { BsDot } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { PostType } from '../../types/PostDetail';
import { recomendedPostsApi } from '../../api/postApi';

const RecommendedPost: React.FC = () => {
  const recommendPostsQuery = recomendedPostsApi.useGetRomendedPostsQuery({
    recommend: 'recommend',
  });
  const { data, isSuccess } = recommendPostsQuery;
  console.log('Recodata', data);
  return (
    <RecommendedPostContainer>
      <ul>
        {isSuccess &&
          data?.map((post: Partial<PostType>) => {
            const url = `/posts/${post.postId}`;
            return (
              <li key={post.postId}>
                <p>
                  <Link to={url}>
                    <h1>
                      <BsDot></BsDot>
                      {post.title}
                    </h1>
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
  align-items: center;

  li p {
    margin: 15px 0 15px 0;
    width: 250px;
    font-size: 19px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    cursor: pointer;
  }
  a {
    text-decoration: none;
    color: black;
    font-weight: 550;
  }
`;
