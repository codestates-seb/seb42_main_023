import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { AiFillHome } from 'react-icons/ai';
import { WhiteBtn } from '../components/common/Btn';
import { useGetHappyHouseQuery } from '../api/happyHouseApi';
import Pagination from '../components/common/Pagination';

// TODO: table 반응형으로 만들기
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

type NoticeState =
  | 'all'
  | 'open'
  | 'receiving'
  | 'close'
  | 'consult'
  | 'modified';

type Location =
  | 'seoul'
  | 'busan'
  | 'daegu'
  | 'incheon'
  | 'gwangju'
  | 'daejeon'
  | 'ulsan'
  | 'sejong'
  | 'jeju'
  | 'gangwondo'
  | 'gyeonggido'
  | 'chungcheongnamdo'
  | 'chungcheongbukdo'
  | 'jeollanamdo'
  | 'jeollabukdo'
  | 'gyengsangnamdo'
  | 'gyengsangbukdo';

const HappyHouse: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageOffset, setPageOffset] = useState<number>(0);
  const [state, setState] = useState<NoticeState>('all');
  const [location, setLocation] = useState<Location>('seoul');

  const { data, isSuccess } = useGetHappyHouseQuery({
    page: currentPage,
    state: state,
    location: location,
  });

  const filterByStateHandler = (state: NoticeState) => {
    setState(state);
  };

  const changeSelectHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLocation(event.target.value as Location);
  };

  return (
    <Container>
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
    </Container>
  );
};

export default HappyHouse;

const Container = styled.div`
  > .content-container {
    width: 100%;
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

const Filter = styled.div`
  display: flex;
  justify-content: space-between;
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
  }
`;

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

const SeeDetailBtn = styled(WhiteBtn)`
  width: 40px;
  height: 20px;
  font-size: 14px;
`;
