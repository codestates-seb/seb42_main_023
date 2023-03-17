import React from 'react';
import styled from 'styled-components';

const SetNickname: React.FC = () => {
  return (
    <>
      <NicknameFormMain>
        <NicknameForm>
          <div>Logo</div>
          <NicknameInput>
            <label htmlFor="nickname">닉네임</label>
            <input
              name="nickname"
              placeholder="커뮤니티에서 사용할 닉네임을 작성해주세요"
            />
            <p>이미 사용중인 닉네임입니다</p>
          </NicknameInput>
          <SignupBtn>가입하기</SignupBtn>
        </NicknameForm>
      </NicknameFormMain>
    </>
  );
};

export default SetNickname;

// 메인 전체
const NicknameFormMain = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// 로그인 폼
const NicknameForm = styled.div`
  width: 503px;
  height: 426px;
  margin: auto;
  background-color: #fcfcfc;
  border: 2px solid #f4f4f4;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

const NicknameInput = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  > input {
    width: 100%;
    height: 50px;
    margin: 8px 0px;
    padding-left: 4px;
    border: 1px solid #d4d4d4;
    border-radius: 3px;
    color: #7b7b7b;
  }
  > p {
    color: #ca0000;
    font-size: 12px;
  }
`;

// 버튼 컴포넌트 가져오면 지우기
const SignupBtn = styled.button`
  background-color: #0069ca;
  color: #fff;
  font-weight: 700;
  width: 305px;
  height: 54px;
  cursor: pointer;
`;
