import React, { useEffect } from 'react';
import styled from 'styled-components';

const Question: React.FC = () => {
  return (
    <QuestionContainer>
<<<<<<< HEAD
      <div className="question-content">
        <h1>{currentQuestion!.question}</h1>
        <h2>{currentQuestion!.subinfo}</h2>
        {currentQuestion!.answers.map((answer) => (
          <div key={answer.id}>
            <input
              type="radio"
              id={answer.content}
              name="answer"
              value={answer.content}
              onChange={() =>
                selectRadioHandler(
                  'next' in answer ? answer.next : answer.result,
                )
              }
            />
            <label htmlFor={answer.content}>{answer.content}</label>
          </div>
        ))}
      </div>
      <div className="button">
        {isChecked && <NextBtn onClick={moveOnToNextHanlder}>Next</NextBtn>}
=======
      <h1>고객님은 만 19세 이상 34세 이하의 청년이십니까?</h1>
      <div>
        <AnswerBtn>네</AnswerBtn>
        <AnswerBtn>아니요</AnswerBtn>
>>>>>>> 6038065ce9f8ca42c1f373aae8d2621ff9d4483d
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
<<<<<<< HEAD
    > h1 {
      font-size: 20px;
      font-weight: 700;
      margin-bottom: 10px;
    }
    > h2 {
      color: #94969b;
      margin-bottom: 20px;
    }
    > div {
      /* Hide the default radio button */
      > input[type='radio'] {
        display: none;
      }

      /* Style the radio button label */
      > label {
        display: inline-block;
        margin-bottom: 10px;
        cursor: pointer;
      }

      /* Style the radio button icon */
      > label::before {
        content: '';
        display: inline-block;
        width: 20px;
        height: 20px;
        border: 2px solid #ccc;
        border-radius: 50%;
        margin-right: 5px;
        vertical-align: middle;
      }

      /* Style the radio button icon when it's checked */
      > input[type='radio']:checked + label::before {
        background-color: var(--point-blue-color);
      }
    }
  }

  > .button {
    height: 30%;
=======
    margin-top: 50px;
    width: 80%;
>>>>>>> 6038065ce9f8ca42c1f373aae8d2621ff9d4483d
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
