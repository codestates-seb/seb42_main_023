import React, { useRef } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { commentsApi } from '../../api/commentApi';
import { useAppDispatch } from '../../hooks';
import { addCommentEdit, setComment } from '../../slices/commentSlice';
import { CommentInputProps } from '../../types/PostDetail';

const CommentInput: React.FC<CommentInputProps> = ({
  setCommentCnt,
  commentCnt,
}: CommentInputProps) => {
  const dispatch = useAppDispatch();
  const commentRef = useRef<HTMLTextAreaElement>(null);
  const params = useParams();
  const postId = params.postId;

  // 댓글 추가 mutation
  const commetMutation = commentsApi.useSetCommentMutation();
  const [addComments] = commetMutation;
  const textarea = document.getElementById('comment') as HTMLTextAreaElement;
  const text = textarea?.value.replaceAll(/\n/g, '<br>');
  // 댓글 추가
  const addCommentHandler = () => {
    addComments({
      postId: postId,
      content: text,
    })
      .unwrap()
      .then(() => {
        setCommentCnt(commentCnt + 1);
        dispatch(addCommentEdit(false));
        commentRef.current!.value = '';
        commentRef!.current!.style.height = '58px';
      });
  };

  // textarea 높이 조절
  const handleResizeHeight = () => {
    commentRef!.current!.style.height = 'auto';
    commentRef!.current!.style.height = commentRef.current?.scrollHeight + 'px';
  };

  // Textarea 값 확인
  const valueCheck = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    dispatch(setComment(event.target.value));
  };
  // 댓글 입력 취소
  const cancelHandler = () => {
    commentRef.current!.value = '';
    commentRef!.current!.style.height = '58px';
  };

  return (
    <CommentInputContainer>
      <h1>댓글 {commentCnt}개 </h1>
      <InputWrap>
        <textarea
          id="comment"
          placeholder="댓글을 남겨 주세요"
          ref={commentRef}
          onChange={valueCheck}
          onInput={handleResizeHeight}
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

/* const Textarea = styled.textarea`
  box-sizing: border-box;
  resize: none;
  width: 720px;
  height: 50px;
  border: 1px solid #d4d4d4;
  padding: 0 10px 0 10px;
  margin-left: 3px;
  :focus {
    outline: 2px solid #0069ca;
  }
`; */
