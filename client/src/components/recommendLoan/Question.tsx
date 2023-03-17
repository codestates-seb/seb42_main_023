import React from 'react';
import styled from 'styled-components';

interface questionData {
  id: number;
  question: string;
  answers: {
    content: string;
    next: number | null;
    resultId?: number | undefined;
  }[];
}

interface Props {
  currentQuestion: questionData;
  nextQuestionHandler: (next: number | null) => void;
}

const Question: React.FC<Props> = ({
  currentQuestion,
  nextQuestionHandler,
}) => {
  return (
    <QuestionContainer>
      <h1>{currentQuestion.question}</h1>
      <div>
        {currentQuestion.answers.map((answer, idx) => (
          <AnswerBtn key={idx} onClick={() => nextQuestionHandler(answer.next)}>
            {answer.content}
          </AnswerBtn>
        ))}
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
