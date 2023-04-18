import React, { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useNavigate, useParams } from 'react-router-dom';
import { getTimeSince } from '../../util/timeCalculator';
import debounce from 'lodash/debounce';
import uniqBy from 'lodash/uniqBy';
import styled from 'styled-components';
import parse from 'html-react-parser';
import ReplyInput from './ReplyInput';
import DislikeIcon from '../../assets/common/DislikeIcon';
import LikeIcon from '../../assets/common/LikeIcon';
import TimeIcon from '../../assets/common/TimeIcon';
import CommentDropdownButton from './CommentDropdownButton';
import Loading from '../common/Loading';
import Reply from './Reply';
import { CommentInputProps } from '../../types/Post';
import {
  CommentType,
  ReplyType,
  ReportProps,
  CommentProps,
} from '../../types/Post';
import { commentsApi } from '../../api/commentApi';
import { repliesApi } from '../../api/replyApi';
import { membersApi } from '../../api/membersApi';
import { setReportType, setSelectedMember } from '../../slices/postSlice';
import {
  setCommentId,
  isEdit,
  setIsEdit,
  setCommentPage,
} from '../../slices/commentSlice';
import {
  isOpened,
  setIsOpened,
  setTotalReplies,
} from '../../slices/replySlice';
import { checkIsLogin } from '../../util/checkIsLogin';

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
  const isLogin = checkIsLogin();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state);
  const [page, setPage] = useState<number>(1);
  const [commentData, setCommentData] = useState<Array<CommentType>>([]);
  const [editComment, setEditComment] = useState<string>('');
  const [selectedComment, setSelectedComment] = useState<string>('');
  const [replyCnt, setReplyCnt] = useState<number>();
  const loginUserName = window.localStorage.getItem('name');
  const params = useParams();
  const postId = params.postId;
  const commentId = 'comment' in state && state.comment?.commentId;
  const selectedMember = 'post' in state ? state.post.selectedMember : null;
  const contentTextarea = document.getElementById(
    'edit-comment',
  ) as HTMLTextAreaElement;
  const commentEditTextareaRef = useRef<HTMLTextAreaElement>(contentTextarea);

  const valueCheck = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    const data = event.target.value.replaceAll(/\n/g, '<br>');
    setEditComment(data);
    setSelectedComment(event.target.value);
  };

  const initData = (event: React.MouseEvent<HTMLLIElement>): void => {
    if (event.target instanceof HTMLElement) {
      const data = event.target!.dataset!.comment!;
      const parsedData = data.replaceAll(/<br>/g, '\n');
      setSelectedComment(parsedData);
    }
  };

  const handleResizeHeight = () => {
    commentEditTextareaRef!.current.style!.height = 'auto';
    commentEditTextareaRef!.current.style!.height =
      commentEditTextareaRef.current?.scrollHeight + 'px';
  };
  const orderby = 'comment' in state && state.comment.orderby;
  const commentQuery = commentsApi.useGetCommentQuery({
    postId,
    page,
    orderby,
  });
  const { isLoading, refetch } = commentQuery;
  const commentMutation = commentsApi.useUpdateCommentMutation();
  const [updateMutation] = commentMutation;
  const [replyPage, setReplyPage] = useState<number>(1);
  const replyQuery = repliesApi.useGetReplyQuery(
    { commentId, replyPage },
    {
      skip: !commentId,
    },
  );
  const { isSuccess } = replyQuery;
  const memberQuery = membersApi.useGetMemberQuery(
    { name: selectedMember },
    { skip: !selectedMember },
  );
  const addThumbUpMutation = commentsApi.useAddCommentThumbUpMutation();
  const [addThumbUp] = addThumbUpMutation;
  const removeThumbUpMutation = commentsApi.useDeleteCommentThumbUpMutation();
  const [deleteThumbUp] = removeThumbUpMutation;
  const addThumbDownMutation = commentsApi.useAddCommentThumbDownMutation();
  const [addThumbDown] = addThumbDownMutation;
  const removeThumbDownMutation =
    commentsApi.useDeleteCommentThumbDownMutation();
  const [deleteThumbDown] = removeThumbDownMutation;

  const commentLiikeHandler = (comment: CommentType): void => {
    if (!isLogin) {
      navigate('/login');
      return;
    }
    const commentId = comment.commentId;
    if (comment?.isThumbup && !comment?.isThumbdown) {
      deleteThumbUp({ commentId });
      return;
    }
    if (!comment?.isThumbup && comment?.isThumbdown) {
      const commentId = comment.commentId;

      deleteThumbDown({ commentId });
      setTimeout(() => {
        addThumbUp({ commentId });
      }, 500);

      return;
    }
    if (!comment?.isThumbdown && !comment?.isThumbdown) {
      addThumbUp({ commentId });
      return;
    }
  };
  const commentDislikeHandler = (comment: CommentType): void => {
    if (!isLogin) navigate('/login');
    const commentId = comment.commentId;
    if (comment.isThumbup && !comment?.isThumbdown) {
      setTimeout(() => {
        addThumbDown({ commentId });
      }, 500);

      return;
    }
    if (!comment?.isThumbup && comment?.isThumbdown) {
      deleteThumbDown({ commentId });
      return;
    }

    if (!comment?.isThumbup && !comment?.isThumbdown) {
      addThumbDown({ commentId });
      return;
    }
  };

  const confirmDeleteHandler = (): void => {
    setIsOpenDelete?.(!isOpenDelete!);
  };

  const deleteTypeChecker = (event: React.MouseEvent<HTMLElement>): void => {
    if (event.target instanceof HTMLElement) {
      setDeleteType?.(event.target.id);
    }
  };

  const reportTypeChecker = (event: React.MouseEvent<HTMLElement>): void => {
    if (event.target instanceof HTMLElement) {
      dispatch(setCommentId(Number(event.target.dataset.commentid)));
      dispatch(setReportType(event.target.dataset.category!));
    }
  };

  const IntroHandler = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    if (
      !isOpenIntro &&
      !isReplyOpenIntro &&
      event.target instanceof HTMLElement
    ) {
      setIsOpenCommentIntro?.(!isCommentOpenIntro!);
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

  const minusCommentPage = () => {
    if (page >= 2) {
      setPage((prev) => (prev = prev - 1));
      dispatch(setCommentPage(page - 1));
    }
  };
  const plusCommentPage = () => {
    setPage((prev) => prev + 1);
    dispatch(setCommentPage(page + 1));
  };
  const minusReplyPage = () => {
    if (replyPage >= 2) {
      setReplyPage((prev) => (prev = prev - 1));
    }
  };
  const plusReplyPage = () => {
    setReplyPage((prev) => prev + 1);
  };

  useEffect(() => {
    dispatch(setTotalReplies(replyQuery.data?.replies || []));
    setCommentData(commentQuery.data?.comments);
  }, [replyQuery.data, commentQuery.data]);

  if (commentQuery.isSuccess && state.reply?.isOpened === undefined) {
    const open = Array.from(
      { length: commentQuery.data?.comments?.length },
      (el) => (el = false),
    );
    dispatch(isOpened(open));
  }
  if (commentQuery.isSuccess && state.comment?.isEdit === undefined) {
    const edit = Array.from(
      { length: commentQuery.data.comments?.length },
      (el) => (el = false),
    );
    dispatch(isEdit(edit as Array<boolean>));
  }

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <CommentContainer onClick={outClickIntroHandler}>
          {commentQuery.data?.comments.length !== 0 ? (
            <CommentDropdownButton setPage={setPage} />
          ) : null}
          {commentQuery.data &&
            commentQuery.data?.comments?.map(
              (comment: CommentType, idx: number) => {
                const filtered: Array<ReplyType> =
                  state.reply.totalReplies! &&
                  (
                    uniqBy(state.reply.totalReplies, 'replyId') as Array<object>
                  ).filter((reply: Partial<ReplyType>) => {
                    return reply.commentId === comment.commentId;
                  });
                // 시간 계산
                const time = getTimeSince(comment.createdAt);

                const commentIsEdit =
                  comment.modifiedAt !== comment.createdAt ? true : false;
                const isDeleted = comment?.content === '삭제된 댓글입니다.';
                const isReported = comment?.content === '신고된 댓글입니다.';
                return (
                  <>
                    <CommentInfo key={comment?.commentId}>
                      <ul className="comment-info">
                        <li
                          className="image"
                          data-membername={comment?.memberName}
                        >
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
                            <div className="card-image">
                              <img src={comment?.memberImage}></img>
                            </div>
                            <div>{comment?.memberName}</div>
                            <div className="introduction">
                              {memberQuery?.data?.member.intro ||
                                '소개 내용이 없습니다.'}
                            </div>
                            <div className="intro-moreInfo">
                              <span>
                                게시글
                                <span className="color">
                                  {memberQuery?.data?.membersCount.postCount}
                                </span>
                              </span>
                              <span>
                                댓글
                                <span className="color">
                                  {memberQuery?.data?.membersCount.commentCount}
                                </span>
                              </span>
                              <button
                                className="intro-moreInfo"
                                onClick={() => {
                                  navigate(
                                    `/mypage?name=${comment?.memberName}`,
                                  );
                                }}
                              >
                                더보기
                              </button>
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
                            data-comment={
                              commentData && commentData![idx]?.content
                            }
                            style={{
                              display:
                                loginUserName === comment?.memberName
                                  ? 'block'
                                  : 'none',
                            }}
                            onClick={(): void => {
                              if (
                                !commentEditTextareaRef.current?.value &&
                                !isDeleted
                              ) {
                                dispatch(setIsEdit(idx!));

                                return;
                              }
                              dispatch(setIsEdit(idx!));
                              updateMutation({
                                postId: postId,
                                commentId: comment?.commentId,
                                content: editComment,
                              });
                            }}
                          >
                            변경
                          </li>
                        ) : (
                          <li
                            className="comment-update"
                            data-comment={
                              commentData && commentData![idx]?.content
                            }
                            style={{
                              display:
                                loginUserName == comment?.memberName
                                  ? 'block'
                                  : 'none',
                            }}
                            onClick={(
                              event: React.MouseEvent<HTMLLIElement>,
                            ): void => {
                              if (!isDeleted) {
                                dispatch(setIsEdit(idx));
                                initData(event);
                              }
                            }}
                          >
                            {isDeleted || isReported ? null : '수정'}
                          </li>
                        )}
                        {loginUserName === comment?.memberName ? (
                          <li
                            className="comment-delete"
                            style={{
                              margin:
                                loginUserName === comment?.memberName
                                  ? '3px auto 0 5px'
                                  : '3px auto 0 5px',
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
                            {isDeleted || isReported ? null : '삭제'}
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
                                ? '3px auto 0 5px'
                                : '3px auto 0 5px',
                          }}
                          onClick={(event): void => {
                            if (!isLogin) navigate('/login');
                            setIsOpenReport?.(!isOpenReport!);
                            reportTypeChecker(event);
                          }}
                        >
                          {isDeleted ? null : isReported ? null : '신고'}
                        </li>
                        {isDeleted ? null : isReported ? null : (
                          <>
                            <button
                              onClick={debounce(
                                () => {
                                  commentLiikeHandler(comment);
                                },
                                3000,
                                { leading: true },
                              )}
                            >
                              <LikeIcon checked={comment.isThumbup} />
                            </button>
                            <li className="comment-likes">
                              {comment.thumbupCount}
                            </li>
                            <button
                              onClick={debounce(
                                () => {
                                  commentDislikeHandler(comment);
                                },
                                3000,
                                { leading: true },
                              )}
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
                          <InputContainer>
                            <textarea
                              id="edit-comment"
                              className="edit-content"
                              ref={commentEditTextareaRef}
                              value={selectedComment}
                              style={{
                                display: isDeleted ? 'none' : 'flex',
                              }}
                              onChange={valueCheck}
                              onInput={handleResizeHeight}
                            ></textarea>
                          </InputContainer>
                        ) : (
                          <div
                            className="content"
                            style={{
                              color: isDeleted
                                ? '#94969b'
                                : isReported
                                ? '#94969b'
                                : ' #000000',
                            }}
                          >
                            {parse(String(comment?.content))}
                            <div className="edit-confirm">
                              {commentIsEdit && isDeleted
                                ? null
                                : commentIsEdit && isReported
                                ? null
                                : commentIsEdit
                                ? '(수정됨)'
                                : null}
                            </div>
                          </div>
                        )}
                        {comment?.replyCount !== 0 ? (
                          <ReplyBtn
                            className="isReply"
                            onClick={(): void => {
                              dispatch(setCommentId(comment.commentId));
                              setReplyPage(1);
                              if (
                                'comment' in state &&
                                state.comment?.commentId !== comment?.commentId
                              ) {
                                const open = Array.from(
                                  {
                                    length: commentQuery.data?.comments?.length,
                                  },
                                  (el) => (el = false),
                                );
                                dispatch(isOpened(open!));
                              }
                              dispatch(setIsOpened(idx!));
                            }}
                          >
                            답글
                            {comment?.replyCount
                              ? ' ' + comment?.replyCount
                              : ''}
                            개
                          </ReplyBtn>
                        ) : (
                          <ReplyBtn
                            className="noReply"
                            onClick={(): void => {
                              dispatch(setCommentId(comment.commentId));
                              if (
                                'comment' in state &&
                                state.comment?.commentId !== comment?.commentId
                              ) {
                                const open = Array.from(
                                  {
                                    length: commentQuery.data?.comments?.length,
                                  },
                                  (el) => (el = false),
                                );
                                dispatch(isOpened(open!));
                              }
                              dispatch(setIsOpened(idx!));
                            }}
                          >
                            답글{' '}
                            {comment?.replyCount ? comment?.replyCount : ''}
                          </ReplyBtn>
                        )}
                      </div>
                    </CommentContent>
                    {isSuccess && state.reply?.isOpened![idx] ? (
                      <>
                        <ReplyContainer>
                          <ReplyInput
                            commentInfo={comment!}
                            replyCnt={replyCnt!}
                            setReplyCnt={setReplyCnt!}
                            refetch={refetch}
                          ></ReplyInput>
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
                                  isOpenIntro={isOpenIntro}
                                  isCommentOpenIntro={isCommentOpenIntro}
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
              <button
                id="moreInfo"
                onClick={() => {
                  minusCommentPage();
                  scrollTo(0, 500);
                }}
              >
                《 이전 댓글
              </button>
            ) : null}
            {commentCnt! > 10 && commentCnt! / 10 > page ? (
              <button
                id="moreInfo"
                onClick={() => {
                  plusCommentPage();
                  scrollTo(0, 500);
                }}
              >
                댓글 더보기 》
              </button>
            ) : null}
          </div>
        </CommentContainer>
      )}
    </>
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
  .comment-info {
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
    align-items: flex-end;
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
    font-size: 16px;
    margin: 2px 15px 0 5px;
  }
  .created-time {
    width: 75px;
    font-size: 13px;
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
    margin: 3px 30px 0 5px;
    cursor: pointer;
  }
  .comment-report {
    width: 40px;
    font-size: 16px;
    margin: 3px 30px 0 5px;
    color: #ca0000;
    cursor: pointer;
  }
  .comment-likes {
    width: 30px;
    font-size: 16px;
    margin: 3px 15px 0 15px;
    color: var(--point-blue-color);
  }
  .comment-dislikes {
    width: 30px;
    font-size: 16px;
    margin: 3px 15px 0 15px;
    color: var(--error-red-color);
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
  .edit-confirm {
    min-width: 50px;
    font-size: 12px;
    font-weight: bold;
  }
  @media (max-width: 1100px) {
    width: 100vw;
    padding: 0 15px 0 15px;
    .comment-info {
      width: 100%;
    }
    .content {
      width: 90vw;
    }
    .nickname {
      min-width: 100px;
      width: max-content;
    }
    .image {
      min-width: 25px;
    }
    .created-time {
      min-width: 50px;
      width: max-content;
    }
    .comment-update {
      min-width: 40px;
      width: max-content;
    }
    .comment-delete {
      min-width: 40px;
      width: 100%;
      margin: 3px 15px 0 5px;
    }
    .comment-report {
      min-width: 40px;
      width: 100%;
      margin: 3px 0 0 5px;
    }
  }
`;

const IntorductionContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 45px;
  left: 20px;
  z-index: 2;
  width: 240px;
  height: 140px;
  border: 1px solid #d4d4d4;
  padding: 16px;
  border-radius: 10px;
  box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.15);
  background-color: white;
  .card-image {
    text-align: end;
    img {
      width: 42px;
      height: 42px;
      border-radius: 50%;
    }
  }
  .introduction {
    font-size: 13px;
    margin-top: 4px;
    width: 175px;
    height: 50px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .intro-moreInfo {
    span {
      font-size: 13px;
      margin-right: 6px;
      .color {
        color: var(--point-blue-color);
        margin-left: 2px;
      }
    }
  }
  button {
    font-size: 13px;
    color: var(--sub-font-color);
    :hover {
      color: var(--point-blue-color);
    }
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
  @media (max-width: 1100px) {
     {
      width: 94vw;
    }
  }
`;

const CommentContent = styled.div`
  padding-left: 50px;
  margin: 10px 0 0 0;
  display: flex;
  flex-direction: column;
  width: 720px;
  height: auto;
  padding: 0 0 15px 0;
  border-bottom: 1px solid #d4d4d4;

  .edit-content {
    width: 720px;
    font-size: 17px;
    height: 50px;
    border-bottom: 1px solid #d4d4d4;
    padding: 5px 0 0 10px;
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
  @media (max-width: 1100px) {
     {
      width: 94vw;
    }
  }
`;

const ReplyContainer = styled.div`
  width: 100%;
  height: auto;
  background-color: #ffffff;
  padding: 0 0 15px 0;
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
  }
  @media (max-width: 1100px) {
    .edit-content {
      width: 94vw;
    }
  }
`;
