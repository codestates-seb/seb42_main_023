import React, { useEffect } from 'react';
import styled from 'styled-components';
import NextPageIcon from '../../assets/common/NextPageIcon';
import PrevPageIcon from '../../assets/common/PrevPageIcon';

interface Page {
  page: number;
  size: number;
  totalPage: number;
}

const Pagination = ({ page, size, totalPage }: Page) => {
  const limit = 5;

  useEffect(() => {
    // TODO:데이터를 불러오면 보여주는 페이지 개수에 따라서 자르기
    // setTotalPage(data.pageInfo.totalPages);
    // setOffset(num ? Math.floor((num - 1) / limit) * limit : 0);
    // setPageNumbers(
    // Array.from(Array(data.pageInfo.totalPages))
    // .map((el, idx) => idx + 1)
    // .slice(offset, offset + limit))
  });
  const pageNumbers = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <PaginationContainer>
      <ul className="pagination">
        <PrevPageIcon />
        {pageNumbers.map((number) => (
          <li
            key={number}
            // className={`page-item${number === activePage ? " active" : ""}`}
          >
            <Link
              href="#"
              className="page-link"
              //   onClick={(event) => handleClick(event, number)}
            >
              {number}
            </Link>
          </li>
        ))}
        <NextPageIcon />
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
const Link = styled.a`
  color: #7b7b7b;
  :hover {
    color: #adb0b6;
  }
`;
