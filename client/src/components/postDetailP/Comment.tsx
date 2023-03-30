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
import { setReportType, setSelectedMember } from '../../slices/postSlice';
import {
  PostStateType,
  CommentStateType,
  ReplyStateType,
  CommentType,
  ReplyType,
  ReportProps,
  CommentProps,
} from '../../types/PostDetail';
import { setCommentId, isEdit, setIsEdit } from '../../slices/commentSlice';
import {
  isOpened,
  setIsOpened,
  setTotalReplies,
} from '../../slices/replySlice';
import { timeSince } from '../mainP/Timecalculator';
import { membersApi } from '../../api/memberapi';
import { CommentInputProps } from '../../types/PostDetail';
import { setMemberName } from '../../slices/headerSlice';
import { useNavigate } from 'react-router';

const Comment: React.FC<
  Partial<CommentInputProps & ReportProps & CommentProps>
> = ({
  commentCnt,
  isOpenReport,
  setIsOpenReport,
  setIsOpenDelete,
  setDeleteType,
  setIsOpenCommentIntro,
  setIsOpenReplyIntro,
  isOpenDelete,
  isOpenIntro,
  isCommentOpenIntro,
  isReplyOpenIntro,
}: Partial<CommentInputProps & ReportProps & CommentProps>) => {
  const dispatch = useAppDispatch();
  const state = useAppSelector(
    (
      state: PostStateType | CommentStateType | ReplyStateType,
    ): PostStateType | CommentStateType | ReplyStateType => {
      return state;
    },
  );
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);

  const loginUserName = window.localStorage.getItem('name');
  const params = useParams();
  const postId = params.postId;
  const commentId = 'comment' in state && state.comment?.commentId;
  const selectedMember = 'post' in state ? state.post.selectedMember : null;

  // 댓글 조회
  const commentQuery = commentsApi.useGetCommentQuery({ postId, page });

  // 댓글 업데이트
  const commentMutation = commentsApi.useUpdateCommentMutation();
  const [updateMutation] = commentMutation;

  // 답글 조회
  const [replyPage, setReplyPage] = useState<number>(1);
  const replyQuery = repliesApi.useGetReplyQuery({ commentId, replyPage });
  const { isSuccess, data } = replyQuery;
  const commentEditInput = useRef<HTMLInputElement>(null);

  //  멤버 정보 조회
  const memeberQuery = membersApi.useGetMemberQuery({ name: selectedMember });

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

  // 유저 정보 조회
  // 답글 Open 여부 확인을 위한 배열 생성
  if (
    commentQuery.isSuccess &&
    'reply' in state &&
    state.reply?.isOpened === undefined
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
    setIsOpenDelete?.(!isOpenDelete!);
  };

  // 삭제 타입 확인
  const deleteTypeChecker = (event: React.MouseEvent<HTMLElement>): void => {
    if (event.target instanceof HTMLElement) {
      setDeleteType?.(event.target.id);
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
    event.stopPropagation();
    if (
      !isOpenIntro &&
      !isReplyOpenIntro &&
      event.target instanceof HTMLElement
    ) {
      setIsOpenCommentIntro?.(!isCommentOpenIntro!);
      console.log('isOpenIntro', isCommentOpenIntro!);
      dispatch(setCommentId(Number(event.target.dataset.commentid)));
      dispatch(setSelectedMember(event.target.id));
    }
  };
  const outClickIntroHandler = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    if (event.target instanceof HTMLElement) {
      setIsOpenCommentIntro?.(false);
    }
  };

  useEffect(() => {
    // 답글 데이터가 변경될 때마다 총 답글 데이터 반영
    dispatch(setTotalReplies(replyQuery.data?.replies || []));
  }, [data]);

  const minusCommentPage = () => {
    if (page >= 2) {
      setPage((prev) => (prev = prev - 1));
    }
  };
  const plusCommentPage = () => {
    setPage((prev) => prev + 1);
  };
  const minusReplyPage = () => {
    if (replyPage >= 2) {
      setReplyPage((prev) => (prev = prev - 1));
    }
  };
  const plusReplyPage = () => {
    setReplyPage((prev) => prev + 1);
  };
  return (
    <CommentContainer onClick={outClickIntroHandler}>
      {commentQuery.data &&
        commentQuery.data?.comments?.map(
          (comment: CommentType, idx: number) => {
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
            const enterHandler = (
              event: React.KeyboardEvent<HTMLInputElement>,
            ): void => {
              if (!commentEditInput.current?.value) return;
              if (event.key === 'Enter') {
                dispatch(setIsEdit(idx));
                updateMutation({
                  postId: postId,
                  commentId: comment.commentId,
                  content: commentEditInput.current?.value,
                });
              }
            };

            // 답글 수정 여부
            const commentIsEdit =
              comment.modifiedAt !== comment.createdAt ? true : false;

            return (
              <>
                <CommentInfo key={comment?.commentId}>
                  <ul className="content-info">
                    <li className="image" data-membername={comment?.memberName}>
                      <img
                        src={comment.memberImage}
                        id={comment.memberName}
                        data-img={comment.memberImage}
                        data-commentid={comment.commentId}
                        onClick={IntroHandler}
                      ></img>
                    </li>
                    {'comment' in state &&
                    isCommentOpenIntro! &&
                    comment?.commentId === state.comment?.commentId ? (
                      <IntorductionContainer>
                        <IntroInfo>
                          <ul className="intro-content-info">
                            <li className="image">
                              <img src={comment?.memberImage} id=""></img>
                            </li>
                            <li className="intro-nickname">
                              {comment?.memberName}
                            </li>
                          </ul>
                        </IntroInfo>
                        <label className="introduction">
                          {memeberQuery.data?.intro || '소개 내용이 없습니다.'}
                        </label>
                        <div
                          className="intro-moreInfo"
                          onClick={() => {
                            dispatch(setMemberName(comment?.memberName));
                            navigate('/mypage');
                            scrollTo(0, 0);
                          }}
                        >
                          더보기 》
                        </div>
                      </IntorductionContainer>
                    ) : null}

                    <li className="nickname">{comment?.memberName}</li>
                    <TimeIcon />

                    <li className="created-time">{time} 전</li>

                    {'comment' in state &&
                    state.comment?.isEdit !== undefined &&
                    state.comment?.isEdit[idx!] ? (
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
                          if (
                            !commentEditInput.current?.value &&
                            comment?.content !== '삭제된 댓글입니다.'
                          ) {
                            dispatch(setIsEdit(idx));
                            return;
                          }
                          dispatch(setIsEdit(idx));
                          updateMutation({
                            postId: postId,
                            commentId: comment?.commentId,
                            content: commentEditInput.current?.value,
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
                          if (comment?.content !== '삭제된 댓글입니다.')
                            dispatch(setIsEdit(idx));
                        }}
                      >
                        {comment?.content === '삭제된 댓글입니다.' ||
                        comment?.content === '신고된 댓글입니다.'
                          ? null
                          : '수정'}
                      </li>
                    )}
                    {loginUserName === comment?.memberName ? (
                      <li
                        className="comment-delete"
                        style={{
                          margin:
                            loginUserName === comment?.memberName
                              ? '3px 165px 0 5px'
                              : '3px 195px 0 5px',
                        }}
                        id="댓글"
                        onClick={(
                          event: React.MouseEvent<HTMLElement>,
                        ): void => {
                          dispatch(setCommentId(comment?.commentId));
                          deleteTypeChecker(event);
                          confirmDeleteHandler();
                        }}
                      >
                        {comment.content === '삭제된 댓글입니다.' ||
                        comment.content === '신고된 댓글입니다.'
                          ? null
                          : '삭제'}
                      </li>
                    ) : null}

                    <li
                      className="comment-report"
                      data-category="comment"
                      data-commentid={String(comment.commentId)}
                      style={{
                        display:
                          loginUserName === comment?.memberName
                            ? 'none'
                            : 'block',

                        margin:
                          loginUserName === comment?.memberName
                            ? '3px 148px 0 5px'
                            : '3px 228px 0 5px',
                      }}
                      onClick={(event): void => {
                        setIsOpenReport?.(!isOpenReport!);
                        reportTypeChecker(event);
                      }}
                    >
                      {comment.content === '삭제된 댓글입니다.'
                        ? null
                        : comment.content === '신고된 댓글입니다.'
                        ? null
                        : '신고'}
                    </li>
                    {comment.content ===
                    '삭제된 댓글입니다.' ? null : comment.content ===
                      '신고된 댓글입니다.' ? null : (
                      <>
                        <button
                          onClick={_.debounce(() => {
                            commentLiikeHandler(comment);
                          }, 500)}
                        >
                          <LikeIcon checked={comment.isThumbup} />
                        </button>
                        <li className="comment-likes">
                          {comment.thumbupCount}
                        </li>
                        <button
                          onClick={_.debounce(() => {
                            commentDislikeHandler(comment);
                          }, 500)}
                        >
                          <DislikeIcon checked={comment.isThumbdown} />
                        </button>
                        <li className="comment-dislikes">
                          {comment.thumbDownCount}
                        </li>
                      </>
                    )}
                  </ul>
                </CommentInfo>
                <CommentContent>
                  <div className="commentContent">
                    {'comment' in state &&
                    state.comment.isEdit !== undefined &&
                    state.comment.isEdit[idx] ? (
                      // 댓글 수정 시 생기는 INPUT
                      <input
                        className="edit-content"
                        placeholder={comment.content}
                        ref={commentEditInput}
                        onKeyDown={enterHandler}
                      ></input>
                    ) : (
                      <div className="content">
                        {comment?.content}

                        {commentIsEdit &&
                        comment?.content === '삭제된 댓글입니다.'
                          ? null
                          : commentIsEdit &&
                            comment?.content === '신고된 댓글입니다.'
                          ? null
                          : commentIsEdit
                          ? '(수정됨)'
                          : null}
                      </div>
                    )}
                    {comment?.replyCount !== 0 ? (
                      <ReplyBtn
                        className="isReply"
                        onClick={(): void => {
                          dispatch(setCommentId(comment.commentId));
                          setReplyPage(1);
                          // 답글 눌릴 경우 그 이외 답글들 다 가리기
                          if (
                            'comment' in state &&
                            state.comment?.commentId !== comment?.commentId
                          ) {
                            const open = Array.from(
                              { length: commentQuery.data?.comments?.length },
                              (el) => (el = false),
                            );
                            dispatch(isOpened(open!));
                          }
                          dispatch(setIsOpened(idx!));
                        }}
                      >
                        답글
                        {comment?.replyCount ? ' ' + comment?.replyCount : ''}개
                      </ReplyBtn>
                    ) : (
                      <ReplyBtn
                        className="noReply"
                        onClick={(): void => {
                          dispatch(setCommentId(comment.commentId));
                          // 답글 눌릴 경우 그 이외 답글들 다 가리기
                          if (
                            'comment' in state &&
                            state.comment?.commentId !== comment?.commentId
                          ) {
                            const open = Array.from(
                              { length: commentQuery.data?.comments?.length },
                              (el) => (el = false),
                            );
                            dispatch(isOpened(open!));
                          }
                          dispatch(setIsOpened(idx!));
                        }}
                      >
                        답글 {comment?.replyCount ? comment?.replyCount : ''}
                      </ReplyBtn>
                    )}
                  </div>
                </CommentContent>
                {'reply' in state && isSuccess && state.reply?.isOpened[idx] ? (
                  <>
                    <ReplyContainer>
                      {/* {comment.content !== '삭제된 댓글입니다.' ? (
                        <ReplyInput commentInfo={comment}></ReplyInput>
                      ) : null} */}
                      <ReplyInput commentInfo={comment}></ReplyInput>
                      {filtered?.map((reply: ReplyType, idx: number) => {
                        return (
                          <>
                            <Reply
                              key={reply.replyId}
                              replyInfo={reply}
                              idx={idx}
                              replyPage={replyPage}
                              setIsOpenReport={setIsOpenReport!}
                              setIsOpenDelete={setIsOpenDelete!}
                              setIsOpenReplyIntro={setIsOpenReplyIntro!}
                              setDeleteType={setDeleteType!}
                              isOpenReport={isOpenReport!}
                              isOpenDelete={isOpenDelete!}
                              isReplyOpenIntro={isReplyOpenIntro!}
                            ></Reply>
                          </>
                        );
                      })}
                    </ReplyContainer>
                    <div className="replyPageContainer">
                      {replyPage !== 1 ? (
                        <button id="moreInfo" onClick={minusReplyPage}>
                          《 이전 답글
                        </button>
                      ) : null}
                      {comment.replyCount > 10 &&
                      comment.replyCount / 10 > replyPage ? (
                        <button id="moreInfo" onClick={plusReplyPage}>
                          답글 더보기 》
                        </button>
                      ) : null}
                    </div>
                  </>
                ) : null}
              </>
            );
          },
        )}

      <div className="commentPageContainer">
        {page !== 1 ? (
          <button id="moreInfo" onClick={minusCommentPage}>
            《 이전 댓글
          </button>
        ) : null}
        {commentCnt! > 10 && commentCnt! / 10 > page ? (
          <button id="moreInfo" onClick={plusCommentPage}>
            댓글 더보기 》
          </button>
        ) : null}
      </div>
    </CommentContainer>
  );
};

