import React, { useState, useEffect, useCallback } from 'react';
import NavRealEstate from '../components/common/NavRealEstate';
import styled from 'styled-components';
import { AiFillHome } from 'react-icons/ai';
import { WhiteBtn } from '../components/common/Btn';
import { useGetHappyHouseQuery } from '../api/happyHouseApi';

const HappyHouse: React.FC = () => {
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('open');
  const [location, setLocation] = useState('all');

  const { data, isFetching, isLoading } = useGetHappyHouseQuery({
    page,
    status,
    location,
  });

  const houseList = data ?? [];

  const filterByStatusHandler = (status: string) => {
    if (status === 'open') {
      setStatus('open');
      console.log('open');
    } else if (status === 'recruit') {
      setStatus('recruit');
    } else if (status === 'closed') {
      setStatus('closed');
    }
  };

  return (
    <MainContainer>
      <NavRealEstate />
      <div className="content-container">
        <Title>
          <h1>행복주택공고</h1>
          <h2>
            <AiFillHome /> 행복주택이란?
          </h2>
          <p>
            청년(19세~39세)·신혼부부·대학생 등 젊은계층의 주거불안 해소를 위해
            국가 재정과 주택도시기금을 지원받아 <br /> 대중교통이 편리하고
            직주근접이 가능한 부지에 주변시세보다 저렴하게공급하는 공공임대주택
          </p>
        </Title>
        <div className="total-items">
          총 <strong>12752</strong> 건의 검색결과
        </div>
        <Filter>
          <div>
            <button
              className={status === 'open' ? 'current' : ''}
              onClick={() => filterByStatusHandler('open')}
            >
              공고중
            </button>
            <button
              className={status === 'recruit' ? 'current' : ''}
              onClick={() => filterByStatusHandler('recruit')}
            >
              접수중
            </button>
            <button
              className={status === 'closed' ? 'current' : ''}
              onClick={() => filterByStatusHandler('closed')}
            >
              접수완료
            </button>
          </div>
          <div>서울특별시</div>
        </Filter>
        <Table>
          <thead>
            <tr>
              <th>상태</th>
              <th>지역</th>
              <th>공고명</th>
              <th>상세보기</th>
              <th>공고게시일</th>
              <th>공고마감일</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>공고중</td>
              <td>세종특별자치시</td>
              <td>행복도시3-1M5블록 10년 공공임대주택리츠 </td>
              <td>
                <SeeDetailBtn>보기</SeeDetailBtn>
              </td>
              <td>2023.01.23</td>
              <td>2023.07.23</td>
            </tr>
          </tbody>
          {/* <tbody>
          {houseList.map(house, idx) => {
            <tr key={idx}>
              <td>공고중</td>
              <td>세종특별자치시</td>
              <td>행복도시3-1M5블록 10년 공공임대주택리츠 </td>
              <td>
                <SeeDetailBtn>보기</SeeDetailBtn>
              </td>
              <td>2023.01.23</td>
              <td>2023.07.23</td>
            </tr>
            }}
          </tbody> */}
        </Table>
      </div>
    </MainContainer>
  );
};

export default HappyHouse;

const MainContainer = styled.div`
  display: flex;
  > .content-container {
    border: 1px solid var(--border-color);
    margin-left: 20px;
    width: calc(100% - 160px);
    height: 100%;
    padding: 20px;
    > .total-items {
      font-size: 13px;
      > strong {
        color: var(--error-red-color);
      }
    }
  }
`;

// 행복주택 페이지 상단에 제목과 설명을 담는 컨테이너
const Title = styled.div`
  margin-bottom: 40px;
  > h1 {
    font-size: 23px;
    margin-bottom: 20px;
  }

  > h2 {
    font-size: 16px;
    font-weight: 700;
    margin-bottom: 6px;
  }
`;

const Filter = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid var(--border-color);
  margin-top: 10px;
  > div > button {
    width: 130px;
    height: 35px;
    border: 1px solid var(--border-color);
    background-color: #f9f6f6;
    cursor: pointer;
    &.current {
      background-color: var(--point-blue-color);
      color: #fff;
    }
  }
`;

// 공고 리스트
const Table = styled.table`
  width: 100%;
  > thead > tr > th {
    font-size: 15px;
    font-weight: 600;
    height: 30px;
    border-bottom: 1px solid var(--border-color);
  }

  > tbody > tr {
    text-align: center;
    height: 35px;
    > td {
      font-size: 14px;
    }
  }
`;

const SeeDetailBtn = styled(WhiteBtn)`
  width: 40px;
  height: 20px;
  font-size: 14px;
`;
