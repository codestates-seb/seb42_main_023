import React, { useRef } from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import ReplyInput from './ReplyInput';
import DislikeIcon from '../../assets/common/DislikeIcon';
import LikeIcon from '../../assets/common/LikeIcon';
import TimeIcon from '../../assets/common/TimeIcon';
import Reply from './Reply';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { commentsApi, repliesApi } from '../../api/api';
import { useParams } from 'react-router';
import {
  PostStateType,
  CommentStateType,
  ReplyStateType,
  CommentType,
  ReplyType,
} from '../../types/PostDetail';

import {
  setCommentDislike,
  setCommentLike,
  setCommentId,
  isEdit,
  setIsEdit,
} from '../../slices/commentSlice';

import {
  isOpened,
  setIsOpened,
  setTotalReplies,
} from '../../slices/replySlice';

const Comment: React.FC = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector(
    (
      state: PostStateType | CommentStateType | ReplyStateType,
    ): PostStateType | CommentStateType | ReplyStateType => {
      return state;
    },
  );
  const params = useParams();
  const postId = params.postId;
  // 댓글 조회
  const commentQuery = commentsApi.useGetCommentQuery({ postId });
  const comentSucccess = commentQuery.isSuccess;

  // 댓글 업데이트
  const commentMutation = commentsApi.useUpdateCommentMutation();
  const updateMutation = commentMutation[0];

  const commentId =
    (state as CommentStateType).comment &&
    (state as CommentStateType).comment.commentId;
  // 댓글 답글 조회
  const replyQuery = repliesApi.useGetReplyQuery({ commentId });
  const { isSuccess, data } = replyQuery;

  const contentEditInput = useRef<HTMLInputElement>(null);

  // 답글 Open 여부 확인을 위한 배열 생성
  if (
    commentQuery.isSuccess &&
    (state as ReplyStateType).reply.isOpened === undefined
  ) {
    const open = Array.from(
      { length: commentQuery.data.comment.length },
      (el) => (el = false),
    );
    dispatch(isOpened(open as Array<boolean>));
  }

  // 댓글 Edit 여부 확인을 위한 배열 생성
  if (
    commentQuery.isSuccess &&
    (state as CommentStateType).comment.isEdit === undefined
  ) {
    const edit = Array.from(
      { length: commentQuery.data.comment.length },
      (el) => (el = false),
    );

    dispatch(isEdit(edit as Array<boolean>));
  }

  // 댓글 좋아요 클릭 함수
  const CommentLiikeHandler = (): void => {
    dispatch(setCommentLike((state as CommentStateType).comment.isCommentLike));
  };

  // 댓글 싫어요 클릭 함수
  const CommentDislikeHandler = (): void => {
    dispatch(
      setCommentDislike((state as CommentStateType).comment.isCommentDislike),
    );
  };

  // 답글 조회
  const confirmRepliesHandler = (commentId: Partial<CommentType>): void => {
    dispatch(setCommentId(commentId));
  };

  return (
    <CommentContainer>
      {comentSucccess &&
        commentQuery.data.comment.map((comment: CommentType, idx: number) => {
          // const filtered =
          //   (state as ReplyStateType).reply.totalReplies &&
          //   (
          //     _.uniqBy(
          //       (state as ReplyStateType).reply.totalReplies,
          //       'replyId',
          //     ) as Array<object>
          //   ).filter((reply) => {
          //     return (reply as ReplyType).commentId === comment.commentId;
          //   });
          return (
            <>
              <CommentInfo key={comment.commentId}>
                <ul className="content-info">
                  <li className="image">
                    <img src={comment.memberImage}></img>
                  </li>
                  <li className="nickname">{comment.memberName}</li>
                  <TimeIcon />

                  <li className="created-time">12시간 전</li>

                  {comentSucccess &&
                  (
                    (state as CommentStateType).comment.isEdit as Array<boolean>
                  )[idx] ? (
                    <li
                      className="comment-update"
                      id="edit"
                      onClick={(): void => {
                        dispatch(setIsEdit(idx));
                        updateMutation({
                          postId: postId,
                          commentId: comment.commentId,
                          content: contentEditInput.current?.value,
                        });
                      }}
                    >
                      변경
                    </li>
                  ) : (
                    <li
                      className="comment-update"
                      onClick={(): void => {
                        dispatch(setIsEdit(idx));
                      }}
                    >
                      수정
                    </li>
                  )}

                  <li className="comment-delete">삭제</li>
                  <button onClick={CommentLiikeHandler}>
                    <LikeIcon checked={comment.isThumbup!} />
                  </button>
                  <li className="comment-likes">{comment.thumbupCount}</li>
                  <button onClick={CommentDislikeHandler}>
                    <DislikeIcon checked={comment.isThumbDown!} />
                  </button>
                  <li className="comment-dislikes">{comment.thumbDownCount}</li>
                </ul>
              </CommentInfo>
              <CommentContent>
                {(state as CommentStateType).comment &&
                ((state as CommentStateType).comment.isEdit as Array<boolean>)[
                  idx!
                ] ? (
                  // 댓글 수정 시 생기는 INPUT
                  <input
                    className="edit-content"
                    placeholder={comment.content}
                    ref={contentEditInput}
                  ></input>
                ) : (
                  <div className="content">{comment.content}</div>
                )}
                <ReplyBtn
                  onClick={(): void => {
                    confirmRepliesHandler(
                      comment.commentId as Partial<CommentType>,
                    );
                    dispatch(setIsOpened(idx));
                    dispatch(
                      setTotalReplies(
                        replyQuery.data && replyQuery.data.comment,
                      ),
                    );
                  }}
                >
                  답글 {comment.replyCount}
                </ReplyBtn>
              </CommentContent>
              {isSuccess &&
              (state as ReplyStateType).reply.isOpened &&
              ((state as ReplyStateType).reply.isOpened as Array<boolean>)[
                idx
              ] ? (
                <ReplyContainer>
                  <ReplyInput></ReplyInput>

                  {isSuccess &&
                    data! &&
                    (data.comment as Array<ReplyType>).map(
                      (reply: ReplyType) => {
                        return (
                          <>
                            <Reply
                              key={reply.replyId}
                              replyInfo={reply}
                            ></Reply>
                          </>
                        );
                      },
                    )}
                </ReplyContainer>
              ) : null}
            </>
          );
        })}
    </CommentContainer>
  );
};