export default Comment;

const CommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 720px;
  height: auto;
  padding: 0 0 50px 0;
  margin-top: 30px;
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
    width: 700px;
    height: auto;
    padding-left: 10px;
    margin-top: 12px;
    display: flex;
    justify-content: flex-start;
    word-break: break-all;
    font-size: 17px;
  }
  .nickname {
    width: 130px;
    font-size: 17px;
    margin: 2px 15px 0 5px;
  }
  .created-time {
    width: 75px;
    font-size: 16px;
    margin: 3px 15px 0 5px;
    color: #94969b;
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
  .replyPageContainer {
    margin: 0 0 0 50px;

    display: flex;
    width: 180px;
    justify-content: space-between;
    z-index: 10;
    align-items: center;
    margin-left: 50px;
  }
  .commentPageContainer {
    display: flex;
    width: 180px;
    justify-content: space-between;
    z-index: 10;
    align-items: center;
  }
  #moreInfo {
    margin: 10px 0 0 0px;
    text-align: left;
    font-size: 16px;
    font-weight: 600;
    color: #0069ca;
    cursor: pointer;
  }
`;

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
    width: 100px;
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
  margin-top: 10px;
`;

const CommentContent = styled.div`
  padding-left: 50px;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  width: 720px;
  height: auto;
  margin-bottom: 10px;
  padding: 0 0 15px 0;
  border-bottom: 1px solid #d4d4d4;

  .edit-content {
    width: 660px;
    height: 50px;
    border-bottom: 1px solid #d4d4d4;
    padding: 3px 0 0 10px;
    ::placeholder {
      color: #0275e1;
    }
  }
  .isReply {
    color: #0275e1;
    font-weight: bold;
  }
  .noReply {
    font-weight: bold;
  }
`;

const ReplyContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  padding: 0 0 15px 0;
  /* border-bottom: 1px solid #d4d4d4; */
  .isReply {
    color: #0275e1;
  }
`;

const ReplyBtn = styled.button`
  width: max-content;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  padding: 0 10px 0 10px;
  background-color: #ffffff;
  color: #5c5c5c;
  margin-top: 15px;
  border-radius: 15px;
  font-weight: bold;
  text-align: center;
  cursor: pointer;

  :hover {
    background-color: #0275e1;
    color: white;
    text-align: center;
  }
`;
