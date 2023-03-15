import React from 'react';
import styled from 'styled-components';
import NavRealEstate from '../components/common/NavRealEstate';
// import { questionData } from '../data/surveyData';
// import Intro from '../components/recommendLoan/Intro';
// import Question from '../components/recommendLoan/Question';
// import { useState } from 'react';

// interface questionData {
//     id: number;
//     question: string;
//     answer: ({
//         content: string;
//         next: number;
//         resultId?: undefined;
//     } | {
//         content: string;
//         resultId: number;
//         next?: undefined;
//     })[];
// }

const RecommendLoan: React.FC = () => {
  //   const [currentQuestion, setCurrentQuestion] = useState(null);
  const nextQuestionHandler = (next: number) => {
    // if (next === next) {
    //   setCurrentQuestion(questionData[next]);
    // } else if () {
    //   next === resultId
    //   move to result page.
    // }
    // }
  };

  return (
    <MainContainer>
      <NavRealEstate />
      <div className="content-container">
        <SurveyBox>
          {/* {currentQuestion! ? (
            <Intro nextQuestionHandler={nextQuestionHandler} />
          ) : (
            <Question />
          )} */}

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
