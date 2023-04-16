import React, { useEffect } from 'react';
import styled from 'styled-components';
import Profile from '../components/myPageP/Profile';
import MyPostList from '../components/myPageP/MyPostList';
import MyLikePostList from '../components/myPageP/MyLikePostList';
import MyBookmarks from '../components/myPageP/MyBookmarks';
import MyCommentList from '../components/myPageP/MyCommentList';
import MylikeCommentList from '../components/myPageP/MylikeCommentList';
import Sidebar from '../components/myPageP/Sidebar';
import { useAppSelector } from '../hooks';
import DeleteModal from '../components/myPageP/DeleteModal';
import { membersApi } from '../api/membersApi';

function MyPage() {
  const { filter, deleteAccountOpen } = useAppSelector(({ mypage }) => mypage);
  const { memberName } = useAppSelector(({ header }) => header);
  const membersQuery = membersApi.useGetMemberQuery(
    {
      name: memberName,
    },
    {
      skip: !memberName,
    },
  );
  const { data, isSuccess, refetch } = membersQuery;
  useEffect(() => {
    window.scrollTo(0, 0);
    // refetch();
  }, []);
  return (
    <MyPageWrap>
      {deleteAccountOpen && (
        <ModalWrap>
          <DeleteModal />
        </ModalWrap>
      )}

      {isSuccess && <Profile member={data.member} />}
      <Content>
        {isSuccess && <Sidebar membersCount={data.membersCount} />}
        {filter === '작성한 글' && <MyPostList />}
        {filter === '작성한 댓글' && <MyCommentList />}
        {filter === '좋아요한 글' && <MyLikePostList />}
        {filter === '좋아요한 댓글' && <MylikeCommentList />}
        {filter === '북마크' && <MyBookmarks />}
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
  flex-basis: 900px;
  width: 100%;
  height: 1040px;
`;
const ModalWrap = styled.div`
  width: 100vw;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  display: flex;
  align-items: center;
  justify-content: center;

  h1 {
    padding-bottom: 4px;
    margin-bottom: 10px;
    border-bottom: 1px solid var(--border-color);
    font-weight: 600;
  }
  div {
    :first-child {
      margin-bottom: 20px;
    }
  }
`;
