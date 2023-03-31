import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import CommentInput from '../components/postDetailP/CommentInput';
import Comment from '../components/postDetailP/Comment';
import RecommendedPost from '../components/postDetailP/RecommendedPost';
import BookmarkIcon from '../assets/common/BookmarkIcon';
import TimeIcon from '../assets/common/TimeIcon';
import ViewIcon from '../assets/common/ViewIcon';
import CommentIcon from '../assets/common/CommentIcon';
import DislikeIcon from '../assets/common/DislikeIcon';
import LikeIcon from '../assets/common/LikeIcon';
import DropdownButton from '../components/postDetailP/DropdownButton';
import { BlueBtn, WhiteBtn } from '../components/common/Btn';
import { ReactComponent as CheckedIcon } from '../assets/checked.svg';
import { ReactComponent as NoCheckedIcon } from '../assets/noChecked.svg';
import {
  setIsOpenFilter,
  setReportOption,
  setSelectedMember,
} from '../slices/postSlice';
import { setReportErr } from '../slices/validationSlice';
import { setMemberName } from '../slices/headerSlice';
import { useAppDispatch, useAppSelector } from '../hooks';
import {
  PostStateType,
  CommentStateType,
  ReplyStateType,
  ValidationStateType,
} from '../types/PostDetail';
import { useParams, useNavigate } from 'react-router';
import { repliesApi } from '../api/replyApi';
import { postsApi } from '../api/postApi';
import { reportApi } from '../api/reportApi';
import { commentsApi } from '../api/commentApi';
import { timeSince } from '../components/mainP/Timecalculator';
import { membersApi } from '../api/memberapi';
import _ from 'lodash';
import parse from 'html-react-parser';
import Tag from '../components/postDetailP/Tag';

const reportOption = [
  '영리목적/홍보성',
  '저작권침해',
  '음란성/선정성',
  '욕설/인신공격',
  '개인정보노출',
  '도배',
  '기타',
];

