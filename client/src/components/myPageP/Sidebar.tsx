import React from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setFilter } from '../../slices/mypageSlice';
import { SidebarBtn } from '../common/Btn';
import {
  membersApi,
  membersPostListApi,
  membersCommentsListApi,
  membersBookmarkListApi,
} from '../../api/memberapi';
import { setPostQuery, setCommentQuery } from '../../slices/headerSlice';

//TODO:필터별 get요청
function Sidebar() {
  const dispatch = useAppDispatch();
  const { filter } = useAppSelector(({ mypage }) => mypage);
  const { query, memberName } = useAppSelector(({ header }) => header);
  const membersQuery = membersApi.useGetPostListQuery({
    name: memberName,
  });
  const { data, isSuccess } = membersQuery;

  //작성한 글 요청핸들러
  const getMemberPost = () => {
    dispatch(setFilter('작성한 글'));
    dispatch(setPostQuery(memberName));
  };
  //작성한 댓글 요청핸들러
  const getMemberComments = () => {
    dispatch(setFilter('작성한 댓글'));
    const membersCommentsQuery = membersCommentsListApi.useGetPostListQuery({
      name: query,
    });
  };
  //작성한 좋아요한 글 요청핸들러
  const getMemberLikePost = () => {
    dispatch(setFilter('좋아요한 글'));
    dispatch(setPostQuery(`${memberName}/thumbup`));
  };
  //좋아요한 댓글 요청핸들러
  const getMemberLikeComments = () => {
    dispatch(setFilter('좋아요한 댓글'));
    const membersCommentsQuery = membersCommentsListApi.useGetPostListQuery({
      name: query,
    });
  };
  //북마크 요청핸들러
  const getMemberBookmark = () => {
    dispatch(setFilter('북마크'));
    const membersCommentsQuery = membersBookmarkListApi.useGetPostListQuery({
      name: query,
    });
  };

  return (
    <Nav>
      <FilterBtn current={filter === '작성한 글'} onClick={getMemberPost}>
        <span>작성한 글</span>
        {isSuccess && <div>{data.membersCount.postCount}</div>}
      </FilterBtn>
      <FilterBtn current={filter === '작성한 댓글'} onClick={getMemberComments}>
        <span>작성한 댓글</span>
        {isSuccess && <div>{data.membersCount.commentCount}</div>}
      </FilterBtn>
      <FilterBtn current={filter === '좋아요한 글'} onClick={getMemberLikePost}>
        <span>좋아요한 글</span>
        {isSuccess && <div>{data.membersCount.thumbupPostCount}</div>}
      </FilterBtn>
      <FilterBtn
        current={filter === '좋아요한 댓글'}
        onClick={getMemberLikeComments}
      >
        <span>좋아요한 댓글</span>
        {isSuccess && <div>{data.membersCount.thumbupCommentCount}</div>}
      </FilterBtn>
      <FilterBtn current={filter === '북마크'} onClick={getMemberBookmark}>
        <span>북마크</span>
        {isSuccess && <div>{data.membersCount.bookmarkCount}</div>}
      </FilterBtn>
    </Nav>
  );
}

export default Sidebar;
const Nav = styled.nav`
  box-sizing: border-box;
  width: 200px;
  padding: 8px;
  margin-right: 8px;
  border: 1px solid var(--border-color);
  display: inline;
`;
const FilterBtn = styled(SidebarBtn)<{ current: boolean }>`
  background-color: ${({ current }) => (current ? '#f5f4f4' : '####')};
  span {
    color: ${({ current }) => (current ? '#0069CA' : '#94969b')};
  }
`;
