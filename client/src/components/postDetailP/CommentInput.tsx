import React, { useRef } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { commentsApi } from '../../api/commentApi';
import { postsApi } from '../../api/postApi';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { addCommentEdit, setComment } from '../../slices/commentSlice';

const CommentInput: React.FC = () => {
  const commentRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => {
    return state;
  });
  const params = useParams();
  const postId = params.postId;
  const postQuery = postsApi.useGetPostQuery({ postId });
  const { refetch } = postQuery;

  // 댓글 추가 mutation
  const commetMutation = commentsApi.useSetCommentMutation();
  const [setComments] = commetMutation;

  // 댓글 추가
  const addCommentHandler = async () => {
    await setComments({
      postId: postId,
      content: commentRef.current?.value,
    });
    dispatch(addCommentEdit(false));
    refetch();
    commentRef.current!.value = '';
  };

  const valueCheck = (event: React.ChangeEvent<HTMLInputElement>): void => {
    dispatch(setComment(event.target.value));
  };

  const enterHandler = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (!commentRef.current?.value) return;
    if (event.key === 'Enter' && event.nativeEvent.isComposing === false) {
      addCommentHandler();
    }
  };

  return (
    <CommentInputContainer>
      <h1>댓글 {postQuery.data?.commentCount}개 </h1>
      <Input
        type="text"
        placeholder="댓글을 남겨 주세요"
        ref={commentRef}
        onChange={valueCheck}
        onKeyDown={enterHandler}
      ></Input>
      <AddCommentBtn
        onClick={() => {
          if (!commentRef.current?.value) return;
          addCommentHandler();
        }}
      >
        등록
      </AddCommentBtn>
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
