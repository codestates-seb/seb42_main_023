import React from 'react';
import styled from 'styled-components';

const Question: React.FC = () => {
  return (
    <QuestionContainer>
      <h1>고객님은 만 19세 이상 34세 이하의 청년이십니까?</h1>
      <div>
        <AnswerBtn>네</AnswerBtn>
        <AnswerBtn>아니요</AnswerBtn>
      </div>
    </QuestionContainer>
  );
};

export default Question;

const QuestionContainer = styled.div`
  width: 70%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  > h1 {
    font-size: 18px;
  }
  > div {
    display: flex;
    justify-content: center;
    margin-top: 50px;
    width: 80%;
  }
`;

const AnswerBtn = styled.button`
  width: max-content;
  min-width: 100px;
  height: max-content;
  min-height: 30px;
  padding: 8px 14px;
  border-radius: 3px;
  margin-right: 12px;
  cursor: pointer;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  background-color: #0069ca;
  color: #fff;
  &:hover {
    opacity: 0.8;
  }
`;
