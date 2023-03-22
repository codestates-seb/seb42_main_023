import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../hooks';
import styled from 'styled-components';
import _ from 'lodash';
import ReplyInput from './ReplyInput';
import DislikeIcon from '../../assets/common/DislikeIcon';
import LikeIcon from '../../assets/common/LikeIcon';
import TimeIcon from '../../assets/common/TimeIcon';
import Reply from './Reply';
import { repliesApi } from '../../api/replyApi';
import { commentsApi } from '../../api/commentApi';
import {
  setIsOpenDelete,
  setIsOpenReport,
  setReportType,
  setDeleteType,
} from '../../slices/postSlice';
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
import { timeSince } from '../mainP/Timecalculator';

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
  const commentId = 'comment' in state && state.comment?.commentId;
  // 댓글 조회
  const commentQuery = commentsApi.useGetCommentQuery({ postId });
  const comentSucccess = commentQuery.isSuccess;

  // 댓글 업데이트
  const commentMutation = commentsApi.useUpdateCommentMutation();
  const [updateMutation] = commentMutation;

  // 답글 조회
  const replyQuery = repliesApi.useGetReplyQuery({ commentId });
  const { isSuccess, data } = replyQuery;
  const contentEditInput = useRef<HTMLInputElement>(null);

  // 답글 Open 여부 확인을 위한 배열 생성
  if (
    commentQuery.isSuccess &&
    'reply' in state &&
    state.reply.isOpened === undefined
  ) {
    const open = Array.from(
      { length: commentQuery.data.comment.length },
      (el) => (el = false),
    );
    dispatch(isOpened(open));
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
  const commentLiikeHandler = (): void => {
    dispatch(setCommentLike((state as CommentStateType).comment.isCommentLike));
  };

  // 댓글 싫어요 클릭 함수
  const commentDislikeHandler = (): void => {
    dispatch(
      setCommentDislike((state as CommentStateType).comment.isCommentDislike),
    );
  };

  // 삭제 확인 모달창
  const confirmDeleteHandler = (): void => {
    dispatch(setIsOpenDelete((state as PostStateType).post.isOpenDelete));
  };

  // 삭제 타입 확인
  const deleteTypeChecker = (event: React.MouseEvent<HTMLElement>): void => {
    if (event.target instanceof HTMLElement) {
      dispatch(setDeleteType(event.target.id));
    }
  };

  // 신고 카테고리 확인
  const reportTypeChecker = (event: React.MouseEvent<HTMLElement>): void => {
    if (event.target instanceof HTMLElement) {
      dispatch(setCommentId(Number(event.target.dataset.commentid)));
      dispatch(setReportType(event.target.dataset.category!));
    }
  };

  useEffect(() => {
    // 답글 데이터가 변경될 때마다 총 답글 데이터 반영
    if (replyQuery.data) {
      dispatch(setTotalReplies(replyQuery.data && replyQuery.data.comment));
    }
  }, [data]);
  return (
    <CommentContainer>
      {commentQuery.data &&
        commentQuery.data.comment.map((comment: CommentType, idx: number) => {
          const filtered: Array<ReplyType> =
            'reply' in state &&
            state.reply.totalReplies &&
            (
              _.uniqBy(
                'reply' in state && state.reply.totalReplies,
                'replyId',
              ) as Array<object>
            ).filter((reply: Partial<ReplyType>) => {
              return reply.commentId === comment.commentId;
            });
          // 시간 계산
          const time = timeSince(comment.createdAt);
          // 답글 수정 여부
          const commentIsEdit = comment.modifiedAt !== '';

          return (
            <>
              <CommentInfo key={comment.commentId}>
                <ul className="content-info">
                  <li className="image">
                    <img src={comment.memberImage}></img>
                  </li>
                  <li className="nickname">{comment.memberName}</li>
                  <TimeIcon />

                  <li className="created-time">{time} 전</li>

                  {'comment' in state &&
                  ((comentSucccess && state.comment.isEdit !== undefined) ||
                    null) &&
                  state.comment.isEdit[idx] ? (
                    <li
                      className="comment-update"
                      id="edit"
                      onClick={(): void => {
                        if (!contentEditInput.current?.value) {
                          dispatch(setIsEdit(idx));
                          return;
                        }
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

                  <li
                    className="comment-delete"
                    id="댓글"
                    onClick={(event: React.MouseEvent<HTMLElement>): void => {
                      dispatch(setCommentId(comment.commentId));
                      deleteTypeChecker(event);
                      confirmDeleteHandler();
                    }}
                  >
                    삭제
                  </li>
                  <li
                    className="comment-report"
                    data-category="comment"
                    data-commentId={String(comment.commentId)}
                    onClick={(event): void => {
                      dispatch(
                        setIsOpenReport(
                          'post' in state && state.post.isOpenReport,
                        ),
                      );
                      reportTypeChecker(event);
                    }}
                  >
                    신고
                  </li>
                  <button onClick={commentLiikeHandler}>
                    <LikeIcon checked={comment.isThumbup} />
                  </button>
                  <li className="comment-likes">{comment.thumbupCount}</li>
                  <button onClick={commentDislikeHandler}>
                    <DislikeIcon checked={comment.isThumbDown} />
                  </button>
                  <li className="comment-dislikes">{comment.thumbDownCount}</li>
                </ul>
              </CommentInfo>
              <CommentContent>
                {'comment' in state &&
                state.comment.isEdit !== undefined &&
                state.comment.isEdit[idx] ? (
                  // 댓글 수정 시 생기는 INPUT
                  <input
                    className="edit-content"
                    placeholder={comment.content}
                    ref={contentEditInput}
                  ></input>
                ) : (
                  <div className="content">
                    {comment.content} {commentIsEdit ? '(수정됨)' : null}
                  </div>
                )}
                <ReplyBtn
                  onClick={(): void => {
                    // confirmRepliesHandler(comment.commentId);
                    dispatch(setCommentId(comment.commentId));
                    dispatch(setIsOpened(idx));
                  }}
                >
                  답글 {comment.replyCount}
                </ReplyBtn>
              </CommentContent>
              {'reply' in state &&
              ((isSuccess && state.reply.isOpened !== undefined) || null) &&
              state.reply.isOpened[idx] ? (
                <ReplyContainer data-opened="false">
                  <ReplyInput commentInfo={comment}></ReplyInput>
                  {filtered &&
                    filtered.map((reply: ReplyType, idx: number) => {
                      return (
                        <>
                          <Reply
                            key={reply.replyId}
                            replyInfo={reply}
                            idx={idx}
                          ></Reply>
                        </>
                      );
                    })}
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
    width: 130px;
    font-size: 16px;
    margin: 2px 15px 0 5px;
  }
  .created-time {
    width: 65px;
    font-size: 16px;
    margin: 3px 15px 0 5px;
  }
  .comment-update {
    width: 40px;
    font-size: 16px;
    margin: 3px 15px 0 35px;
    cursor: pointer;
  }
  .comment-delete {
    width: 40px;
    font-size: 16px;
    margin: 3px 15px 0 5px;
    cursor: pointer;
  }
  .comment-report {
    width: 40px;
    font-size: 16px;
    margin: 3px 120px 0 5px;
    color: #ca0000;
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
export const CommentInfo = styled.div`
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
