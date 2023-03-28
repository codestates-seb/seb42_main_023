import React from 'react';
import styled from 'styled-components';
import Intro from '../components/recommendLoan/Intro';
import Question from '../components/recommendLoan/Question';
import Result from '../components/recommendLoan/Result';
import { questionData } from '../data/surveyData';
import { useAppDispatch, useAppSelector } from '../hooks';
import { setCurrentQuestion, setResultId } from '../slices/surveySlice';

const RecommendLoan: React.FC = () => {
  const dispatch = useAppDispatch();
  const { currentQuestion, resultId } = useAppSelector((state) => state.survey);

  const nextQuestionHandler = (next: number) => {
    dispatch(setCurrentQuestion(questionData[next]));
  };

  const showResultHandler = (result: string) => {
    dispatch(setCurrentQuestion(null));
    dispatch(setResultId(result));
  };

  return (
    <MainContainer>
      <div className="content-container">
        <SurveyBox>
          {!currentQuestion && !resultId && (
            <Intro nextQuestionHandler={nextQuestionHandler} />
          )}

          {currentQuestion && (
            <Question
              nextQuestionHandler={nextQuestionHandler}
              showResultHandler={showResultHandler}
            />
          )}

          {resultId && <Result />}
        </SurveyBox>
      </div>
    </MainContainer>
  );
};

export default RecommendLoan;

export const MainContainer = styled.div`
  display: flex;
  > .content-container {
    border: 1px solid #d4d4d4;
    background-color: #f8f8f8;
    width: 100%;
    height: 600px;
    padding: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const SurveyBox = styled.div`
  width: 80%;
  height: 95%;
  background-color: #fff;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  border-radius: 20px;
  display: flex;
  justify-content: center;
`;
