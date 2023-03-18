import React from 'react';
import styled from 'styled-components';

const ReplyInput: React.FC = () => {
  return (
    <ReplyInputContainer>
      <Input type="text" placeholder="답글을 남겨 주세요"></Input>
      <AddCommentBtn>등록</AddCommentBtn>
    </ReplyInputContainer>
  );
};

export default ReplyInput;

const ReplyInputContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  position: relative;
  width: 720px;
  height: auto;
  margin-top: 20px;
  h1 {
    font-size: 24px;
    font-weight: 400;
  }
`;
const Input = styled.input`
  width: 670px;
  height: 50px;
  border: 1px solid #d4d4d4;
  padding: 0 10px 0 10px;
`;

const AddCommentBtn = styled.button`
  width: 50px;
  height: 30px;
  padding: 0 10px 0 10px;
  background-color: white;
  position: absolute;
  top: 10px;
  right: 15px;
  color: gray;
  cursor: pointer;
`;
