import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { AiFillHome } from 'react-icons/ai';
import { WhiteBtn } from '../components/common/Btn';
import { useGetHappyHouseQuery } from '../api/happyHouseApi';
import Pagination from '../components/common/Pagination';

interface House {
  houseId: number;
  inquiryDate: string;
  noticeState: string;
  location: string;
  noticeDetailKind: string;
  title: string;
  url: string;
  noticeStartDay: string;
  noticeEndDay: string;
  recruitDay: string;
}
const HappyHouse: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageOffset, setPageOffset] = useState(0);
  const [state, setState] = useState('all');
  const [location, setLocation] = useState('seoul');

  const { data, isSuccess } = useGetHappyHouseQuery({
    page: currentPage,
    state: state,
    location: location,
  });

  const filterByStateHandler = (state: string) => {
    if (state === 'all') {
      setState('all');
    } else if (state === 'open') {
      setState('open');
    } else if (state === 'receiving') {
      setState('receiving');
    } else if (state === 'close') {
      setState('close');
    } else if (state === 'consult') {
      setState('consult');
    } else if (state === 'modified') {
      setState('modified');
    }
  };

  const changeSelectHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLocation(event.target.value);
  };

  return (
    <MainContainer>
      <div className="content-container">
        <Head>
          <h1>청년들을 위한 임대 · 행복주택공고</h1>
          <p>공공기관이 공급하는 임대주택 모집공고를 검색하실 수 있습니다.</p>
        </Head>
        <Title>
          <div>
            <h2>
              <AiFillHome /> 행복주택이란?
            </h2>
            <p>
              청년(19세~39세)·신혼부부·대학생 등 젊은계층의 주거불안 해소를 위해
              국가 재정과 주택도시기금을 지원받아 <br /> 대중교통이 편리하고
              직주근접이 가능한 부지에 주변시세보다 저렴하게 공급하는
              공공임대주택입니다.
            </p>
          </div>
        </Title>
        {isSuccess && (
          <div className="total-items">
            총 <strong>{data.pageInfo.totalElements}</strong> 건의 검색결과
          </div>
        )}
        <Filter>
          <div className="state-filter">
            <button
              className={state === 'all' ? 'current' : ''}
              onClick={() => filterByStateHandler('all')}
            >
              전체
            </button>
            <button
              className={state === 'open' ? 'current' : ''}
              onClick={() => filterByStateHandler('open')}
            >
              공고중
            </button>
            <button
              className={state === 'receiving' ? 'current' : ''}
              onClick={() => filterByStateHandler('receiving')}
            >
              접수중
            </button>
            <button
              className={state === 'close' ? 'current' : ''}
              onClick={() => filterByStateHandler('close')}
            >
              접수마감
            </button>
            <button
              className={state === 'consult' ? 'current' : ''}
              onClick={() => filterByStateHandler('consult')}
            >
              상담요청
            </button>
            <button
              className={state === 'modified' ? 'current' : ''}
              onClick={() => filterByStateHandler('modified')}
            >
              정정공고중
            </button>
          </div>
          <div className="location-filter">
            <select id="report-target" onChange={changeSelectHandler}>
              <option value="seoul">서울특별시</option>
              <option value="busan">부산광역시</option>
              <option value="daegu">대구광역시</option>
              <option value="incheon">인천광역시</option>
              <option value="gwangju">광주광역시</option>
              <option value="daejeon">대전광역시</option>
              <option value="ulsan">울산광역시</option>
              <option value="sejong">세종특별자치시</option>
              <option value="jeju">제주특별자치도</option>
              <option value="gangwondo">강원도</option>
              <option value="gyeonggido">경기도</option>
              <option value="chungcheongnamdo">충청남도</option>
              <option value="chungcheongbukdo">충청북도</option>
              <option value="jeollanamdo">전라남도</option>
              <option value="jeollabukdo">전라북도</option>
              <option value="gyengsangnamdo">경상남도</option>
              <option value="gyengsangbukdo">경상북도</option>
            </select>
          </div>
        </Filter>
        <Table>
          <thead>
            <tr>
              <th>상태</th>
              <th>지역</th>
              <th>유형</th>
              <th>공고명</th>
              <th>상세보기</th>
              <th>공고게시일</th>
              <th>공고마감일</th>
            </tr>
          </thead>
          <tbody>
            {isSuccess &&
              data.houseList.map((house: House) => {
                return (
                  <tr key={house.houseId}>
                    <td className="state">{house.noticeState}</td>
                    <td className="location">{house.location}</td>
                    <td className="category">{house.noticeDetailKind}</td>
                    <td className="title">{house.title}</td>
                    <td className="see-detail">
                      <SeeDetailBtn onClick={() => window.open(house.url)}>
                        보기
                      </SeeDetailBtn>
                    </td>
                    <td className="start-date">
                      {house.noticeStartDay.slice(0, -9)}
                    </td>
                    <td className="end-date">
                      {house.noticeEndDay.slice(0, -9)}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
        {isSuccess && data.houseList.length > 0 && (
          <Pagination
            pageInfo={data.pageInfo}
            pageOffset={pageOffset}
            setPageOffset={setPageOffset}
            setCurrentPage={setCurrentPage}
          />
        )}
      </div>
    </MainContainer>
  );
};

export default HappyHouse;

const MainContainer = styled.div`
  > .content-container {
<<<<<<< HEAD
    width: 100%;
=======
    border: 1px solid #d4d4d4;
    margin-left: 20px;
    width: calc(100% - 160px);
>>>>>>> 6038065ce9f8ca42c1f373aae8d2621ff9d4483d
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
// 행복주택 페이지 상단에 제목 컨테이너
const Head = styled.div`
  h1 {
    font-size: 24px;
    margin-bottom: 4px;
  }
  p {
    font-size: 14px;
    margin-bottom: 40px;
  }
`;
// 행복주택 페이지 상단에 설명을 담는 컨테이너
const Title = styled.div`
  margin-bottom: 60px;
  background-color: var(--background-dark-color);
  padding: 20px;
  box-sizing: border-box;
  border-radius: 10px;
  > div {
    > h2 {
      font-size: 16px;
      font-weight: 500;
      margin-bottom: 8px;
    }
    > p {
      font-size: 14px;
      font-weight: 400;
    }
  }
`;

// 공고상태와 지역 필터링
const Filter = styled.div`
  display: flex;
  justify-content: space-between;
<<<<<<< HEAD
=======
  border-bottom: 1px solid #d4d4d4;
  > div > button {
    width: 130px;
    height: 35px;
    border: 1px solid #d4d4d4;
    background-color: aliceblue;
    cursor: pointer;
  }
`;

const HouseItem = styled.a`
  height: 50px;
  background-color: #f8f8f8;
  border-bottom: 1px solid #d4d4d4;
  display: flex;
>>>>>>> 6038065ce9f8ca42c1f373aae8d2621ff9d4483d
  align-items: center;
  margin-top: 10px;
  > .state-filter {
    button {
      width: max-content;
      padding: 0px 15px 0px 15px;
      height: 35px;
      border: 1px solid var(--border-color);
      background-color: #f4f4f4;
      margin-left: -1px;
      cursor: pointer;
      &.current {
        background-color: var(--point-blue-color);
        color: #fff;
      }
    }
  }

<<<<<<< HEAD
  > .location-filter {
    > select {
      border: 1px solid #d4d4d4;
      width: 130px;
      height: 28px;
      margin-bottom: 5px;
      border-radius: 3px;
      padding-left: 10px;
      &:focus {
        outline: none;
      }
    }
=======
  > .house-location {
    background-color: #0069ca;
    color: #fff;
    font-size: 12px;
    width: max-content;
    height: max-content;
    padding: 5px;
    border-radius: 7px;
    margin: 0px 10px;
>>>>>>> 6038065ce9f8ca42c1f373aae8d2621ff9d4483d
  }
`;

// 공고 리스트
const Table = styled.table`
  width: 100%;
  margin-top: -1px;
  border-collapse: collapse;
  border-top: 1px solid var(--border-color);
  > thead > tr > th {
    font-size: 15px;
    font-weight: 600;
    height: 30px;
    border-bottom: 1px solid var(--border-color);
  }

  > tbody > tr {
    text-align: center;
    height: 50px;
    border-bottom: 1px solid var(--border-color);
    &:hover {
      background-color: #f4f4f4;
    }
    > td {
      font-size: 14px;

      &.title {
        width: 550px;
      }
    }
  }
`;

// '보기'버튼
const SeeDetailBtn = styled(WhiteBtn)`
  width: 40px;
  height: 20px;
  font-size: 14px;
`;
