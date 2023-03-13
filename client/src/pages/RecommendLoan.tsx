import React from 'react';
import styled from 'styled-components';
import NavRealEstate from '../components/common/NavRealEstate';
import Intro from '../components/recommendLoan/Intro';

const RecommendLoan: React.FC = () => {
  return (
    <MainContainer>
      <NavRealEstate />
      <div>
        <SurveyBox>
          <Intro />
        </SurveyBox>
      </div>
    </MainContainer>
  );
};

export default RecommendLoan;

const MainContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  > div {
    width: 850px;
    height: 80%;
    min-height: 500px;
    margin-left: 40px;
    background-color: #f8f8f8;
    border: 1px solid #d4d4d4;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const SurveyBox = styled.div`
  width: 80%;
  height: 90%;
  background-color: #fff;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
