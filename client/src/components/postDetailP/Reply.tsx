import React, { useRef, useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import styled from 'styled-components';
import parse from 'html-react-parser';
import _ from 'lodash';
import { useNavigate } from 'react-router-dom';
import { getTimeSince } from '../../util/timeCalculator';
import DislikeIcon from '../../assets/common/DislikeIcon';
import LikeIcon from '../../assets/common/LikeIcon';
import { ReplyProps, ReplyType, ReportProps } from '../../types/Post';
import { repliesApi } from '../../api/replyApi';
import { membersApi } from '../../api/membersApi';
import { setReportType, setSelectedMember } from '../../slices/postSlice';
import { setCommentId } from '../../slices/commentSlice';
import { isEdit, setIsEdit, setReplyId } from '../../slices/replySlice';
import { checkIsLogin } from '../../util/checkIsLogin';

const Reply: React.FC<Partial<ReplyProps & ReportProps>> = ({
  replyInfo,
  idx,
  replyPage,
  setIsOpenReport,
  setIsOpenDelete,
  setDeleteType,
  isOpenReport,
  isOpenDelete,
  isOpenIntro,
  isCommentOpenIntro,
  isReplyOpenIntro,
  setIsOpenReplyIntro,
}: Partial<ReplyProps & ReportProps>) => {
  const isLogin = checkIsLogin();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state);

  const [editReply, setEditReply] = useState<string>('');
  const [replyData, setReplyData] = useState<Array<ReplyType>>([]);
  const [selectedReply, setSelectedReply] = useState<string>('');
  const loginUserName = window.localStorage.getItem('name');
  const commentId = 'comment' in state && state.comment?.commentId;
  const replyId = 'reply' in state && state.reply?.replyId;
  const selectedMember = 'post' in state ? state.post.selectedMember : null;
  const replyTextarea = document.getElementById(
    'edit-reply',
  ) as HTMLTextAreaElement;
  const replyEditTextareaRef = useRef<HTMLTextAreaElement>(replyTextarea);

  const valueCheck = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    const data = event.target.value.replaceAll(/\n/g, '<br>');
    setEditReply(data);
    setSelectedReply(event.target.value);
  };

  const initData = (event: React.MouseEvent<HTMLLIElement>): void => {
    if (event.target instanceof HTMLElement) {
      const data = event.target!.dataset!.reply!;
      const parsedData = data?.replaceAll(/<br>/g, '\n');
      setSelectedReply(parsedData);
    }
  };

  const handleResizeHeight = () => {
    replyEditTextareaRef!.current!.style.height = 'auto';
    replyEditTextareaRef!.current!.style.height =
      replyEditTextareaRef.current?.scrollHeight + 'px';
  };
  const replyQuery = repliesApi.useGetReplyQuery({ commentId, replyPage });
  const replySucccess = replyQuery.isSuccess;
  const replyMutation = repliesApi.useUpdataReplyMutation();
  const [updateMutation] = replyMutation;
  const isOpenCommentIntro = isCommentOpenIntro;
  const isOpenPostIntro = isOpenIntro;
  const addThumbUpMutation = repliesApi.useAddReplyThumbUpMutation();
  const [addThumbUp] = addThumbUpMutation;
  const removeThumbUpMutation = repliesApi.useDeleteReplyThumbUpMutation();
  const [deleteThumbUp] = removeThumbUpMutation;
  const addThumbDownMutation = repliesApi.useAddReplyThumbDownMutation();
  const [addThumbDown] = addThumbDownMutation;
  const removeThumbDownMutation = repliesApi.useDeleteReplyThumbDownMutation();
  const [deleteThumbDown] = removeThumbDownMutation;
  const memberQuery = membersApi.useGetMemberQuery({ name: selectedMember });

  useEffect(() => {
    setReplyData(replyQuery.data?.replies);
  }, [replyQuery.data]);

  const replyIsEdit =
    replyInfo?.createdAt !== replyInfo?.modifiedAt ? true : false;
  const ReplyLiikeHandler = (reply: ReplyType): void => {
    if (!isLogin) {
      navigate('/login');
      return;
    }
    const replyId = reply.replyId;
    if (reply?.isThumbup && !reply?.isThumbdown) {
      deleteThumbUp({ replyId });
      return;
    }
    if (!reply?.isThumbup && reply?.isThumbdown) {
      deleteThumbDown({ replyId });
      setTimeout(() => {
        addThumbUp({ replyId });
      }, 500);

      return;
    }
    if (!reply?.isThumbdown && !reply?.isThumbdown) {
      addThumbUp({ replyId });
      return;
    }
  };

  const ReplyDislikeHandler = (reply: ReplyType): void => {
    if (!isLogin) navigate('/login');
    const replyId = reply.replyId;
    if (reply?.isThumbup && !reply?.isThumbdown) {
      deleteThumbUp({ replyId });
      setTimeout(() => {
        addThumbDown({ replyId });
      }, 500);
      return;
    }
    if (!reply?.isThumbup && reply?.isThumbdown) {
      deleteThumbDown({ replyId });
      return;
    }
    if (!reply?.isThumbup && !reply?.isThumbdown) {
      addThumbDown({ replyId });
      return;
    }
  };
  if (replyQuery.isSuccess && state.reply?.isEdit === undefined) {
    const edit = Array.from(
      { length: replyQuery.data?.replies.length },
      (el) => (el = false),
    );

    dispatch(isEdit(edit as Array<boolean>));
  }

  const confirmDeleteHandler = (): void => {
    setIsOpenDelete?.(!isOpenDelete!);
  };

  const deleteTypeChecker = (event: React.MouseEvent<HTMLElement>) => {
    if (event.target instanceof HTMLElement) {
      setDeleteType?.(event.target.id);
    }
  };

  const IntroHandler = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();

    if (
      !isOpenPostIntro &&
      !isOpenCommentIntro &&
      'reply' in state &&
      event.target instanceof HTMLElement
    ) {
      setIsOpenReplyIntro?.(!isReplyOpenIntro);
      dispatch(setReplyId(Number(event.target.dataset.replyid)));
      dispatch(setSelectedMember(event.target.id));
    }
  };

  const outClickIntroHandler = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    if (event.target instanceof HTMLElement) {
      setIsOpenReplyIntro?.(false);
    }
  };

  const reportTypeChecker = (event: React.MouseEvent<HTMLElement>): void => {
    if (event.target instanceof HTMLElement) {
      dispatch(setReplyId(Number(event.target.dataset.replyid)));
      dispatch(setReportType(event.target.dataset.category!));
    }
  };
  const time = getTimeSince(replyInfo!.createdAt);
  const isDeleted = replyInfo?.content === '삭제된 답글입니다.';
  const isReported = replyInfo?.content === '신고된 답글입니다.';
  return (
    <ReplyContainer onClick={outClickIntroHandler}>
      <ReplyInfo key={replyInfo?.replyId}>
        <ul className="reply-info">
          <li className="image" onClick={IntroHandler}>
            <img
              src={replyInfo && replyInfo.memberImage}
              id={replyInfo?.memberName}
              data-img={replyInfo?.memberImage}
              data-replyid={replyInfo?.replyId}
            ></img>
          </li>
          {'reply' in state &&
          isReplyOpenIntro &&
          replyInfo?.replyId === state.reply?.replyId ? (
            <IntorductionContainer>
              <div className="card-image">
                <img src={replyInfo?.memberImage}></img>
              </div>
              <div>{replyInfo?.memberName}</div>
              <div className="introduction">
                {memberQuery?.data?.member.intro || '소개 내용이 없습니다.'}
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
                    navigate(`/mypage?name=${replyInfo!.memberName}`);
                  }}
                >
                  더보기
                </button>
              </div>
            </IntorductionContainer>
          ) : null}

          <li className="nickname">{replyInfo && replyInfo.memberName}</li>
          <li className="reply-created-time">{time} 전</li>
          {'reply' in state &&
          replyInfo?.replyId === replyId &&
          ((replySucccess && state.reply.isEdit !== undefined) || null) &&
          state.reply!.isEdit![idx!] ? (
            <li
              className="reply-update"
              id="edit"
              data-reply={replyData && replyData![idx!]?.content}
              style={{
                display:
                  loginUserName === replyInfo?.memberName ? 'block' : 'none',
              }}
              onClick={(): void => {
                if (!replyEditTextareaRef.current?.value) {
                  dispatch(setIsEdit(idx!));
                  return;
                }
                dispatch(setIsEdit(idx!));
                updateMutation({
                  replyId: replyInfo!.replyId,
                  content: editReply,
                });
              }}
            >
              {isDeleted || isReported ? null : '변경'}
            </li>
          ) : (
            <li
              className="reply-update"
              data-reply={replyData && replyData![idx!]?.content}
              style={{
                display:
                  loginUserName === replyInfo?.memberName ? 'block' : 'none',
              }}
              onClick={(event: React.MouseEvent<HTMLLIElement>): void => {
                dispatch(setCommentId(replyInfo!.commentId));
                dispatch(setReplyId(replyInfo!.replyId));
                dispatch(setIsEdit(idx!));
                initData(event);
              }}
            >
              {isDeleted || isReported ? null : '수정'}
            </li>
          )}
          {loginUserName === replyInfo?.memberName ? (
            <li
              className="reply-delete"
              id="답글"
              style={{
                margin:
                  loginUserName === replyInfo?.memberName
                    ? '3px 119px 0 5px'
                    : '3px 195px 0 5px',
              }}
              onClick={(event: React.MouseEvent<HTMLElement>) => {
                dispatch(setReplyId(replyInfo?.replyId));
                deleteTypeChecker(event);
                confirmDeleteHandler();
              }}
            >
              {isDeleted || isReported ? null : '삭제'}
            </li>
          ) : null}

          <li
            className="reply-report"
            data-category="reply"
            data-replyid={String(replyInfo?.replyId)}
            style={{
              display:
                loginUserName === replyInfo?.memberName ? 'none' : 'block',
              margin:
                loginUserName === replyInfo?.memberName
                  ? '3px 148px 0 5px'
                  : '3px 228px 0 5px',
            }}
            onClick={(event): void => {
              if (!isLogin) navigate('/login');
              setIsOpenReport?.(!isOpenReport);
              reportTypeChecker(event);
            }}
          >
            {isDeleted ? null : isReported ? null : '신고'}
          </li>
          {isDeleted ? null : isReported ? null : (
            <>
              <button
                onClick={_.debounce(
                  () => {
                    ReplyLiikeHandler(replyInfo!);
                  },
                  3000,
                  { leading: true },
                )}
                style={{
                  margin:
                    loginUserName === replyInfo?.memberName ? '0' : '0 0 0 7px',
                }}
              >
                <LikeIcon checked={replyInfo!.isThumbup} />
              </button>
              <li className="reply-likes">{replyInfo?.thumbupCount}</li>
              <button
                onClick={_.debounce(
                  () => {
                    ReplyDislikeHandler(replyInfo!);
                  },
                  3000,
                  { leading: true },
                )}
              >
                <DislikeIcon checked={replyInfo!.isThumbdown} />
              </button>
              <li className="reply-dislikes">{replyInfo?.thumbDownCount}</li>
            </>
          )}
        </ul>
      </ReplyInfo>
      <ReplyContent>
        {'reply' in state &&
        replyInfo?.replyId === replyId &&
        state.reply!.isEdit![idx!] ? (
          <InputContainer>
            <textarea
              id="edit-reply"
              className="edit-reply"
              ref={replyEditTextareaRef}
              value={selectedReply}
              onChange={valueCheck}
              onInput={handleResizeHeight}
            ></textarea>
          </InputContainer>
        ) : (
          <div
            className="reply-content"
            style={{
              color: isDeleted ? '#94969b' : isReported ? '#94969b' : '#000000',
            }}
          >
            {parse(String(replyInfo?.content))}

            <div className="edit-confirm">
              {replyIsEdit && isDeleted
                ? null
                : replyIsEdit && isReported
                ? null
                : replyIsEdit
                ? '(수정됨)'
                : null}
            </div>
          </div>
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
  height: auto;
  margin: 5px 0 0 50px;
  padding: 15px 0 0 0;
  border-bottom: 1px solid #d4d4d4;
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
    position: relative;
  }
  .reply-content {
    display: flex;
    align-items: flex-end;
    width: 600px;
    height: auto;
    display: flex;
    justify-content: flex-start;
    word-break: break-all;
    font-size: 17px;
  }
  .nickname {
    width: 130px;
    font-size: 16px;
    margin: 2px 15px 0 5px;
    font-size: 17px;
  }
  .reply-created-time {
    width: 75px;
    font-size: 16px;
    margin: 3px 15px 0 5px;
    color: #94969b;
  }
  .reply-update {
    width: 40px;
    font-size: 16px;
    margin: 3px 15px 0 15px;
    cursor: pointer;
  }
  .reply-delete {
    width: 40px;
    font-size: 16px;
    margin: 3px 15px 0 5px;
    cursor: pointer;
  }
  .reply-report {
    width: 40px;
    font-size: 16px;
    margin: 3px 110px 0 5px;
    color: #ca0000;
    cursor: pointer;
  }
  .reply-likes {
    width: 30px;
    font-size: 16px;
    margin: 3px 15px 0 15px;
    color: var(--point-blue-color);
  }
  .reply-dislikes {
    width: 30px;
    font-size: 16px;
    margin: 3px 15px 0 15px;
    color: var(--error-red-color);
  }

  #moreInfo {
    margin: 50px 0 0 0px;
    text-align: left;
    font-size: 16px;
    font-weight: 450;
    cursor: pointer;
  }
  .edit-confirm {
    font-size: 12px;
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

const ReplyInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  height: auto;
  width: 100%;
  height: 30px;
`;

const ReplyContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px 0 0 0;
  margin: 0px 0 20px 15px;
  width: 660px;
  height: auto;
  font-size: 17px;

  .edit-reply {
    width: 655px;
    font-size: 17px;
    height: 50px;
    border-bottom: 1px solid #d4d4d4;

    ::placeholder {
      color: #0275e1;
    }
  }
`;

const InputContainer = styled.div`
  display: flex;
  textarea {
    box-sizing: border-box;
    width: 650px;
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
