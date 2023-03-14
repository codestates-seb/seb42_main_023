import React from 'react';
import styled from 'styled-components';
import NavRealEstate from '../components/common/NavRealEstate';
// import { quesetionData, resultData } from '../../dummy/surveyData';
// import Intro from '../components/recommendLoan/Intro';
import Question from '../components/recommendLoan/Question';
import { useState } from 'react';

const RecommendLoan: React.FC = () => {
  // const [currentQuestion, setCurrentQuestion] = useState(null);
  // const nextQuestionHandler = (next: any) => {
  //   setCurrentQuestion(next);
  // };

  return (
    <MainContainer>
      <NavRealEstate />
      <div className="content-container">
        <SurveyBox>
          {/* <Intro setCurrentQuestion={setCurrentQuestion} /> */}
          <Question />
          {/* <Result /> */}
        </SurveyBox>
      </div>
    </MainContainer>
  );
};

export default RecommendLoan;

const MainContainer = styled.div`
  display: flex;
  > .content-container {
    border: 1px solid #d4d4d4;
    background-color: #f8f8f8;
    margin-left: 20px;
    width: calc(100% - 160px);
    height: 600px;
    padding: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const SurveyBox = styled.div`
  width: 80%;
  height: 95%;
  background-color: #fff;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  border-radius: 20px;
  display: flex;
  justify-content: center;
`;
