import React, { useRef } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import { repliesApi } from '../../api/replyApi';
import { setCommentId } from '../../slices/commentSlice';
import { setReply } from '../../slices/replySlice';
import { CommentProps, ReplyInputProps } from '../../types/Post';
import { checkIsLogin } from '../../util/checkIsLogin';

const ReplyInput: React.FC<ReplyInputProps> = ({
  commentInfo,
  replyCnt,
  setReplyCnt,
  refetch,
}: CommentProps) => {
  const isLogin = checkIsLogin();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const replyRef = useRef<HTMLTextAreaElement>(null);
  const commentId = commentInfo.commentId;
  const replyMutation = repliesApi.useSetReplyMutation();
  const setReplys = replyMutation[0];
  const textarea = document.getElementById('reply') as HTMLTextAreaElement;
  const text = textarea?.value.replaceAll(/\n/g, '<br>');

  const addReplyHandler = () => {
    if (!isLogin) {
      navigate('/login');
      return;
    }
    setReplys({
      commentId: commentId,
      content: text,
    })
      .unwrap()
      .then(() => {
        replyRef.current!.value = '';
        replyRef!.current!.style.height = '58px';
        setReplyCnt(replyCnt + 1);
        refetch();
      });
  };

  const resizeHeightHandler = () => {
    replyRef!.current!.style.height = 'auto';
    replyRef!.current!.style.height = replyRef.current?.scrollHeight + 'px';
  };

  const checkValue = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    dispatch(setReply(event.target.value));
  };

  const cancelHandler = () => {
    replyRef.current!.value = '';
    replyRef!.current!.style.height = '58px';
  };

  return (
    <ReplyInputContainer
      style={{
        display:
          commentInfo.content === '삭제된 댓글입니다.'
            ? 'none'
            : commentInfo.content === '신고된 댓글입니다.'
            ? 'none'
            : 'inlineblock',
      }}
    >
      <InputContainer>
        <textarea
          id="reply"
          placeholder="답글을 남겨 주세요"
          ref={replyRef}
          style={{
            display:
              commentInfo.content === '삭제된 댓글입니다.'
                ? 'none'
                : commentInfo.content === '신고된 댓글입니다.'
                ? 'none'
                : 'inlineblock',
          }}
          onChange={checkValue}
          onInput={resizeHeightHandler}
        ></textarea>
      </InputContainer>
      <ButtonContainer>
        <CanceReplyBtn onClick={cancelHandler}> 취소</CanceReplyBtn>
        {!replyRef.current?.value ? (
          <AddReplyBtn className="noReplyContent">등록</AddReplyBtn>
        ) : (
          <AddReplyBtn
            className="isReplyContent"
            style={{
              display:
                commentInfo.content === '삭제된 댓글입니다.'
                  ? 'none'
                  : commentInfo.content === '신고된 댓글입니다.'
                  ? 'none'
                  : 'inlineblock',
            }}
            onClick={() => {
              dispatch(setCommentId(commentInfo.commentId));
              if (
                commentInfo.content === '삭제된 댓글입니다.' ||
                commentInfo.content === '신고된 댓글입니다.'
              ) {
                return;
              }
              if (!replyRef.current!.value) return;
              if (replyRef.current?.value === '삭제된 답글입니다.') return;
              if (replyRef.current?.value === '신고된 답글입니다.') return;
              addReplyHandler();
            }}
          >
            등록
          </AddReplyBtn>
        )}
      </ButtonContainer>
    </ReplyInputContainer>
  );
};

export default ReplyInput;

const ReplyInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 720px;
  margin-top: 30px;
  h1 {
    font-size: 24px;
    font-weight: 400;
  }
  @media (max-width: 1100px) {
    width: 94vw;
  }
`;

const InputContainer = styled.div`
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
    @media (max-width: 1100px) {
      width: 100vw;
    }
  }
`;
const ButtonContainer = styled.div`
  display: flex;
  width: 160px;
  margin: 15px 0 15px 590px;
  .noReplyContent {
    cursor: default;
    background: var(--sub-font-color);
  }
  #isReplyContent {
    cursor: pointer;
    :hover {
      background-color: var(--hover-point-blue-color);
    }
  }
  @media (max-width: 1100px) {
    width: 93vw;
    margin: 15px 0 0 0;
    justify-content: flex-end;
  }
`;

const CanceReplyBtn = styled.button`
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

const AddReplyBtn = styled.button`
  width: 50px;
  height: 30px;
  padding: 0 10px 0 10px;
  color: white;
  border-radius: 10px;
  background-color: var(--point-blue-color);
`;