const PostDetail: React.FC = () => {
  const [isLike, setIsLike] = useState<boolean>();
  const [isDislike, setIsDislike] = useState<boolean>();
  const [isBookmark, setBookmark] = useState<boolean>();
  const [like, setLike] = useState<number>();
  const [dislike, setDislike] = useState<number>();
  const [views, setViews] = useState<number>();
  const [commentCnt, setCommentCnt] = useState<number>();
  const [checkedElement, setCheckedElement] = useState(-1);
  // 신고, 삭제, 소개
  const [isOpenReport, setIsOpenReport] = useState<boolean>(false);
  const [isOpenReportErr] = useState<boolean>(false);
  // const [isOpenFilter, setIsOpenFilter] = useState<boolean>(false);
  const [isOpenDelete, setIsOpenDelete] = useState<boolean>(false);
  const [deleteType, setDeleteType] = useState<string>('');
  const [isOpenIntro, setIsOpenIntro] = useState<boolean>(false);
  const [isOpenCommentIntro, setIsOpenCommentIntro] = useState<boolean>(false);
  const [isOpenReplyIntro, setIsOpenReplyIntro] = useState<boolean>(false);

  const handleSelectChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedElement(Number(event.target.value));
    dispatch(setReportOption(event.target.id));
  };

  const handleSelected = (event: React.MouseEvent<HTMLButtonElement>) => {
    setCheckedElement(Number(event.currentTarget.value));

    dispatch(
      setReportOption(
        String(event.currentTarget?.parentElement?.children[0].id),
      ),
    );
  };

  const reportTextRef = useRef<HTMLTextAreaElement>(null);
  const dispatch = useAppDispatch();
  const state = useAppSelector(
    (
      state:
        | PostStateType
        | CommentStateType
        | ReplyStateType
        | ValidationStateType,
    ):
      | PostStateType
      | CommentStateType
      | ReplyStateType
      | ValidationStateType => {
      return state;
    },
  );

  const navigate = useNavigate();
  const params = useParams();
  const postId = Number(params.postId);
  const commentId = 'comment' in state ? state.comment?.commentId : null;
  const replyId = 'reply' in state ? state.reply?.replyId : null;
  const reportReason = 'post' in state ? state.post.reportOption : null;
  const reportErr = 'validation' in state ? state.validation.reportErr : null;
  const selectedMember = 'post' in state ? state.post.selectedMember : null;
  const loginUserName = window.localStorage.getItem('name');

  // 게시글 조회 및 추가
  const postDetailQuery = postsApi.useGetPostQuery({ postId });
  const { data, isSuccess, refetch } = postDetailQuery;
  const [deletePost] = postsApi.useDeletePostMutation();
  // 게시글 좋아요 추가, 삭제
  const [addThumbUp] = postsApi.useAddPostThumbUpMutation();
  const [removeThumbUp] = postsApi.useRemovePostThumbUpMutation();
  // 게시글 싫어요  추가, 삭제
  const [addThumbDown] = postsApi.useAddPostThumbDownMutation();
  const [removeThumbDown] = postsApi.useRemovePostThumbDownMutation();
  // 북마크 추가, 삭제
  const [addBookmark] = postsApi.useAddBookmarkMutation();
  const [removeBookmark] = postsApi.useRemoveBookmarkMutation();

  // 댓글 삭제
  const [deleteComment] = commentsApi.useDeleteCommentMutation();
  // 답글 삭제
  const [deleteReply] = repliesApi.useDeleteReplyMutation();
  // 신고 추가
  const [sendReport] = reportApi.usePostReportMutation();
  //  멤버 정보 조회
  const memberQuery = membersApi.useGetMemberQuery(
    { name: selectedMember },
    {
      skip: !selectedMember,
    },
  );

  // 시간 계산
  const time = timeSince(isSuccess && data?.createdAt);
  // 게시글 수정 여부
  const isEdit = data?.modifiedAt !== data?.createdAt ? true : false;

  //파싱된 데이터
  const parsedData = parse(String(data?.content));

  // 삭제 문구
  const deleteConfirm = `${deleteType}을 정말 삭제하시겠습니까?`;

  // 게시글 서버 데이터 저장
  // 데이터 받아서 로컬 스테이트로 저장 ( 댓글, 좋아요, 싫어요, 북마크)
  useEffect(() => {
    if (isSuccess) setIsLike(data?.isThumbup);
    if (isSuccess) setIsDislike(data?.isThumbdown);
    if (isSuccess) setLike(data?.thumbupCount);
    if (isSuccess) setDislike(data?.thumbDownCount);
    if (isSuccess) setBookmark(data?.isBookmarked);
    if (isSuccess) setViews(data?.viewCount);
    if (isSuccess) setCommentCnt(data?.commentCount);
  }, [data]);

  // 페이지 이동 시 스크롤 최상단 이동
  useEffect(() => {
    if ('post' in state && state.post.isOpenFilter) {
      dispatch(setIsOpenFilter(true));
    }
    scrollTo(0, 0);
    refetch();
  }, [postId]);

  // 좋아요 클릭 함수
  const changeLiikeHandler = (): void => {
    // 좋아요만 있는 경우
    if (loginUserName) {
      if (isLike && !isDislike) {
        removeThumbUp({ postId });
        setIsLike(false);
        setLike((prev) => prev! - 1);
        return;
      }
      // 싫어요만 있는 경우
      if (!isLike && isDislike) {
        removeThumbDown({ postId });
        setIsDislike(false);
        setDislike((prev) => prev! - 1);
        addThumbUp({ postId });
        setIsLike(true);
        setLike((prev) => prev! + 1);

        return;
      }
      // 둘 다 없는 경우
      if (!isLike && !isDislike) {
        addThumbUp({ postId });
        setIsLike(true);
        setLike((prev) => prev! + 1);
        return;
      }
    }
  };

  // 싫어요 클릭 함수
  const changeDislikeHandler = (): void => {
    if (loginUserName) {
      // 좋아요만 있는 경우
      if (isLike && !isDislike) {
        // 좋아요 제거, 싫어요 추가
        removeThumbUp({ postId });
        setIsLike(false);
        setLike((prev) => prev! - 1);
        addThumbDown({ postId });
        setIsDislike(true);
        setDislike((prev) => prev! + 1);

        return;
      }
      // 싫어요만 있는 경우
      if (!isLike && isDislike) {
        // 싫어요 제거
        removeThumbDown({ postId });
        setIsDislike(false);
        setDislike((prev) => prev! - 1);
        return;
      }
      // 둘 다 없는 경우
      if (!isLike && !isDislike) {
        // 싫어요 추가
        addThumbDown({ postId });
        setIsDislike(true);
        setDislike((prev) => prev! + 1);
        return;
      }
    }
  };
  // 북마크 클릭 함수
  const changeBookmarkHandler = (): void => {
    if (loginUserName) {
      if (isBookmark) {
        setBookmark(false);
        removeBookmark({ loginUserName, postId });
      } else {
        setBookmark(true);
        addBookmark({ loginUserName, postId });
      }
    }
  };

  // 삭제 확인 모달창 오픈
  const confirmDeleteHandler = (): void => {
    setIsOpenDelete(!isOpenDelete);
  };
  // 신고 모달창 오픈
  const reportHandler = (): void => {
    setIsOpenReport(!isOpenReport);
  };

  // 데이터 삭제(게시글, 댓글, 답글)
  const deleteData = (): void => {
    // 게시글 삭제 로직
    if (deleteType === '게시글') {
      deletePost({ postId });
      confirmDeleteHandler();

      navigate('/');
    }
    // 댓글 삭제 로직
    if (deleteType === '댓글') {
      deleteComment({ commentId });
      confirmDeleteHandler();
    }
    // 답글 삭제 로직
    if (deleteType === '답글') {
      deleteReply({ replyId });
      confirmDeleteHandler();
    }
  };

  // 드롭다운 클로즈
  const handleClickOutside = (event: MouseEvent) => {
    if ('post' in state && state.post?.isOpenFilter) {
      dispatch(setIsOpenFilter('post' in state && state.post?.isOpenFilter));
    } else {
      return;
    }
  };

  const outClickIntroHandler = (event: React.MouseEvent<HTMLElement>) => {
    if (
      isOpenIntro &&
      !isOpenReplyIntro &&
      !isOpenCommentIntro &&
      event.target instanceof HTMLElement
    ) {
      setIsOpenIntro(false);
    }
  };

  // 신고 보내기
  const sendReportHandler = (): void => {
    // 유효성 검사
    if ('validation' in state && state.validation?.reportErr) return;
    if ('post' in state && !state.post?.reportOption) return;
    if (reportTextRef.current?.value === '') return;

    // 게시물 신고
    if ('post' in state && state.post?.reportType === 'post') {
      sendReport({
        reportReason: reportReason,
        description: reportTextRef.current?.value,
        targetType: 'post',
        postId: Number(postId),
        commentId: null,
        replyId: null,
        reporterName: localStorage.getItem('name'),
      })
        .unwrap()
        .then(() => {
          alert('신고가 접수 되었습니다.');
        })
        .catch(() => alert('실패했습니다.'));

      setIsOpenReport(isOpenReportErr);
      dispatch(setReportErr(''));
      setCheckedElement(-1);
    }

    // 댓글 신고
    if ('post' in state && state.post?.reportType === 'comment') {
      sendReport({
        reportReason: reportReason,
        description: reportTextRef.current?.value,
        targetType: 'comment',
        postId: null,
        commentId: commentId,
        replyId: null,
        reporterName: loginUserName,
      })
        .unwrap()
        .then(() => {
          alert('신고가 접수 되었습니다.');
        })
        .catch(() => alert('실패했습니다.'));

      setIsOpenReport(isOpenReportErr);
      dispatch(setReportErr(''));
      setCheckedElement(-1);
    }

    // 답글 신고
    if ('post' in state && state.post.reportType === 'reply') {
      sendReport({
        reportReason: reportReason,
        description: reportTextRef.current?.value,
        targetType: 'reply',
        postId: null,
        commentId: null,
        replyId: replyId,
        reporterName: loginUserName,
      })
        .unwrap()
        .then(() => {
          alert('신고가 접수 되었습니다.');
        })
        .catch(() => alert('실패했습니다.'));

      setIsOpenReport(isOpenReportErr);
      dispatch(setReportErr(''));
      setCheckedElement(-1);
    }
  };

  //  신고 유효성 검사
  const validationTest = (): void => {
    const reportValue = reportTextRef.current?.value;

    if ('post' in state && !state.post?.reportOption) {
      dispatch(setReportErr('신고 이유를 선택해 주세요'));
    }
    if (reportValue?.length === 0) {
      dispatch(setReportErr('신고 내용을 작성해 주세요.'));
    }
    if (reportValue) {
      if (reportValue.length < 10 || reportValue.length > 40) {
        dispatch(setReportErr('신고내용은 10자 이상 40자 이하이어야 합니다. '));
      } else {
        dispatch(setReportErr(''));
      }
    }
  };

  // 소개페이지 명함
  const IntroHandler = (event: React.MouseEvent<HTMLElement>) => {
    if (
      !isOpenCommentIntro &&
      !isOpenReplyIntro &&
      event.target instanceof HTMLElement
    ) {
      setIsOpenIntro(!isOpenIntro);
      dispatch(setSelectedMember(event.target.id));
    }
  };

  return (
    <>
      {isOpenDelete ? (
        <ModalContainer>
          <DeleteModal>
            <div onClick={confirmDeleteHandler}> </div>
            <div className="delete">삭제</div>
            <div className="delete-content">{deleteConfirm}</div>
            <BtnContainer>
              <DeleteBtn onClick={deleteData}>삭제하기</DeleteBtn>
              <CancelBtn onClick={confirmDeleteHandler}>취소</CancelBtn>
            </BtnContainer>
          </DeleteModal>
        </ModalContainer>
      ) : null}

      {isOpenReport ? (
        <ModalContainer>
          <ReportModal>
            <div className="report">신고</div>
            <div className="report-detail">
              신고는 반대 의견을 표시하는 기능이 아닙니다.
            </div>
            <div className="select">
              {reportOption.map((option, idx) => {
                return (
                  <div key={option}>
                    <input
                      type="radio"
                      id={option}
                      name="report"
                      value={idx}
                      checked={checkedElement === idx}
                      onChange={handleSelectChange}
                    />

                    {checkedElement === idx ? (
                      <button
                        id={option}
                        value={idx}
                        onClick={(event): void => {
                          handleSelected(event);
                          setCheckedElement(-1);
                        }}
                      >
                        <CheckedIcon width={30} height={30} />
                      </button>
                    ) : (
                      <button
                        id={option}
                        value={idx}
                        onClick={(event) => {
                          handleSelected(event);
                          setCheckedElement(idx);
                        }}
                      >
                        <NoCheckedIcon width={30} height={30} />
                      </button>
                    )}
                    <label className="option" htmlFor={option}>
                      {option}
                    </label>
                  </div>
                );
              })}
            </div>
            <textarea
              ref={reportTextRef}
              className="report-content"
              placeholder="신고할 내용을 작성해주세요."
              onChange={validationTest}
            ></textarea>
            <Error>{reportErr}</Error>
            <BtnContainer>
              <CancelBtn
                onClick={(): void => {
                  setCheckedElement(-1);
                  dispatch(setReportOption(''));
                  dispatch(setReportErr(''));
                  reportHandler();
                }}
              >
                취소
              </CancelBtn>
              <SendReportBtn
                onClick={(): void => {
                  sendReportHandler();
                }}
              >
                신고하기
              </SendReportBtn>
            </BtnContainer>
          </ReportModal>
        </ModalContainer>
      ) : null}

      <Container onClick={handleClickOutside}>
        <PostContainer onClick={outClickIntroHandler}>
          <div className="post-title">
            <h1>{data?.title}</h1>
            {isEdit ? <p>(수정됨)</p> : null}
          </div>
          <PostInfo>
            <ul className="post-info">
              <li className="image" onClick={IntroHandler}>
                <img src={data?.memberImage} id={data?.memberName}></img>
              </li>
              {isSuccess && isOpenIntro ? (
                <IntorductionContainer>
                  <IntroInfo>
                    <ul className="intro-content-info">
                      <li className="image">
                        <img src={data?.memberImage}></img>
                      </li>
                      <li className="intro-nickname">{data?.memberName}</li>
                    </ul>
                  </IntroInfo>
                  <label className="introduction">
                    {memberQuery?.data?.member.intro || '소개 내용이 없습니다.'}
                  </label>
                  <button
                    className="intro-moreInfo"
                    onClick={() => {
                      dispatch(setMemberName(data?.memberName));
                      navigate('/mypage');
                    }}
                  >
                    더보기 》
                  </button>
                </IntorductionContainer>
              ) : null}

              <li className="nickname">{data?.memberName}</li>
              <TimeIcon />
              <li className="created-time">{time} 전</li>
              <ViewIcon />
              <li className="views">{views}</li>
              <CommentIcon checked={true} />
              <li className="comments">{commentCnt}</li>
              <Bookmark
                className="bookmark"
                onClick={_.throttle(() => {
                  changeBookmarkHandler();
                }, 300)}
              >
                <BookmarkIcon checked={isBookmark!} />
              </Bookmark>
              {loginUserName ? (
                <DropdownButton
                  memberName={data?.memberName}
                  isOpenReport={isOpenReport}
                  setIsOpenReport={setIsOpenReport}
                  isOpenDelete={isOpenDelete}
                  setIsOpenDelete={setIsOpenDelete}
                  setDeleteType={setDeleteType}
                ></DropdownButton>
              ) : null}
            </ul>
          </PostInfo>
          <PostContent>
            <div>{parsedData}</div>
            <ul className="post-info">
              <TagConatiner>
                {data?.tags?.map((tag: string, idx: number) => {
                  return <Tag key={idx} content={tag}></Tag>;
                })}
              </TagConatiner>
              <button
                onClick={_.debounce(
                  () => {
                    changeLiikeHandler();
                  },
                  3000,
                  { leading: true },
                )}
              >
                <LikeIcon checked={isLike!} />
              </button>
              <li className="likes">{like!}</li>
              <button
                onClick={_.debounce(
                  () => {
                    changeDislikeHandler();
                  },
                  3000,
                  { leading: true },
                )}
              >
                <DislikeIcon checked={isSuccess && isDislike!} />
              </button>
              <li className="dislikes">{isSuccess && dislike!}</li>
            </ul>
            <CommentInput
              commentCnt={commentCnt!}
              setCommentCnt={setCommentCnt!}
            ></CommentInput>
            <Comment
              commentCnt={commentCnt!}
              setIsOpenReport={setIsOpenReport!}
              setIsOpenDelete={setIsOpenDelete!}
              setDeleteType={setDeleteType!}
              setIsOpenCommentIntro={setIsOpenCommentIntro}
              setIsOpenReplyIntro={setIsOpenReplyIntro}
              isOpenReport={isOpenReport!}
              isOpenDelete={isOpenDelete!}
              isOpenIntro={isOpenIntro}
              isCommentOpenIntro={isOpenCommentIntro}
              isReplyOpenIntro={isOpenReplyIntro}
            ></Comment>
          </PostContent>
        </PostContainer>
        <RecommendedPostContainer>
          <div className="recommended-post">
            <RecommendedPost></RecommendedPost>
          </div>
        </RecommendedPostContainer>
        {/* <ProfilePreview></ProfilePreview> */}
      </Container>
    </>
  );
};

