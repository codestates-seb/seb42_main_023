import React, { useRef } from 'react';
import styled from 'styled-components';
import { repliesApi } from '../../api/replyApi';
import { useAppDispatch } from '../../hooks';
import { setCommentId } from '../../slices/commentSlice';
import { addReplyEdit, setReply } from '../../slices/replySlice';
import { CommentProps } from '../../types/PostDetail';

const ReplyInput: React.FC<CommentProps> = ({ commentInfo }: CommentProps) => {
  const replyRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const commentId = commentInfo.commentId;

  const mutation = repliesApi.useSetReplyMutation();
  const setReplys = mutation[0];

  // 답글 추가
  const addReplyHandler = async () => {
    console.log('commentId', commentId);
    console.log('value', replyRef.current!.value);
    await setReplys({
      commentId: commentId,
      content: replyRef.current!.value,
    });
    dispatch(addReplyEdit(false));
    replyRef.current!.value = '';
  };

  const valueCheck = (event: React.ChangeEvent<HTMLInputElement>): void => {
    dispatch(setReply(event.target.value));
  };

  const enterHandler = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (!replyRef.current!.value) return;

    if (event.key === 'Enter' && event.nativeEvent.isComposing === false) {
      dispatch(setCommentId(commentInfo.commentId));
      addReplyHandler();
    }
  };
  return (
    <ReplyInputContainer>
      <Input
        type="text"
        placeholder="답글을 남겨 주세요"
        ref={replyRef}
        onChange={valueCheck}
        onKeyDown={enterHandler}
      ></Input>
      <AddCommentBtn
        onClick={(event) => {
          dispatch(setCommentId(commentInfo.commentId));
          if (!replyRef.current!.value) return;
          addReplyHandler();
        }}
      >
        등록
      </AddCommentBtn>
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
