import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setFilter } from '../../slices/mypageSlice';
import { SidebarBtn } from '../common/Btn';

interface MemberCount {
  postCount: number;
  commentCount: number;
  thumbupPostCount: number;
  thumbupCommentCount: number;
  bookmarkCount: number;
}
function Sidebar({ membersCount }: { membersCount: MemberCount }) {
  const dispatch = useAppDispatch();
  const { filter } = useAppSelector(({ mypage }) => mypage);

  useEffect(() => {
    return () => {
      dispatch(setFilter('작성한 글'));
    };
  }, []);

  return (
    <Nav>
      <FilterBtn
        current={filter === '작성한 글'}
        onClick={() => dispatch(setFilter('작성한 글'))}
      >
        <span>작성한 글</span>
        <div>{membersCount.postCount}</div>
      </FilterBtn>
      <FilterBtn
        current={filter === '작성한 댓글'}
        onClick={() => dispatch(setFilter('작성한 댓글'))}
      >
        <span>작성한 댓글</span>
        <div>{membersCount.commentCount}</div>
      </FilterBtn>
      <FilterBtn
        current={filter === '좋아요한 글'}
        onClick={() => dispatch(setFilter('좋아요한 글'))}
      >
        <span>좋아요한 글</span>
        <div>{membersCount.thumbupPostCount}</div>
      </FilterBtn>
      <FilterBtn
        current={filter === '좋아요한 댓글'}
        onClick={() => dispatch(setFilter('좋아요한 댓글'))}
      >
        <span>좋아요한 댓글</span>
        <div>{membersCount.thumbupCommentCount}</div>
      </FilterBtn>
      <FilterBtn
        current={filter === '북마크'}
        onClick={() => dispatch(setFilter('북마크'))}
      >
        <span>북마크</span>
        <div>{membersCount.bookmarkCount}</div>
      </FilterBtn>
    </Nav>
  );
}

export default Sidebar;
const Nav = styled.nav`
  box-sizing: border-box;
  flex-basis: 200px;
  height: 100%;
  padding: 8px;
  margin-top: -1px;
  border: 1px solid var(--border-color);
  display: inline;
`;
const FilterBtn = styled(SidebarBtn)<{ current: boolean }>`
  background-color: ${({ current }) => (current ? '#f5f4f4' : '####')};
  span {
    color: ${({ current }) => (current ? '#0069CA' : '#94969b')};
  }
`;
