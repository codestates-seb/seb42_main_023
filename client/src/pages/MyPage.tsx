import React from 'react';
import styled from 'styled-components';
import Profile from '../components/myPageP/Profile';
import Comment from '../components/myPageP/Comment';
import MyPostList from '../components/myPageP/MyPostList';
import Sidebar from '../components/myPageP/Sidebar';

function MyPage() {
  return (
    <MyPageWrap>
      <Profile />
      <Content>
        <Sidebar />
        <MyPostList />
      </Content>
    </MyPageWrap>
  );
}

export default MyPage;
const MyPageWrap = styled.div`
  display: flex;
  flex-direction: column;
`;
const Content = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
`;