export default Comment;

const CommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 720px;
  height: auto;

  h1 {
    font-size: 24px;
    font-weight: 400;
  }
  .content-info {
    width: 720px;
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
  }
  .nickname {
    font-size: 16px;
    margin: 2px 15px 0 5px;
  }
  .created-time {
    font-size: 16px;
    margin: 3px 15px 0 5px;
  }
  .comment-update {
    font-size: 16px;
    margin: 3px 15px 0 35px;
    color: gray;
    cursor: pointer;
  }
  .comment-delete {
    font-size: 16px;
    margin: 3px 200px 0 5px;
    color: gray;
    cursor: pointer;
  }
  .comment-likes {
    font-size: 16px;
    margin: 3px 15px 0 15px;
  }
  .comment-dislikes {
    font-size: 16px;
    margin: 3px 15px 0 15px;
  }
  #edit {
    color: #0069ca;
  }
`;
const CommentInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  height: 30px;
  margin-top: 50px;
`;

const CommentContent = styled.div`
  padding-left: 50px;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  width: 720px;
  height: auto;
  margin-bottom: 10px;
  .edit-content {
    width: 660px;
    height: 50px;
    border-bottom: 1px solid #d4d4d4;
    padding: 3px 0 0 10px;
    ::placeholder {
      color: #0099ca;
    }
  }
`;

const ReplyContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  color: #5c5c5c;

  cursor: pointer;
`;

const ReplyBtn = styled.button`
  width: 50px;
  height: 10px;
  background-color: #ffffff;
  color: #5c5c5c;
  margin-top: 15px;
  cursor: pointer;
`;

//충돌해결
