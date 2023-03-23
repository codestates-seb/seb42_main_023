import React from 'react';
import styled from 'styled-components';
import { BlueBtn } from '../../components/common/Btn';

interface Props {
  nextQuestionHandler: (next: number) => void;
}

const Intro: React.FC<Props> = ({ nextQuestionHandler }) => {
  return (
    <IntroContainer>
      <div>Logo</div>
      <Question>
        <h2>
          <strong>1~2%대</strong> 금리로 제공받을 수 있는 <br />
          <strong>청년 대상 공공전월세 대출상품</strong>이 있다는 것 알고
          계셨나요?
        </h2>
        <p>간단한 설문을 통해 나에게 맞는 공공대출 상품을 찾아보세요!</p>
      </Question>
      <FindBtn
        onClick={() => {
          nextQuestionHandler(0);
        }}
      >
        나에게 맞는 대출상품 찾기
      </FindBtn>
    </IntroContainer>
  );
};

export default Intro;

const IntroContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Question = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 50px 0px;
  > h2 {
    text-align: center;
    > strong {
      font-weight: 700;
    }
  }
  > p {
    color: #5c5c5c;
    margin-top: 30px;
  }
`;
const FindBtn = styled(BlueBtn)`
  width: 300px;
  height: 50px;
`;