export default PostDetail;
// 페이지 컨테이너
const Container = styled.div<any>`
  display: grid;
  grid-template-columns: 760px 340px;
  position: relative;
  width: 100%;
  height: 100%;
  overflow: scroll;
  img {
    max-width: 720px;
  }
`;
// Post 컨테이너
const PostContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 1100px;
  height: 100%;

  .post-title {
    display: flex;
    align-items: center;
    margin: 0 0 30px 0;
    > h1 {
      font-size: 24px;
      font-weight: bold;
      margin-bottom: 5px;
    }
    > p {
      font-size: 16px;
      margin: 0 0 0 15px;
    }
  }
  h1 {
    font-size: 16px;
    margin-bottom: 15px;
    font-weight: 600;
  }
  .post-info {
    width: 720px;
    height: 80px;
    display: flex;
    align-items: center;
    font-size: 12px;
    padding: 30px 0 30px 0;
    border-bottom: 1px solid #d4d4d4;
    position: relative;
  }
  .nickname {
    max-width: 130px;
    width: 130px;
    text-align: left;
    font-size: 16px;
    margin: 0 15px 0 2px;
  }
  .created-time {
    width: 75px;
    font-size: 12px;
    margin: 3px 8px 0 5px;
    color: var(--sub-font-color);
  }
  .views {
    width: 40px;
    font-size: 12px;
    margin: 1px 8px 0 5px;
    color: var(--sub-font-color);
  }
  .comments {
    width: 40px;
    font-size: 12px;
    margin: 1px 222px 0 5px;
    color: var(--sub-font-color);
  }
  .image {
    width: 30px;
    height: 30px;
  }
  .image img {
    width: 20px;
    height: 20px;
    border-radius: 100px;
    transform: translateY(6px);
  }
