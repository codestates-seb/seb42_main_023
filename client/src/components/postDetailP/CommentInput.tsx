import React, { useRef } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { commentsApi } from '../../api/commentApi';
import { CommentInputProps } from '../../types/PostDetail';
import { addCommentEdit, setComment } from '../../slices/commentSlice';
import { isOpened } from '../../slices/replySlice';
import { checkIsLogin } from '../../util/checkIsLogin';

const CommentInput: React.FC<CommentInputProps> = ({
  setCommentCnt,
  commentCnt,
}: CommentInputProps) => {
  const isLogin = checkIsLogin();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state);
  const commentRef = useRef<HTMLTextAreaElement>(null);
  const params = useParams();
  const postId = params.postId;
  const page = state.comment && state.comment.page;
  const commentQuery = commentsApi.useGetCommentQuery({ postId, page });
  const commetMutation = commentsApi.useSetCommentMutation();
  const [addComments] = commetMutation;
  const textarea = document.getElementById('comment') as HTMLTextAreaElement;
  const text = textarea?.value.replaceAll(/\n/g, '<br>');

  const addCommentHandler = () => {
    if (!isLogin) {
      navigate('/login');
      return;
    }
    const open = Array.from(
      {
        length: commentQuery.data?.comments?.length,
      },
      (el) => (el = false),
    );

    addComments({
      postId: postId,
      content: text,
    })
      .unwrap()
      .then(() => {
        dispatch(isOpened(open!));
        setCommentCnt(commentCnt + 1);
        dispatch(addCommentEdit(false));
        commentRef.current!.value = '';
        commentRef!.current!.style.height = '58px';
      });
  };
  const resizeHeightHandler = () => {
    commentRef!.current!.style.height = 'auto';
    commentRef!.current!.style.height = commentRef.current?.scrollHeight + 'px';
  };

  const valueCheck = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    dispatch(setComment(event.target.value));
  };
  const cancelHandler = () => {
    commentRef.current!.value = '';
    commentRef!.current!.style.height = '58px';
  };

  return (
    <CommentInputContainer>
      <h1>댓글 {commentCnt}개 </h1>{' '}
      <InputWrap>
        <textarea
          id="comment"
          placeholder="댓글을 남겨 주세요"
          ref={commentRef}
          onChange={valueCheck}
          onInput={resizeHeightHandler}
        ></textarea>
      </InputWrap>
      <ButtonContainer>
        <CancelCommentBtn onClick={cancelHandler}>취소</CancelCommentBtn>
        {!commentRef.current?.value ? (
          <AddCommentBtn
            className="noCommentContent"
            onClick={() => {
              if (!commentRef.current?.value) return;
              if (commentRef.current?.value === '삭제된 댓글입니다.') return;
              if (commentRef.current?.value === '신고된 댓글입니다.') return;
              addCommentHandler();
            }}
          >
            등록
          </AddCommentBtn>
        ) : (
          <AddCommentBtn
            className="isCommentContent"
            onClick={() => {
              if (!commentRef.current?.value) return;
              if (commentRef.current?.value === '삭제된 댓글입니다.') return;
              if (commentRef.current?.value === '신고된 댓글입니다.') return;
              addCommentHandler();
            }}
          >
            등록
          </AddCommentBtn>
        )}
      </ButtonContainer>
    </CommentInputContainer>
  );
};

export default CommentInput;

const CommentInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 720px;
  margin-top: 30px;
  h1 {
    font-size: 25px;
    font-weight: 400;
  }
`;

const InputWrap = styled.div`
  display: flex;
  textarea {
    box-sizing: border-box;
    width: 720px;
    height: auto;
    min-height: 58px;
    resize: none;
    border: 1px solid var(--border-color);
    padding: 10px;
    border-radius: 6px;
    margin: 0 0 0 3px;
    :focus {
      outline: 2px solid var(--point-blue-color);
    }
    ::placeholder {
      font-size: 14px;
    }
  }
`;
const ButtonContainer = styled.div`
  display: flex;
  width: 160px;
  margin: 15px 0 0 590px;
  .noCommentContent {
    cursor: default;
    background: var(--sub-font-color);
  }
  .isCommentContent {
    cursor: pointer;
    :hover {
      background-color: var(--hover-point-blue-color);
    }
  }
`;

const CancelCommentBtn = styled.button`
  width: 50px;
  height: 30px;
  padding: 0 10px 0 10px;
  margin: 0 15px 0 0;
  color: black;
  border-radius: 10px;
  background-color: var(--background-color);
  cursor: pointer;

  :hover {
    color: var(--background-color);
    background-color: var(--hover-font-gray-color);
  }
`;

const AddCommentBtn = styled.button`
  width: 50px;
  height: 30px;
  padding: 0 10px 0 10px;
  color: white;
  border-radius: 10px;
  background-color: var(--point-blue-color);
`;
