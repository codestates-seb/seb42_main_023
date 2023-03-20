import React from 'react';
import styled from 'styled-components';
import WeeklyPopular from './WeeklyPopular';
import CommunityPost from './CommunityPost';

function PostList() {
  return (
    <List>
      <WeeklyPopular />
      <CommunityPost />
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
