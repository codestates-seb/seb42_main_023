import React from 'react';
import styled from 'styled-components';
import { BlueBtn } from '../common/Btn';
import { resultData } from '../../data/surveyData';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setCurrentQuestion, setResultId } from '../../slices/surveySlice';

const Result: React.FC = () => {
  const dispatch = useAppDispatch();
  const resultId = useAppSelector((state) => state.survey.resultId);
  const matchedResult = resultData.find((item) => item.id === resultId);

  // "다시 설문하기": 결과화면에서 인트로 화면으로 다시 가기
  const ResetSurvey = () => {
    dispatch(setCurrentQuestion(null));
    dispatch(setResultId(null));
  };

  return (
    <ResultContainer>
      <div>{matchedResult!.content}</div>
      <div className="more-info">
        <a href={matchedResult!.link}>자세히 알아보기</a>
        <a href="https://menhuf.molit.go.kr/">대출신청 바로가기</a>
      </div>
      <RetryBtn onClick={ResetSurvey}>다시 설문하기</RetryBtn>
    </ResultContainer>
  );
};

export default Result;

const ResultContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  > .more-info {
    display: flex;
    margin: 30px 0px;
    > a {
      background-color: var(--hover-point-blue-color);
      color: #fff;
      width: max-content;
      height: max-content;
      padding: 10px;
      margin-right: 30px;
      border-radius: 5px;
    }
  }
`;

const RetryBtn = styled(BlueBtn)`
  width: 250px;
  height: 50px;
`;
