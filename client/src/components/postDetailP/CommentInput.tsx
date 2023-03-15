import React from 'react';
import styled from 'styled-components';
import { useAppSelector } from '../../hooks';
import { StateType, CommentType } from '../../types/PostDetail';

const CommentInput: React.FC = () => {
  const state = useAppSelector((state: StateType): StateType => {
    return state;
  });
  return (
    <CommentInputContainer>
      <h1>
        댓글{' '}
        {state.postSlice.comments! &&
          (state.postSlice.comments as CommentType).length}
        개{' '}
      </h1>
      <Input type="text" placeholder="댓글을 남겨 주세요"></Input>
      <AddCommentBtn>등록</AddCommentBtn>
    </CommentInputContainer>
  );
};

export default CommentInput;

const CommentInputContainer = styled.div`
  position: relative;
  width: 720px;
  height: 100px;
  margin-top: 30px;
  h1 {
    font-size: 24px;
    font-weight: 400;
  }
`;
const Input = styled.input`
  width: 720px;
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
  top: 55px;
  right: 15px;
  color: gray;
  cursor: pointer;
`;
