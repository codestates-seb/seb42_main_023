import React from 'react';
import styled from 'styled-components';
import { BsDot } from 'react-icons/bs';
import { useAppSelector } from '../../hooks';
import ReactHtmlParser from 'react-html-parser';
import { Link } from 'react-router-dom';
import { StateType, PostType } from '../../types/PostDetail';

const RecommendedPost: React.FC = () => {
  const state = useAppSelector((state: StateType): StateType => {
    return state;
  });
  return (
    <RecommendedPostContainer>
      <ul>
        {state.postSlice.reommendPosts! &&
          (state.postSlice.reommendPosts as object[]).map(
            (post: Partial<PostType>) => {
              const url = `/posts/${post.postId}`;
              return (
                <li key={post.postId}>
                  <p>
                    <BsDot></BsDot>
                    <Link to={url}>{ReactHtmlParser(post.title!)}</Link>
                  </p>
                </li>
              );
            },
          )}
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
