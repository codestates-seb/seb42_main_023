import React from 'react';
import styled from 'styled-components';
import BlueBtn from '../common/BlueBtn';
import { useState } from 'react';
import Q1 from './Q1';

const Intro = () => {
  const [resultCode, setResultCode] = useState<null | number>(0);

  return (
    <IntroContainer>
      <div>Logo</div>
      {resultCode === 0 ? (
        <>
          <Question>
            <h2>
              <strong>1~2%대</strong> 금리로 제공받을 수 있는 <br />
              <strong>공공전월세 대출</strong>이 있다는 것 알고 계셨나요?
            </h2>
            <p>간단한 설문을 통해 나에게 맞는 공공대출 상품을 찾아보세요</p>
          </Question>
          <Answer>
            <BlueBtn
              width="300px"
              height="50px"
              content="나에게 맞는 대출상품 찾기"
              onClick={() => setResultCode(1)}
            />
          </Answer>
        </>
      ) : (
        <Q1 />
      )}
    </IntroContainer>
  );
};

export default Intro;

const IntroContainer = styled.div`
  width: 65%;
  height: 75%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: aliceblue;
`;

const Question = styled.div`
  width: 100%;
  background-color: red;
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

const Answer = styled.div`
  background-color: green;
`;