`;
const Bookmark = styled.button``;
// Post 정보
const PostInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  height: 30px;
`;
const PostContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-around;
  padding-top: 50px;
  width: 720px;
  height: 100%;
  line-height: 30px;

  .likes {
    font-size: 16px;
    margin: 0 15px;
    color: var(--point-blue-color);
  }
  .dislikes {
    font-size: 16px;
    margin: 0 15px;
    color: var(--error-red-color);
  }
`;

// 추천글 컨테이너
const RecommendedPostContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;

  .recommended-post {
    display: flex;
    justify-content: center;
    padding: 10px;
    width: 290px;
    height: 480px;
    background-color: white;
    border: 1px solid #d4d4d4;
  }
`;

// 모달 컨테이너
const ModalContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 100vw;
  height: 100%;
  left: 0;
  top: 50px;
  bottom: 0;
  z-index: 2;
`;

// 게시글, 댓글, 답글 삭제 확인창
const DeleteModal = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  position: fixed;
  top: 15%;
  align-items: center;
  width: 550px;
  height: 290px;
  top: 300px;
  background-color: #ffffff;
  border: solid 1px #d4d4d4;
  border-radius: 5px;
  color: #5c5c5c;

  padding: 0 15px 0 15px;

  .delete {
    font-size: 26px;
    margin: 0 15px 0 15px;
    padding-bottom: 10px;
    width: 460px;
    border-bottom: 1px solid #d4d4d4;
  }

  .delete-content {
    font-size: 20px;
    margin: 0 220px 0 22px;
  }
`;

