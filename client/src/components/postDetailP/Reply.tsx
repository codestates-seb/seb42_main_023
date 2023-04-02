// 패키지 등
import React, { useRef, useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import styled from 'styled-components';
import parse from 'html-react-parser';
import _ from 'lodash';
import { useNavigate } from 'react-router-dom';
import { timeSince } from '../mainP/Timecalculator';
// 컴포넌트
import DislikeIcon from '../../assets/common/DislikeIcon';
import LikeIcon from '../../assets/common/LikeIcon';
// 타입
import {
  PostStateType,
  ReplyStateType,
  CommentStateType,
  ReplyProps,
  ReplyType,
  ReportProps,
} from '../../types/PostDetail';
// API
import { repliesApi } from '../../api/replyApi';
import { membersApi } from '../../api/memberapi';
// Slices
import { setReportType, setSelectedMember } from '../../slices/postSlice';
import { setCommentId } from '../../slices/commentSlice';
import { isEdit, setIsEdit, setReplyId } from '../../slices/replySlice';
import { setMemberName } from '../../slices/headerSlice';

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
  const dispatch = useAppDispatch();
  const state = useAppSelector(
    (
      state: PostStateType | ReplyStateType,
    ): PostStateType | ReplyStateType | CommentStateType => {
      return state;
    },
  );
  const navigate = useNavigate();
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

  // Textarea 값 확인
  const valueCheck = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    const data = event.target.value.replaceAll(/\n/g, '<br>');
    setEditReply(data);
    // 기존에 서버에서 저장한 상태 값에 추가로 value값을 관리함
    setSelectedReply(event.target.value);
  };

  const initData = (event: React.MouseEvent<HTMLLIElement>): void => {
    if (event.target instanceof HTMLElement) {
      const data = event.target!.dataset!.reply!;
      const parsedData = data?.replaceAll(/<br>/g, '\n');
      setSelectedReply(parsedData);
    }
  };

  // textarea 높이 조절
  const handleResizeHeight = () => {
    replyEditTextareaRef!.current!.style.height = 'auto';
    replyEditTextareaRef!.current!.style.height =
      replyEditTextareaRef.current?.scrollHeight + 'px';
  };
  // 답글
  const replyQuery = repliesApi.useGetReplyQuery({ commentId, replyPage });
  const replySucccess = replyQuery.isSuccess;
  const replyMutation = repliesApi.useUpdataReplyMutation();
  const [updateMutation] = replyMutation;
  // 게시글, 댓글 작성자 소개페이지 오픈 여부
  const isOpenCommentIntro = isCommentOpenIntro;
  const isOpenPostIntro = isOpenIntro;

  // 답글 좋아요 추가, 삭제
  const addThumbUpMutation = repliesApi.useAddRplyThumbUpMutation();
  const [addThumbUp] = addThumbUpMutation;
  const removeThumbUpMutation = repliesApi.useRemoveRplyThumbUpMutation();
  const [removeThumbUp] = removeThumbUpMutation;
  // 답글 싫어요  추가, 삭제
  const addThumbDownMutation = repliesApi.useAddRplyThumbDownMutation();
  const [addThumbDown] = addThumbDownMutation;
  const removeThumbDownMutation = repliesApi.useRemoveRplyThumbDownMutation();
  const [removeThumbDown] = removeThumbDownMutation;

  //  멤버 정보 조회
  const memberQuery = membersApi.useGetMemberQuery({ name: selectedMember });

  // 답글 정보 받아오기
  useEffect(() => {
    setReplyData(replyQuery.data?.replies);
  }, [replyQuery.data]);

  // 답글 수정 여부
  const replyIsEdit =
    replyInfo?.createdAt !== replyInfo?.modifiedAt ? true : false;
  // 답글 좋아요 클릭 함수
  const ReplyLiikeHandler = (reply: ReplyType): void => {
    const replyId = reply.replyId;
    if (reply?.isThumbup && !reply?.isThumbdown) {
      removeThumbUp({ replyId });
      return;
    }
    // 싫어요만 있는 경우
    if (!reply?.isThumbup && reply?.isThumbdown) {
      removeThumbDown({ replyId });
      setTimeout(() => {
        addThumbUp({ replyId });
      }, 500);

      return;
    }
    // 둘 다 없는 경우
    if (!reply?.isThumbdown && !reply?.isThumbdown) {
      addThumbUp({ replyId });
      return;
    }
  };

  // 답글 싫어요 클릭 함수
  const ReplyDislikeHandler = (reply: ReplyType): void => {
    const replyId = reply.replyId;
    // 좋아요만 있는 경우
    if (reply?.isThumbup && !reply?.isThumbdown) {
      // 좋아요 제거, 싫어요 추가

      removeThumbUp({ replyId });
      setTimeout(() => {
        addThumbDown({ replyId });
      }, 500);
      return;
    }
    // 싫어요만 있는 경우
    if (!reply?.isThumbup && reply?.isThumbdown) {
      // 싫어요 제거

      removeThumbDown({ replyId });
      return;
    }
    // 둘 다 없는 경우
    if (!reply?.isThumbup && !reply?.isThumbdown) {
      // 싫어요 추가

      addThumbDown({ replyId });
      return;
    }
  };
  // 답글 Edit 여부 확인을 위한 배열 생성
  if (
    replyQuery.isSuccess &&
    (state as ReplyStateType).reply.isEdit === undefined
  ) {
    const edit = Array.from(
      { length: replyQuery.data?.replies.length },
      (el) => (el = false),
    );

    dispatch(isEdit(edit as Array<boolean>));
  }

  // 삭제 확인 모달창
  const confirmDeleteHandler = (): void => {
    setIsOpenDelete?.(!isOpenDelete!);
  };

  const deleteTypeChecker = (event: React.MouseEvent<HTMLElement>) => {
    if (event.target instanceof HTMLElement) {
      setDeleteType?.(event.target.id);
    }
  };

  // 소개 페이지 오픈
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

  // 신고 카테고리 확인
  const reportTypeChecker = (event: React.MouseEvent<HTMLElement>): void => {
    if (event.target instanceof HTMLElement) {
      dispatch(setReplyId(Number(event.target.dataset.replyid)));
      dispatch(setReportType(event.target.dataset.category!));
    }
  };
  // 시간 계산
  const time = timeSince(replyInfo!.createdAt);

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
                    dispatch(setMemberName(replyInfo?.memberName));
                    navigate('/mypage');
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
          state.reply.isEdit[idx!] ? (
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
                  replyId: replyInfo.replyId,
                  content: editReply,
                });
              }}
            >
              {replyInfo.content === '삭제된 답글입니다.' ||
              replyInfo.content === '신고된 답글입니다.'
                ? null
                : '변경'}
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
              {replyInfo?.content === '삭제된 답글입니다.' ||
              replyInfo?.content === '신고된 답글입니다.'
                ? null
                : '수정'}
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
              {replyInfo?.content === '삭제된 답글입니다.' ||
              replyInfo?.content === '신고된 답글입니다.'
                ? null
                : '삭제'}
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
              setIsOpenReport?.(!isOpenReport);
              reportTypeChecker(event);
            }}
          >
            {replyInfo?.content === '삭제된 답글입니다.'
              ? null
              : replyInfo?.content === '신고된 답글입니다.'
              ? null
              : '신고'}
          </li>
          {replyInfo?.content ===
          '삭제된 답글입니다.' ? null : replyInfo?.content ===
            '신고된 답글입니다.' ? null : (
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
        replyInfo!.replyId === replyId &&
        state.reply?.isEdit[idx!] ? (
          // 댓글 수정 시 생기는 textarea
          <InputWrap>
            <textarea
              id="edit-reply"
              className="edit-reply"
              ref={replyEditTextareaRef}
              value={selectedReply}
              onChange={valueCheck}
              onInput={handleResizeHeight}
            ></textarea>
          </InputWrap>
        ) : (
          <div
            className="reply-content"
            style={{
              color:
                replyInfo?.content === '삭제된 답글입니다.'
                  ? '#94969b'
                  : replyInfo?.content === '신고된 답글입니다.'
                  ? '#94969b'
                  : '#000000',
            }}
          >
            {parse(String(replyInfo?.content))}

            <div className="edit-confirm">
              {replyIsEdit && replyInfo?.content === '삭제된 답글입니다.'
                ? null
                : replyIsEdit && replyInfo?.content === '신고된 답글입니다.'
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

const InputWrap = styled.div`
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
