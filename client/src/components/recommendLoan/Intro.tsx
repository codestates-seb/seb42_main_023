import React from 'react';
import styled from 'styled-components';
import BlueBtn from '../common/BlueBtn';

const Intro = () => {
  return (
    <IntroContainer>
      <div>Logo</div>
      <IntroContent>
        <h2>
          <strong>1~2%대</strong> 금리로 제공받을 수 있는 <br />
          <strong>공공전월세 대출</strong>이 있다는 것 알고 계셨나요?
        </h2>
        <p>간단한 설문을 통해 나에게 맞는 공공대출 상품을 찾아보세요</p>
      </IntroContent>
      <BlueBtn
        width="300px"
        height="50px"
        content="나에게 맞는 대출상품 찾기"
        onClick={() => console.log('clicked!hi!')}
      />
    </IntroContainer>
  );
};

export default Intro;

const IntroContainer = styled.div`
  width: 60%;
  height: 70%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const IntroContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
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
