import React from 'react';
import styled from 'styled-components';
<<<<<<< HEAD
import { BlueBtn } from '../../components/common/Btn';
import { LogoSVG } from '../../assets/common/LogoSVG';
=======
import BlueBtn from '../common/BlueBtn';
>>>>>>> 6038065ce9f8ca42c1f373aae8d2621ff9d4483d

const Intro: React.FC = () => {
  return (
    <IntroContainer>
      <LogoSVG />
      <Question>
        <h2>
          <strong>1~2%대</strong> 금리로 제공받을 수 있는 <br />
          <strong>공공전월세 대출</strong>이 있다는 것 알고 계셨나요?
        </h2>
        <p>간단한 설문을 통해 나에게 맞는 공공대출 상품을 찾아보세요</p>
      </Question>
      <BlueBtn
        width="300px"
        height="50px"
        content="나에게 맞는 대출상품 찾기"
        onClick={() => {
          //   nextQuestionHandler(0);
        }}
      />
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
