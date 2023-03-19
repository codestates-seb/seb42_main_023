import React from 'react';
import styled from 'styled-components';
import { resultData } from '../../data/surveyData';

interface Props {
  result: string;
}

const Result: React.FC<Props> = ({ result }) => {
  const matchedResult = resultData.find((item) => item.id === result);

  return (
    <ResultContainer>
      <div>{matchedResult!.content}</div>
      <div className="more-info">
        <a href={matchedResult!.link}>자세히 알아보기</a>
        <a href="https://menhuf.molit.go.kr/">대출신청 바로가기</a>
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
  > .more-info {
    display: flex;
    margin-top: 30px;
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
