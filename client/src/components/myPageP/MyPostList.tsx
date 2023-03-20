import React from 'react';
import styled from 'styled-components';
import PostList from '../mainP/PostList';
function MyPostList() {
  return (
    <PostWrap>
      <PostList />
    </PostWrap>
  );
}

export default MyPostList;
const PostWrap = styled.div`
  border: 1px solid var(--border-color);
  width: 100%;
  overflow: auto;
`;
