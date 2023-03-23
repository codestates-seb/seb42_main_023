import React, { useEffect } from 'react';
import styled from 'styled-components';
import NextPageIcon from '../../assets/common/NextPageIcon';
import PrevPageIcon from '../../assets/common/PrevPageIcon';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { setPageOffsetNext, setPageOffsetPrev } from '../../slices/mainSlice';
import { postListApi } from '../../api/postListapi';
import { setCurrentPage } from '../../slices/mainSlice';

const Pagination = () => {
  const { community, pageOffset, currentPage, orderby } = useAppSelector(
    ({ main }) => main,
  );
  const postListquery = postListApi.useGetPostListQuery({
    community: community,
    page: currentPage,
    orderby: orderby,
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
  const pageButtonHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (pageOffset + 5 < data.pageInfo.totalPage) {
      if (e.target instanceof HTMLButtonElement) {
        dispatch(setCurrentPage(e.target.value));
      }
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
                <Link
                  current={number === data.pageInfo.page}
                  value={number}
                  onClick={pageButtonHandler}
                >
                  {number}
                </Link>
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
