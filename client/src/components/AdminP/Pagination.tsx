import React from 'react';
import styled from 'styled-components';
import NextPageIcon from '../../assets/common/NextPageIcon';
import PrevPageIcon from '../../assets/common/PrevPageIcon';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { setPageOffsetNext, setPageOffsetPrev } from '../../slices/reportSlice';
import { useGetReportsStandByQuery } from '../../api/reportApi';

const Pagination = () => {
  // Tools
  const { page, orderby, pageOffset } = useAppSelector(({ report }) => report);
  const dispatch = useAppDispatch();

  // Get report list based on 'page' and 'orderby'
  const { data, isLoading } = useGetReportsStandByQuery({
    page,
    orderby,
  });

  // Case handling
  if (isLoading) {
    return <div>Loading</div>;
  }
  if (!data?.reports) {
    return <div>No post yet!</div>;
  }

  // 뒤로가기 버튼(<)을 누르면 이전 페이지 5개가 보인다.
  const prevPageHandler = () => {
    if (pageOffset > 0) {
      dispatch(setPageOffsetPrev());
    }
  };

  // 앞으로가기 버튼(>)을 누르면 다름 페이지 5개가 보인다.
  const nextPageHandler = () => {
    if (pageOffset + 5 < data.pageInfo.totalPage) {
      dispatch(setPageOffsetNext());
    }
  };

  return (
    <PaginationContainer>
      <ul>
        <PrevPageIcon handler={prevPageHandler} />
        {Array.from({ length: data.pageInfo.totalPage }, (v, i) => i + 1) // 1부터 서버에서 제공한 total page까지 담긴 배열을 만든다. ex) 1 2 3 4 5 6 7
          .filter((el) => el > 0 + pageOffset && el <= 5 + pageOffset) // pageOffset은 0부터 시작하여, 5의 배수로 값을 가진다. pageOffset === 0 => 화면에 보여지는 페이지넘버 (1, 2, 3, 4, 5)
          .map((pageNum) => (
            <li key={pageNum}>
              <Link current={pageNum === data.pageInfo.page}>{pageNum}</Link>
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
