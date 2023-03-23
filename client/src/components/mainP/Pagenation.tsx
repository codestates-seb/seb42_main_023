import React, { useEffect } from 'react';
import styled from 'styled-components';
import NextPageIcon from '../../assets/common/NextPageIcon';
import PrevPageIcon from '../../assets/common/PrevPageIcon';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { setPageOffsetNext, setPageOffsetPrev } from '../../slices/mainSlice';
import { postListApi } from '../../api/postListapi';

const Pagination = () => {
  const { community, pageOffset } = useAppSelector(({ main }) => main);
  //TODO: API쿼리에 맞게 수정하기
  const postListquery = postListApi.useGetPostListQuery({
    endpoint: community,
  });
  const { data, isSuccess } = postListquery;
  const dispatch = useAppDispatch();

  const prevPageHandler = () => {
    if (pageOffset > 0) {
      dispatch(setPageOffsetPrev());
    }
  };
  const nextPageHandler = () => {
    if (pageOffset + 5 < data.pageInfo.totalPage) {
      dispatch(setPageOffsetNext());
    }
  };
  return (
    <PaginationContainer>
      <ul>
        <PrevPageIcon handler={prevPageHandler} />
        {isSuccess &&
          Array.from({ length: data.pageInfo.totalPage }, (v, i) => i + 1)
            .filter((el) => el > 0 + pageOffset && el <= 5 + pageOffset)
            .map((number) => (
              <li key={number}>
                <Link current={number === data.pageInfo.page}>{number}</Link>
              </li>
            ))}
        <NextPageIcon handler={nextPageHandler} />
      </ul>
    </PaginationContainer>
  );
};

export default Pagination;

const PaginationContainer = styled.nav`
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 20px 0;
  ul {
    display: flex;
    min-width: 500px;
    justify-content: space-evenly;
  }
`;
const Link = styled.button<{ current: boolean }>`
  color: ${({ current }) => (current ? '#0069CA' : '#94969b')};
  :hover {
    color: ${({ current }) => (current ? '#0069CA' : '#5C5C5C')};
  }
`;
