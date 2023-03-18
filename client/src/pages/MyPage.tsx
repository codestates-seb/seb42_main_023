import React from 'react';
import styled from 'styled-components';
import Profile from '../components/myPageP/Profile';
import Post from '../components/myPageP/MyPostList';
import Comment from '../components/myPageP/Comment';
import Sidebar from '../components/myPageP/Sidebar';
//TODO: remove cookies when logging out.
// cookies.remove('accessToken')
// cookies.remove('refreshToken')

function MyPage() {
  return (
    <MyPageWrap>
      <Profile />
      <Content>
        <Sidebar />
        <Post />
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
