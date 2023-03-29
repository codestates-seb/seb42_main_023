import React from 'react';
import styled from 'styled-components';
import { BlueBtn } from '../common/Btn';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setIsChecked, setNext } from '../../slices/surveySlice';

interface Props {
  nextQuestionHandler: (next: number) => void;
  showResultHandler: (result: string) => void;
}

const Question: React.FC<Props> = ({
  nextQuestionHandler,
  showResultHandler,
}) => {
  const dispatch = useAppDispatch();

  const currentQuestion = useAppSelector(
    (state) => state.survey.currentQuestion,
  );

  const { isChecked, next } = useAppSelector((state) => state.survey);

  const selectRadioHandler = (val: string | number) => {
    dispatch(setIsChecked(true));
    dispatch(setNext(val));
  };

  const moveOnToNextHanlder = () => {
    if (typeof next === 'number') {
      nextQuestionHandler(next);
    } else if (typeof next === 'string') {
      showResultHandler(next);
    }
    dispatch(setIsChecked(false));
  };

  return (
    <QuestionContainer>
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
  justify-content: center;
  align-items: center;

  > .question-content {
    height: 70%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
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
  }
`;

const NextBtn = styled(BlueBtn)`
  width: 250px;
  height: 50px;
  opacity: 0;
  animation-name: slow-mount-animation;
  animation-duration: 1.5s;
  animation-fill-mode: forwards;
  @keyframes slow-mount-animation {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;
