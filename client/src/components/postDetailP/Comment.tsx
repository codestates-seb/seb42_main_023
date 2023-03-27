import React, { useEffect, useRef, useState } from 'react';
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
  setCommentId,
  isEdit,
  setIsEdit,
  setIsOpenIntro,
} from '../../slices/commentSlice';
import {
  isOpened,
  setIsOpened,
  setTotalReplies,
} from '../../slices/replySlice';
import { timeSince } from '../mainP/Timecalculator';

const Comment: React.FC = () => {
  const [page] = useState<number>(1);
  const dispatch = useAppDispatch();
  const state = useAppSelector(
    (
      state: PostStateType | CommentStateType | ReplyStateType,
    ): PostStateType | CommentStateType | ReplyStateType => {
      return state;
    },
  );
  const loginUserName = window.localStorage.getItem('name');
  const params = useParams();
  const postId = params.postId;
  const commentId = 'comment' in state && state.comment?.commentId;
  // 댓글 조회
  const commentQuery = commentsApi.useGetCommentQuery({ postId, page });
  const comentSucccess = commentQuery.isSuccess;

  // 댓글 업데이트
  const commentMutation = commentsApi.useUpdateCommentMutation();
  const [updateMutation] = commentMutation;

  // 답글 조회
  const replyQuery = repliesApi.useGetReplyQuery({ commentId, page });
  const { isSuccess, data, refetch } = replyQuery;
  const contentEditInput = useRef<HTMLInputElement>(null);

  // 댓글 좋아요 추가, 삭제
  const addThumbUpMutation = commentsApi.useAddThumbUpMutation();
  const [addThumbUp] = addThumbUpMutation;
  const removeThumbUpMutation = commentsApi.useRemoveThumbUpMutation();
  const [removeThumbUp] = removeThumbUpMutation;
  // 댓글 싫어요  추가, 삭제
  const addThumbDownMutation = commentsApi.useAddThumbDownMutation();
  const [addThumbDown] = addThumbDownMutation;
  const removeThumbDownMutation = commentsApi.useRemoveThumbDownMutation();
  const [removeThumbDown] = removeThumbDownMutation;

  // 게시글, 답글 작성자 소개페이지 오픈 여부
  const isOpeReplyIntro = 'reply' in state && state?.reply.isOpeneIntro;
  const isOpePostIntro = 'post' in state && state?.post.isOpeneIntro;

  // 유저 정보 조회
  //TODO 유저 정보 조회 API 참조
  // 답글 Open 여부 확인을 위한 배열 생성
  if (
    commentQuery.isSuccess &&
    'reply' in state &&
    state.reply.isOpened === undefined
  ) {
    const open = Array.from(
      { length: commentQuery.data?.comments?.length },
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
      { length: commentQuery.data.comments?.length },
      (el) => (el = false),
    );
    dispatch(isEdit(edit as Array<boolean>));
  }
  //TODO
  // 댓글 좋아요 클릭 함수
  const commentLiikeHandler = (comment: CommentType): void => {
    const commentId = comment.commentId;
    // 좋아요만 있는 경우
    if (comment?.isThumbup && !comment?.isThumbdown) {
      console.log('좋아요 삭제');
      removeThumbUp({ commentId });
      return;
    }
    // 싫어요만 있는 경우
    if (!comment?.isThumbup && comment?.isThumbdown) {
      const commentId = comment.commentId;
      console.log('싫어요 삭제 후 좋아요 추가');
      removeThumbDown({ commentId });
      setTimeout(() => {
        addThumbUp({ commentId });
      }, 500);
      return;
    }
    // 둘 다 없는 경우
    if (!comment?.isThumbdown && !comment?.isThumbdown) {
      console.log('좋아요 추가');
      addThumbUp({ commentId });
      return;
    }
  };

  // 댓글 싫어요 클릭 함수
  const commentDislikeHandler = (comment: CommentType): void => {
    const commentId = comment.commentId;
    // 좋아요만 있는 경우
    if (comment.isThumbup && !comment?.isThumbdown) {
      // 좋아요 제거, 싫어요 추가
      console.log('좋아요 삭제 후 싫어요 추가');
      removeThumbUp({ commentId });
      setTimeout(() => {
        addThumbDown({ commentId });
      }, 500);
      return;
    }
    // 싫어요만 있는 경우
    if (!comment?.isThumbup && comment?.isThumbdown) {
      // 싫어요 제거
      console.log('싫어요 삭제');
      removeThumbDown({ commentId });
      return;
    }

    // 둘 다 없는 경우
    if (!comment?.isThumbup && !comment?.isThumbdown) {
      // 싫어요 추가
      console.log('싫어요 추가');
      addThumbDown({ commentId });
      return;
    }
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
  // 소개 페이지 오픈
  const IntroHandler = (event: React.MouseEvent<HTMLElement>) => {
    if (
      !isOpePostIntro &&
      !isOpeReplyIntro &&
      'comment' in state &&
      event.target instanceof HTMLElement
    ) {
      dispatch(setIsOpenIntro(state.comment.isOpeneIntro));
      dispatch(setCommentId(Number(event.target.dataset.commentid)));
      console.log('userName', event.target.id);
    }
  };
  const outClickIntroHandler = (event: React.MouseEvent<HTMLElement>) => {
    if (
      'comment' in state &&
      state.comment.isOpeneIntro &&
      event.target instanceof HTMLElement
    ) {
      dispatch(setIsOpenIntro(false));
    }
  };

  useEffect(() => {
    // 답글 데이터가 변경될 때마다 총 답글 데이터 반영
    console.log(replyQuery.data);
    dispatch(setTotalReplies(replyQuery.data?.replies || []));
  }, [data]);
  return (
    <CommentContainer>
      {commentQuery.data &&
        commentQuery.data.comments.map((comment: CommentType, idx: number) => {
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
          const commentIsEdit =
            comment.modifiedAt !== comment.createdAt ? true : false;

          return (
            <>
              <CommentInfo
                key={comment.commentId}
                onClick={outClickIntroHandler}
              >
                <ul className="content-info">
                  <li className="image" onClick={IntroHandler}>
                    <img
                      src={comment.memberImage}
                      id={comment.memberName}
                      data-img={comment.memberImage}
                      data-commentId={comment.commentId}
                    ></img>
                  </li>
                  {'comment' in state &&
                  state.comment.isOpeneIntro &&
                  comment?.commentId === state.comment?.commentId ? (
                    <IntorductionContainer>
                      <IntroInfo>
                        <ul className="intro-content-info">
                          <li className="image">
                            <img src={comment.memberImage} id=""></img>
                          </li>
                          <li className="intro-nickname">
                            {comment.memberName}
                          </li>
                        </ul>
                      </IntroInfo>
                      <label className="introduction">{comment.content}</label>
                      <div className="intro-moreInfo">더보기 》</div>
                    </IntorductionContainer>
                  ) : null}

                  <li className="nickname">{comment.memberName}</li>
                  <TimeIcon />

                  <li className="created-time">{time} 전</li>

                  {'comment' in state &&
                  state?.comment.isEdit !== undefined &&
                  state.comment.isEdit[idx] ? (
                    <li
                      className="comment-update"
                      id="edit"
                      style={{
                        display:
                          loginUserName === comment?.memberName
                            ? 'block'
                            : 'none',
                      }}
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
                      style={{
                        display:
                          loginUserName == comment?.memberName
                            ? 'block'
                            : 'none',
                      }}
                      onClick={(): void => {
                        dispatch(setIsEdit(idx));
                      }}
                    >
                      수정
                    </li>
                  )}
                  {loginUserName === comment.memberName ? (
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
                  ) : null}

                  <li
                    className="comment-report"
                    data-category="comment"
                    data-commentId={String(comment.commentId)}
                    style={{
                      margin:
                        loginUserName === comment?.memberName
                          ? '3px 148px 0 5px'
                          : '3px 228px 0 5px',
                    }}
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
                  <button
                    onClick={_.debounce(() => {
                      commentLiikeHandler(comment);
                    }, 500)}
                  >
                    <LikeIcon checked={comment.isThumbup} />
                  </button>
                  <li className="comment-likes">{comment.thumbupCount}</li>
                  <button
                    onClick={_.debounce(() => {
                      commentDislikeHandler(comment);
                    }, 500)}
                  >
                    <DislikeIcon checked={comment.isThumbdown} />
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
                    {comment.isDeleted ? '신고된 댓글입니다.' : comment.content}
                    {commentIsEdit ? '(수정됨)' : null}
                  </div>
                )}
                <ReplyBtn
                  onClick={(): void => {
                    if ('comment' in state && state.comment.isOpeneIntro) {
                      dispatch(setIsOpenIntro(false));
                    }
                    dispatch(setCommentId(comment.commentId));
                    dispatch(setIsOpened(idx));
                  }}
                >
                  답글
                </ReplyBtn>
              </CommentContent>
              {/* {isSuccess && 'reply' in state && state.reply.isOpened[idx] ? ( */}
              {'reply' in state && isSuccess && state.reply?.isOpened[idx] ? (
                <ReplyContainer>
                  <ReplyInput commentInfo={comment}></ReplyInput>
                  {filtered?.map((reply: ReplyType, idx: number) => {
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
    position: relative;
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
    width: 75px;
    font-size: 16px;
    margin: 3px 15px 0 5px;
  }
  .comment-update {
    width: 40px;
    font-size: 16px;
    margin: 3px 15px 0 15px;
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
    margin: 3px 148px 0 5px;
    color: #ca0000;
    cursor: pointer;
  }
  .comment-likes {
    width: 30px;
    font-size: 16px;
    margin: 3px 15px 0 15px;
  }
  .comment-dislikes {
    width: 30px;
    font-size: 16px;
    margin: 3px 15px 0 15px;
  }

  #edit {
    color: #0069ca;
  }
  .image {
    position: relative;
    z-index: 1;
  }
`;

//TODO Into
const IntorductionContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  width: 240px;
  height: 140px;
  border: 1px solid #d4d4d4;
  z-index: 2;
  top: 50px;
  left: 45px;
  background-color: white;
  .introduction {
    font-size: 17x;
    color: gray;
    width: 175px;
    margin: 10px 0 0 35px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .intro-moreInfo {
    font-size: 17x;
    color: gray;
    width: 150px;
    margin: 5px 0 0 165px;
    cursor: pointer;
  }
`;
const IntroInfo = styled.div`
  z-index: 5;
  .intro-content-info {
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    font-size: 12px;
    padding: 10px 0 0 10px;
  }
  .intro-nickname {
    width: 150px;
    height: 30px;
    font-size: 16px;
    margin: 8px 0 0 10px;
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
`;

const ReplyBtn = styled.button`
  width: 50px;
  height: 10px;
  background-color: #ffffff;
  color: #5c5c5c;
  margin-top: 15px;
  cursor: pointer;
`;
