import React, { useEffect } from 'react';
import styled from 'styled-components';
import NextPageIcon from '../../assets/common/NextPageIcon';
import PrevPageIcon from '../../assets/common/PrevPageIcon';
import { useAppDispatch } from '../../hooks';

interface Page {
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}
interface Props {
  pageInfo: Page;
  pageOffset: number;
  setPageOffset: React.Dispatch<React.SetStateAction<number>>;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

//TODO: 전역 state로 현재 페이지 상태값 관리
const Pagination = ({
  pageInfo,
  pageOffset,
  setPageOffset,
  setCurrentPage,
}: Props) => {
  const dispatch = useAppDispatch();
  const prevPageHandler = () => {
    if (pageOffset > 0) {
      setPageOffset(pageOffset - 5);
    }
  };
  const nextPageHandler = () => {
    if (pageOffset + 5 < pageInfo.totalPages) {
      setPageOffset(pageOffset + 5);
    }
  };
  const pageButtonHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (e.target instanceof HTMLButtonElement) {
      const newPage = parseInt(e.target.value);
      setCurrentPage(newPage);
    }
  };
  //현재페이지 초기화
  useEffect(() => {
    return () => {
      setCurrentPage(1);
    };
  }, []);

  return (
    <PaginationContainer>
      <ul>
        <PrevPageIcon handler={prevPageHandler} />
        {Array.from({ length: pageInfo.totalPages }, (v, i) => i + 1)
          .filter((el) => el > 0 + pageOffset && el <= 5 + pageOffset)
          .map((number) => (
            <li key={number}>
              <Link
                current={number === pageInfo.page}
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