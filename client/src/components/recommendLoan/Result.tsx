import React from 'react';
import styled from 'styled-components';
import { BlueBtn, WhiteBtn } from '../common/Btn';
import { resultData } from '../../data/surveyData';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setCurrentQuestion, setResultId } from '../../slices/surveySlice';
import { AiFillCheckCircle } from 'react-icons/ai';

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
      <AiFillCheckCircle fill="#0069CA" size="24" />
      <h1>{matchedResult!.content}</h1>
      <h2>{matchedResult!.subinfo}</h2>
      <div>
        <CheckoutBtn onClick={() => window.open(matchedResult!.link, '_blank')}>
          추천상품 자세히 알아보기
        </CheckoutBtn>
        <RetryBtn onClick={ResetSurvey}>다시 설문하기</RetryBtn>
      </div>
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
  > h1 {
    font-size: 20px;
    font-weight: 700;
    margin: 20px 0px 10px 0px;
  }

  > h2 {
    color: #94969b;
    margin-bottom: 20px;
  }

  > div {
    display: flex;
    flex-direction: column;
  }
`;

// 추천상품 자세히 알아보기 버튼
const CheckoutBtn = styled(WhiteBtn)`
  width: 250px;
  height: 50px;
  padding: 10px;
  margin: 5px;
`;

// 다시 설문하기 버튼
const RetryBtn = styled(BlueBtn)`
  width: 250px;
  height: 50px;
  padding: 10px;
  margin: 5px;
`;
