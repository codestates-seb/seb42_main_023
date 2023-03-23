import React from 'react';
import styled from 'styled-components';
import Profile from '../components/myPageP/Profile';
import MyPostList from '../components/myPageP/MyPostList';
import MyCommentList from '../components/myPageP/MyCommentList';
import MyBookmark from '../components/myPageP/MyBookmark';
import Sidebar from '../components/myPageP/Sidebar';
import { useAppSelector } from '../hooks';
import DeleteModal from '../components/myPageP/DeleteModal';

function MyPage() {
  const { filter, deleteAccountOpen } = useAppSelector(({ mypage }) => mypage);

  return (
    <MyPageWrap>
      {deleteAccountOpen && <DeleteModal />}
      <Profile />
      <Content>
        <Sidebar />
        {(filter === '작성한 글' || filter === '좋아요한 글') && <MyPostList />}
        {(filter === '작성한 댓글' || filter === '좋아요한 댓글') && (
          <MyCommentList />
        )}
        {filter === '북마크' && <MyBookmark />}
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
