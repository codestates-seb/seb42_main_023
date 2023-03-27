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
  setIsOpenDelete,
  setIsOpenReport,
  setIsOpenFilter,
  setReportOption,
  setIsOpenIntro,
  setSelectedMember,
} from '../slices/postSlice';
import { setReportErr } from '../slices/validationSlice';
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
  const [checkedElement, setCheckedElement] = useState(-1);
  const handleSelectChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target instanceof HTMLInputElement) {
      setCheckedElement(Number(event.target.value));
      dispatch(setReportOption(event.target.id));
    }
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
  const postId = params.postId;
  const commentId = 'comment' in state ? state.comment?.commentId : null;
  const replyId = 'reply' in state ? state.reply?.replyId : null;
  const reportReason = 'post' in state ? state.post.reportOption : null;
  const reportErr = 'validation' in state ? state.validation.reportErr : null;
  const selectedMember = 'post' in state ? state.post.selectedMember : null;
  const loginUserName = window.localStorage.getItem('name');

  // 게시글 조회 및 추가
  const postDetailQuery = postsApi.useGetPostQuery({ postId });
  const { data, isSuccess } = postDetailQuery;
  const memberName = data?.memberName;
  const postMutation = postsApi.useDeletePostMutation();
  const [deletePost] = postMutation;
  // 게시글 좋아요 추가, 삭제
  const addThumbUpMutation = postsApi.useAddThumbUpMutation();
  const [addThumbUp] = addThumbUpMutation;
  const removeThumbUpMutation = postsApi.useRemoveThumbUpMutation();
  const [removeThumbUp] = removeThumbUpMutation;
  // 게시글 싫어요  추가, 삭제
  const addThumbDownMutation = postsApi.useAddThumbDownMutation();
  const [addThumbDown] = addThumbDownMutation;
  const removeThumbDownMutation = postsApi.useRemoveThumbDownMutation();
  const [removeThumbDown] = removeThumbDownMutation;
  // 북마크 추가, 삭제
  const addBookmarkMutaion = postsApi.useAddBookmarkMutation();
  const [addBookmark] = addBookmarkMutaion;
  const removeBookmarkMutaion = postsApi.useRemoveBookmarkMutation();
  const [removeBookmark] = removeBookmarkMutaion;
  console.log('removeBook', removeBookmarkMutaion);
  // 댓글 삭제
  const commentMutation = commentsApi.useDeleteCommentMutation();
  const [deleteComment] = commentMutation;
  // 답글 삭제
  const replyMutation = repliesApi.useDeleteReplyMutation();
  const [deleteReply] = replyMutation;
  // 신고 추가
  const reportMutation = reportApi.usePostReportMutation();
  const [sendReport] = reportMutation;
  //  멤버 정보 조회
  const memeberQuery = membersApi.useGetMemberQuery({ name: selectedMember });

  // 시간 계산
  const time = timeSince(isSuccess && data?.createdAt);
  // 게시글 수정 여부
  const isEdit = data?.modifiedAt !== data?.createdAt ? true : false;
  // 댓글, 답글 작성자 소개페이지 오픈 여부
  const isOpenCommentIntro = 'comment' in state && state?.comment.isOpeneIntro;
  const isOpenReplyIntro = 'reply' in state && state?.reply.isOpeneIntro;
  //파싱된 데이터
  const parsedData = parse(String(data?.content));

  // 좋아요 클릭 함수
  const changeLiikeHandler = (): void => {
    // 좋아요만 있는 경우
    if (data?.isThumbup && !data?.isThumbdown) {
      console.log('좋아요 삭제');
      removeThumbUp({ postId });

      return;
    }
    // 싫어요만 있는 경우
    if (!data?.isThumbup && data?.isThumbdown) {
      console.log('싫어요 삭제 후 좋아요 추가');
      removeThumbDown({ postId });
      setTimeout(() => {
        addThumbUp({ postId });
      }, 500);
      return;
    }
    // 둘 다 없는 경우
    if (!data?.isThumbdown && !data?.isThumbdown) {
      console.log('좋아요 추가');
      addThumbUp({ postId });
      return;
    }
  };

  // 싫어요 클릭 함수
  const changeDislikeHandler = (): void => {
    // 좋아요만 있는 경우
    if (data?.isThumbup && !data?.isThumbdown) {
      // 좋아요 제거, 싫어요 추가
      console.log('좋아요 삭제 후 싫어요 추가');
      removeThumbUp({ postId });
      setTimeout(() => {
        addThumbDown({ postId });
      }, 500);
      return;
    }
    // 싫어요만 있는 경우
    if (!data?.isThumbup && data?.isThumbdown) {
      // 싫어요 제거
      console.log('싫어요 삭제');
      removeThumbDown({ postId });
      return;
    }
    // 둘 다 없는 경우
    if (!data?.isThumbup && !data?.isThumbdown) {
      // 싫어요 추가
      console.log('싫어요 추가');
      addThumbDown({ postId });
      return;
    }
  };
  // 북마크 클릭 함수
  const changeBookmarkHandler = (): void => {
    if (data?.isBookmarked) {
      removeBookmark({ memberName, postId });
    } else {
      addBookmark({ memberName, postId });
    }
  };

  // 삭제 확인 모달창 오픈
  const confirmDeleteHandler = (): void => {
    if ('post' in state) {
      dispatch(setIsOpenDelete(state.post?.isOpenDelete));
    }
  };
  // 신고 모달창 오픈
  const reportHandler = (): void => {
    if ('post' in state) {
      dispatch(setIsOpenReport(state.post?.isOpenReport));
    }
  };
  // 데이터 삭제(게시글, 댓글, 답글)
  const deleteData = (): void => {
    // 게시글 삭제 로직
    if ('post' in state && state.post?.deleteType === '게시글') {
      deletePost({ postId });
      confirmDeleteHandler();
      console.log('post delete');
      navigate('/');
    }
    // 댓글 삭제 로직
    if ('post' in state && state.post?.deleteType === '댓글') {
      deleteComment({ commentId });
      confirmDeleteHandler();
      console.log('comment delete');
    }
    // 답글 삭제 로직
    if ('post' in state && state.post?.deleteType === '답글') {
      deleteReply({ replyId });
      confirmDeleteHandler();
      console.log('reply delete');
    }
  };

  // 드롭다운 클로즈
  const handleClickOutside = (event: MouseEvent) => {
    if ('post' in state && state.post?.isOpenFilter) {
      dispatch(setIsOpenFilter(false));
    }
  };

  const outClickIntroHandler = (event: React.MouseEvent<HTMLElement>) => {
    if (
      'post' in state &&
      state.post?.isOpeneIntro &&
      !isOpenReplyIntro &&
      !isOpenCommentIntro &&
      event.target instanceof HTMLElement
    ) {
      dispatch(setIsOpenIntro(false));
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
        .then((res) => console.log('res in report:', res))
        .catch((err: any) => console.log('err in report:', err));
      dispatch(setIsOpenReport('post' in state && state.post?.isOpenReport));
      dispatch(setReportErr(''));
      setCheckedElement(-1);
      alert('신고가 접수 되었습니다.');
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
      });
      dispatch(setIsOpenReport('post' in state && state.post?.isOpenReport));
      dispatch(setReportErr(''));
      setCheckedElement(-1);
      alert('신고가 접수 되었습니다.');
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
      });
      dispatch(setIsOpenReport('post' in state && state.post?.isOpenReport));
      dispatch(setReportErr(''));
      setCheckedElement(-1);
      alert('신고가 접수 되었습니다.');
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
        dispatch(setReportErr('제목은 10자 이상 40자 이하로 작성해주세요.'));
      } else {
        dispatch(setReportErr(''));
      }
    }
  };

  // 삭제 문구
  const deleteConfirm = `${
    'post' in state && state.post?.deleteType
  }을 정말 삭제하시겠습니까?`;

  const IntroHandler = (event: React.MouseEvent<HTMLElement>) => {
    if (
      !isOpenCommentIntro &&
      !isOpenReplyIntro &&
      'post' in state &&
      event.target instanceof HTMLElement
    ) {
      dispatch(setIsOpenIntro(state.post?.isOpeneIntro));
      dispatch(setSelectedMember(event.target.id));
    }
  };

  useEffect(() => {
    dispatch(setIsOpenReport(false));
    dispatch(setIsOpenFilter(true));
    dispatch(setIsOpenIntro(true));
    dispatch(setIsOpenDelete(true));
  }, [params]);

  return (
    <>
      {'post' in state && state.post?.isOpenDelete ? (
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

      {'post' in state && state.post?.isOpenReport ? (
        <ModalContainer>
          <ReportModal>
            <div className="report">신고</div>
            <div className="report-detail">
              신고는 반대 의견을 표시하는 기능이 아닙니다.
            </div>
            <div className="select">
              {reportOption.map((option, idx) => {
                return (
                  <div key={idx}>
                    <input
                      type="radio"
                      id={option}
                      name="report"
                      value={idx}
                      checked={checkedElement === idx}
                      onChange={handleSelectChange}
                    />

                    {checkedElement === idx ? (
                      <CheckedIcon width={30} height={30} />
                    ) : (
                      <NoCheckedIcon width={30} height={30} />
                    )}
                    <label htmlFor={option}>{option}</label>
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
              {isSuccess &&
              'post' in state &&
              state?.post.isOpeneIntro &&
              state.post.isOpeneIntro ? (
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
                    {memeberQuery.data?.intro || '소개 내용이 없습니다.'}
                  </label>
                  <div className="intro-moreInfo">더보기 》</div>
                </IntorductionContainer>
              ) : null}

              <li className="nickname">{data?.memberName}</li>
              <TimeIcon />
              <li className="created-time">{time} 전</li>
              <ViewIcon />
              <li className="views">{data?.viewCount}</li>
              <CommentIcon checked={true} />
              <li className="comments">{data?.commentCount}</li>
              <button
                className="bookmark"
                onClick={_.debounce(() => {
                  changeBookmarkHandler();
                }, 1500)}
              >
                <BookmarkIcon checked={data?.isBookmarked} />
              </button>
              <DropdownButton memberName={data?.memberName}></DropdownButton>
            </ul>
          </PostInfo>
          <PostContent>
            <div>{parsedData}</div>

            <ul className="post-info">
              <button
                onClick={_.debounce(() => {
                  changeLiikeHandler();
                }, 1500)}
              >
                <LikeIcon checked={isSuccess && data?.isThumbup} />
              </button>
              <li className="likes">{isSuccess && data?.thumbupCount}</li>
              <button
                onClick={_.debounce(() => {
                  changeDislikeHandler();
                }, 1500)}
              >
                <DislikeIcon checked={isSuccess && data?.isThumbdown} />
              </button>
              <li className="dislikes">{isSuccess && data?.thumbDownCount}</li>
            </ul>
            <CommentInput></CommentInput>
            <Comment></Comment>
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
  padding: 75px 50px 75px 15px;

  .post-title {
    display: flex;
    align-items: center;
    margin: 0 0 30px 0;
    > h1 {
      font-size: 24px;
      font-weight: bold;
    }
    > p {
      font-size: 16px;
      margin: 0 0 0 15px;
    }
  }
  h1 {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 15px;
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
    text-align: center;
    font-size: 16px;
    margin: 2px 15px 0 2px;
  }
  .created-time {
    width: 75px;
    font-size: 16px;
    margin: 3px 30px 0 5px;
  }
  .views {
    width: 40px;
    font-size: 16px;
    margin: 1px 15px 0 5px;
  }
  .comments {
    width: 40px;
    font-size: 16px;
    margin: 1px 200px 0 5px;
  }
  .bookmark {
    margin: 1px 20px 0 5px;
  }

  .image {
    display: flex;
    justify-content: center;
    width: 30px;
    height: 30px;
    margin: 0 5px 0 15px;
  }
  .image img {
    width: 35px;
    height: 35px;
    border-radius: 100px;
  }
  button {
    background-color: white;
  }
`;
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
    margin: 0 15px 0 15px;
  }
  .dislikes {
    font-size: 16px;
    margin: 0 15px 0 15px;
  }
`;

// 추천글 컨테이너
const RecommendedPostContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding-top: 80px;

  .recommended-post {
    display: flex;
    justify-content: center;
    padding: 5%;
    width: 315px;
    height: 440px;
    background-color: white;
    border: 2px solid #d4d4d4;
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
  align-items: center;
  width: 550px;
  height: 290px;
  position: absolute;
  top: 300px;
  background-color: #ffffff;
  border: solid 1px #d4d4d4;
  border-radius: 5px;
  color: #5c5c5c;
  cursor: pointer;
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
  align-items: center;
  width: 550px;
  height: 650px;
  position: absolute;
  top: 100px;
  background-color: #ffffff;
  border: solid 1px #d4d4d4;
  border-radius: 5px;
  color: #5c5c5c;
  z-index: 10;
  cursor: pointer;
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
  }
  input {
    display: none;
  }
`;

//TODO Intro
const IntorductionContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  width: 240px;
  height: 140px;
  border: 1px solid #d4d4d4;
  z-index: 2;
  top: 45px;
  left: 48px;
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
