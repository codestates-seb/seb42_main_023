import React, { useRef } from 'react';
import styled from 'styled-components';
import DislikeIcon from '../../assets/common/DislikeIcon';
import LikeIcon from '../../assets/common/LikeIcon';
import {
  isEdit,
  setIsEdit,
  setReplyDislike,
  setReplyLike,
  setReplytId,
} from '../../slices/replySlice';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  PostStateType,
  ReplyStateType,
  CommentStateType,
  ReplyProps,
} from '../../types/PostDetail';
import { repliesApi } from '../../api/api';
import { isOpenDelete, setType } from '../../slices/postSlice';

const Reply: React.FC<ReplyProps> = ({ replyInfo, idx }: ReplyProps) => {
  const replyEditInput = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const state = useAppSelector(
    (
      state: PostStateType | ReplyStateType,
    ): PostStateType | ReplyStateType | CommentStateType => {
      return state;
    },
  );

  const commentId =
    (state as CommentStateType).comment &&
    (state as CommentStateType).comment.commentId;
  // 답글
  const replyQuery = repliesApi.useGetReplyQuery({ commentId });
  console.log('reply', replyQuery.data);
  const replySucccess = replyQuery.isSuccess;
  const replyMutation = repliesApi.useUpdataReplyMutation();
  const updateMutation = replyMutation[0];

  // 답글 좋아요 클릭 함수
  const ReplyLiikeHandler = (): void => {
    dispatch(setReplyLike((state as ReplyStateType).reply.isReplyLike));
  };
  // 답글 싫어요 클릭 함수
  const ReplyDislikeHandler = (): void => {
    dispatch(setReplyDislike((state as ReplyStateType).reply.isReplyDislike));
  };

  // 답글 Edit 여부 확인을 위한 배열 생성
  if (
    replyQuery.isSuccess &&
    (state as ReplyStateType).reply.isEdit === undefined
  ) {
    const edit = Array.from(
      { length: replyQuery.data.comment.length },
      (el) => (el = false),
    );

    dispatch(isEdit(edit as Array<boolean>));
  }

  // 삭제 확인 모달창
  const confirmDeleteHandler = (): void => {
    dispatch(isOpenDelete((state as PostStateType).post.isOpenDelete));
  };

  const typeChecker = (event: React.MouseEvent<HTMLElement>) => {
    if (event.target instanceof HTMLElement) {
      dispatch(setType(event.target.id));
    }
  };

  return (
    <ReplyContainer>
      <ReplyInfo key={replyInfo.replyId}>
        <ul className="reply-info">
          <li className="image">
            <img src={replyInfo && replyInfo.memberImage}></img>
          </li>
          <li className="nickname">{replyInfo && replyInfo.memberName}</li>
          <li className="reply-created-time">12시간 전</li>

          {replySucccess &&
          (state as ReplyStateType).reply.isEdit !== undefined &&
          ((state as ReplyStateType).reply.isEdit as Array<boolean>)[idx] ? (
            <li
              className="reply-update"
              id="edit"
              onClick={(): void => {
                if (!replyEditInput.current?.value) {
                  dispatch(setIsEdit(idx));
                  return;
                }
                dispatch(setIsEdit(idx));
                updateMutation({
                  replyId: replyInfo.replyId,
                  content: replyEditInput.current?.value,
                });
              }}
            >
              변경
            </li>
          ) : (
            <li
              className="reply-update"
              onClick={(): void => {
                dispatch(setIsEdit(idx));
              }}
            >
              수정
            </li>
          )}

          <li
            className="reply-delete"
            id="답글"
            onClick={(event: React.MouseEvent<HTMLElement>) => {
              dispatch(setReplytId(replyInfo.replyId));
              typeChecker(event);
              confirmDeleteHandler();
            }}
          >
            삭제
          </li>
          <button onClick={ReplyLiikeHandler}>
            <LikeIcon checked={replyInfo && replyInfo.isThumbup} />
          </button>
          <li className="reply-likes">{replyInfo && replyInfo.thumbupCount}</li>
          <button onClick={ReplyDislikeHandler}>
            <DislikeIcon checked={replyInfo && replyInfo.isThumbDown} />
          </button>
          <li className="reply-dislikes">
            {replyInfo && replyInfo.thumbupCount}
          </li>
        </ul>
      </ReplyInfo>

      <ReplyContent>
        {(state as ReplyStateType).reply.isEdit !== undefined &&
        ((state as ReplyStateType).reply.isEdit as Array<boolean>)[idx] ? (
          // 댓글 수정 시 생기는 INPUT
          <input
            className="edit-reply"
            placeholder={replyInfo && replyInfo.content}
            ref={replyEditInput}
          ></input>
        ) : (
          <div className="content">{replyInfo && replyInfo.content}</div>
        )}
      </ReplyContent>
    </ReplyContainer>
  );
};

export default Reply;

const ReplyContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 670px;
  padding-left: 50px;
  height: auto;
  margin-top: 25px;

  h1 {
    font-size: 24px;
    font-weight: 400;
  }
  .reply-info {
    width: 670px;
    height: 80px;
    display: flex;
    align-items: center;
    font-size: 12px;
    padding: 30px 0 30px 0;
  }
  .content {
    display: flex;
    align-items: center;
    width: 660px;
    height: 50px;
    padding-left: 10px;
    display: flex;
    justify-content: flex-start;
    width: auto;
    color: black;
  }
  .nickname {
    font-size: 16px;
    margin: 2px 15px 0 5px;
  }
  .reply-created-time {
    font-size: 16px;
    margin: 3px 15px 0 5px;
  }
  .reply-update {
    font-size: 16px;
    margin: 3px 15px 0 35px;
    color: gray;
    cursor: pointer;
  }
  .reply-delete {
    font-size: 16px;
    margin: 3px 164px 0 5px;
    color: gray;
    cursor: pointer;
  }
  .reply-likes {
    font-size: 16px;
    margin: 3px 15px 0 15px;
  }
  .reply-dislikes {
    font-size: 16px;
    margin: 3px 15px 0 15px;
  }
`;
const ReplyInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  height: 30px;
`;

const ReplyContent = styled.div`
  padding-left: 50px;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  width: 670px;
  height: 100%;
  .edit-reply {
    width: 660px;
    height: 50px;
    border-bottom: 1px solid #d4d4d4;
    padding: 3px 0 0 10px;
    ::placeholder {
      color: #0099ca;
    }
  }
`;
