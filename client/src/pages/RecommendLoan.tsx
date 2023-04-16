import React, { useEffect } from 'react';
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

  // 설문 중간에 다른 페이지로 이동시 다시 인트로 화면으로 돌아가게 한다.
  useEffect(() => {
    dispatch(setCurrentQuestion(null));
    window.scrollTo(0, 0);
  }, []);

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
    border-radius: 20px;
    width: 100%;
    height: 600px;
    padding: 50px 80px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const SurveyBox = styled.div`
  width: 100%;
  height: 95%;
  padding: 30px;
  background-color: #fff;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  border-radius: 20px;
  display: flex;
  justify-content: center;
`;
