import React from 'react';
import NavRealEstate from '../components/common/NavRealEstate';
import styled from 'styled-components';
import { AiFillHome } from 'react-icons/ai';

const HappyHouse: React.FC = () => {
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
        <Filter>
          <div>
            <button>공고중</button>
            <button>접수중</button>
            <button>접수완료</button>
          </div>
          <div>서울특별시</div>
        </Filter>
        <div>
          <HouseItem href="google.com">
            <span className="house-location">서울특별시</span>
            <span className="house-name">
              행복도시 3-1M5 블록 10년 공공임대주택리츠
            </span>
          </HouseItem>
        </div>
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
  > div > button {
    width: 130px;
    height: 35px;
    border: 1px solid var(--border-color);
    background-color: aliceblue;
    cursor: pointer;
  }
`;

const HouseItem = styled.a`
  height: 50px;
  background-color: var(--background-color);
  border-bottom: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  color: black;
  cursor: pointer;

  > .house-location {
    background-color: var(--point-blue-color);
    color: #fff;
    font-size: 12px;
    width: max-content;
    height: max-content;
    padding: 5px;
    border-radius: 7px;
    margin: 0px 10px;
  }
`;