// 신고 컨테이너
const ReportModal = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  position: fixed;
  top: 15%;
  align-items: center;
  width: 550px;
  height: 650px;
  background-color: #ffffff;
  border: solid 1px #d4d4d4;
  border-radius: 5px;
  color: #5c5c5c;
  z-index: 10;
  padding: 25px 15px 0 15px;

  .report {
    font-size: 26px;
    margin: 15px 15px 0 15px;
    padding-bottom: 10px;
    width: 460px;
    border-bottom: 1px solid #d4d4d4;
  }
  .report-detail {
    font-size: 18px;
    margin: 15px 0 20px 15px;
    padding-bottom: 10px;
    width: 465px;
  }

  .select {
    display: grid;
    grid-template-columns: repeat(2, 240px);
    grid-template-rows: repeat(3, 1fr);
  }

  .select div {
    display: flex;
    align-items: center;
    margin: 10px 0 20px 0;
    padding-left: 10px;
  }

  .select div label {
    font-size: 20px;
    margin: 0 20px 0 15px;
  }

  .select div input {
    margin: 0 15px 0 15px;
  }

  .report-content {
    width: 465px;
    height: 150px;
    border: 1px solid #d4d4d4;
    font-size: 20px;
    resize: none;
    padding: 20px;
    margin: 15px 0 0 0;
    :focus {
      outline: 2px solid #0069ca;
    }
  }
  input {
    display: none;
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
  top: 45px;
  left: 20px;
  background-color: white;
  .introduction {
    font-size: 17x;
    color: gray;
    width: 175px;
    margin: 15px 0 0 35px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .intro-moreInfo {
    font-size: 17px;
    color: gray;
    width: 100px;
    margin: 15px 0 0 135px;
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
    margin: 18px 0 0 10px;
  }
`;

// 버튼 컨테이너
const BtnContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
  margin-bottom: 20px;
`;

// 삭제 버튼
const DeleteBtn = styled(BlueBtn)`
  width: 220px;
  height: 60px;
  font-size: 20px;
  font-weight: 400px;
  margin: 0 12px 0 12px;
`;
// 신고하기 버튼
const SendReportBtn = styled(BlueBtn)`
  width: 220px;
  height: 60px;
  font-size: 20px;
  font-weight: 400px;
  margin: 0 12px 0 12px;
`;
// 취소 버튼
const CancelBtn = styled(WhiteBtn)`
  width: 220px;
  height: 60px;
  font-size: 20px;
  font-weight: 400px;
  margin: 0 12px 0 12px;
`;

// 유효성 검사 에러
const Error = styled.div`
  width: 100%;
  height: 25px;
  color: red;
  padding: 0 10px 0 10px;
  margin: 10px 0 5px 0;
  font-size: 19px;
  margin-left: 35px;
`;
const TagConatiner = styled.div`
  display: flex;
  width: 1000px;
  justify-content: start;
  margin-top: 15px;
`;
