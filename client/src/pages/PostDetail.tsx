import React, { useRef, useState } from 'react';
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
import {
  setIsOpenDelete,
  setBookmark,
  setDislike,
  setLike,
  setIsOpenReport,
  setIsOpenFilter,
  setReportOption,
} from '../slices/postSlice';
import { useAppDispatch, useAppSelector } from '../hooks';
import {
  PostStateType,
  CommentStateType,
  ReplyStateType,
  validationStateType,
} from '../types/PostDetail';
import { useParams, useNavigate } from 'react-router';
import { postsApi, commentsApi, repliesApi, reportApi } from '../api/api';
import { BlueBtn, WhiteBtn } from '../components/common/Btn';
import DropdownButton from '../components/postDetailP/DropdownButton';
import { ReactComponent as CheckedIcon } from '../assets/checked.svg';
import { ReactComponent as NoCheckedIcon } from '../assets/noChecked.svg';
import { setReportErr } from '../slices/validationSlice';

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
        | validationStateType,
    ):
      | PostStateType
      | CommentStateType
      | ReplyStateType
      | validationStateType => {
      return state;
    },
  );
  const navigate = useNavigate();
  const params = useParams();
  const postId = params.postId;
  // 게시글
  const postDetailQuery = postsApi.useGetPostQuery({ postId });
  const { data, isSuccess } = postDetailQuery;
  const postMutation = postsApi.useDeletePostMutation();
  const deletePost = postMutation[0];
  // 댓글
  const commentQuery = commentsApi.useGetCommentQuery({ postId });
  const commentMutation = commentsApi.useDeleteCommentMutation();
  const deleteComment = commentMutation[0];
  // 답글
  const replyMutation = repliesApi.useDeleteReplyMutation();
  const deleteReply = replyMutation[0];
  // 신고
  const reportMutation = reportApi.useSetReportMutation();
  const sendReport = reportMutation[0];
  // 좋아요 클릭 함수
  const changeLiikeHandler = (): void => {
    dispatch(setLike((state as PostStateType).post.isLike));
  };
  // 싫어요 클릭 함수
  const changeDislikeHandler = (): void => {
    dispatch(setDislike((state as PostStateType).post.isDislike));
  };
  // 북마크 클릭 함수
  const changeBookmarkHandler = (): void => {
    dispatch(setBookmark((state as PostStateType).post.isBookmark));
  };
  // 삭제 확인 모달창 오픈
  const confirmDeleteHandler = (): void => {
    dispatch(setIsOpenDelete((state as PostStateType).post.isOpenDelete));
  };
  // 신고 모달창 오픈
  const reportHandler = (): void => {
    dispatch(setIsOpenReport((state as PostStateType).post.isOpenReport));
  };
  // 데이터 삭제(게시글, 댓글, 답글)
  const deleteData = (): void => {
    // 게시글 삭제 로직
    if (
      (state as PostStateType).post &&
      (state as PostStateType).post.deleteType === '게시글'
    ) {
      deletePost({ postId });
      confirmDeleteHandler();
      console.log('post delete');
      navigate('/');
    }
    // 댓글 삭제 로직
    if (
      (state as PostStateType).post &&
      (state as PostStateType).post.deleteType === '댓글'
    ) {
      const commentId =
        (state as CommentStateType).comment &&
        (state as CommentStateType).comment.commentId;
      deleteComment({ commentId });
      confirmDeleteHandler();
      console.log('comment delete');
    }
    // 답글 삭제 로직
    if (
      (state as PostStateType).post &&
      (state as PostStateType).post.deleteType === '답글'
    ) {
      const replyId =
        (state as ReplyStateType).reply &&
        (state as ReplyStateType).reply.replyId;
      deleteReply({ replyId });
      confirmDeleteHandler();
      console.log('reply delete');
    }
  };
  // 드롭다운 클로즈
  const handleClickOutside = (event: MouseEvent) => {
    if ((state as PostStateType).post.isOpenFilter) {
      dispatch(setIsOpenFilter(false));
    }
  };

  // 신고 보내기
  const sendReportHandler = (): void => {
    // 유효성 검사
    if ((state as validationStateType).validation.reportErr) return;
    if (!(state as PostStateType).post.reportOption) return;
    if (reportTextRef.current?.value === '') return;
    // 게시물 신고
    if ((state as PostStateType).post.reportType === 'post') {
      const reportReason = (state as PostStateType).post.reportOption;
      sendReport({
        reportReason: reportReason,
        description: reportTextRef.current?.value,
        targetType: 'post',
        postId: postId,
        commentId: null,
        replyId: null,
        reporterName: '유저이름',
      });
      dispatch(setIsOpenReport((state as PostStateType).post.isOpenReport));
      dispatch(setReportErr(''));
      setCheckedElement(-1);
      alert('신고가 접수 되었습니다.');
    }
    // 댓글 신고
    if ((state as PostStateType).post.reportType === 'comment') {
      const reportReason = (state as PostStateType).post.reportOption;
      const commentId = (state as CommentStateType).comment.commentId;
      sendReport({
        reportReason: reportReason,
        description: reportTextRef.current?.value,
        targetType: 'comment',
        postId: null,
        commentId: commentId,
        replyId: null,
        reporterName: '유저이름',
      });
      dispatch(setIsOpenReport((state as PostStateType).post.isOpenReport));
      dispatch(setReportErr(''));
      setCheckedElement(-1);
      alert('신고가 접수 되었습니다.');
    }
    // 답글 신고
    if ((state as PostStateType).post.reportType === 'reply') {
      const reportReason = (state as PostStateType).post.reportOption;
      const replyId = (state as ReplyStateType).reply.replyId;
      sendReport({
        reportReason: reportReason,
        description: reportTextRef.current?.value,
        targetType: 'reply',
        postId: null,
        commentId: null,
        replyId: replyId,
        reporterName: '유저이름',
      });
      dispatch(setIsOpenReport((state as PostStateType).post.isOpenReport));
      dispatch(setReportErr(''));
      setCheckedElement(-1);
      alert('신고가 접수 되었습니다.');
    }
  };

  //  신고 유효성 검사
  const validationTest = (): void => {
    const reportValue = reportTextRef.current?.value;
    if (!(state as PostStateType).post.reportOption) {
      dispatch(setReportErr('신고 이유를 선택해 주세요'));
    }
    if (reportValue?.length === 0) {
      dispatch(setReportErr('신고 내용을 작성해 주세요.'));
    }
    if (reportValue) {
      if (reportValue.length < 10 || reportValue.length > 300) {
        dispatch(setReportErr('제목은 10자 이상 300자 이하로 작성해주세요.'));
      } else {
        dispatch(setReportErr(''));
      }
    }
  };

  // 삭제 문구
  const deleteConfirm = `${
    (state as PostStateType).post && (state as PostStateType).post.deleteType
  }을 정말 삭제하시겠습니까?`;

  return (
    <>
      {commentQuery.data && (state as PostStateType).post.isOpenDelete ? (
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
      {commentQuery.data && (state as PostStateType).post.isOpenReport ? (
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
            <Error>{(state as validationStateType).validation.reportErr}</Error>
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
                onClick={() => {
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
        <PostContainer>
          <h1>{isSuccess && data.posts[0].title}</h1>
          <PostInfo>
            <ul className="post-info">
              <li className="image">
                <img src={isSuccess && data.posts[0].memberImage}></img>
              </li>
              <li className="nickname">
                {isSuccess && data.posts[0].memberName}
              </li>
              <TimeIcon />
              <li className="created-time">12시간 전</li>
              <ViewIcon />
              <li className="views">{isSuccess && data.posts[0].viewCount}</li>
              <CommentIcon checked={true} />
              <li className="comments">{isSuccess && data.posts[0].length}</li>
              <button className="bookmark" onClick={changeBookmarkHandler}>
                <BookmarkIcon
                  checked={isSuccess && data.posts[0].isBookmarked}
                />
              </button>
              <DropdownButton></DropdownButton>
            </ul>
          </PostInfo>
          <PostContent>
            <div>{isSuccess && data.posts[0].content}</div>

            <ul className="post-info">
              <button onClick={changeLiikeHandler}>
                <LikeIcon checked={isSuccess && data.posts[0].isThumbup} />
              </button>
              <li className="likes">
                {isSuccess && data.posts[0].thumbupCount}
              </li>
              <button onClick={changeDislikeHandler}>
                <DislikeIcon checked={isSuccess && data.posts[0].isThumbDown} />
              </button>
              <li className="dislikes">
                {isSuccess && data.posts[0].thumbDownCount}
              </li>
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
  max-height: 1000px;
  overflow: scroll;
`;
// Post 컨테이너
const PostContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 1100px;
  height: 100%;
  padding: 75px 50px 75px 15px;

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
  }
  .nickname {
    max-width: 100px;
    width: 100px;
    text-align: center;
    font-size: 16px;
    margin: 2px 15px 0 2px;
  }
  .created-time {
    font-size: 16px;
    margin: 3px 15px 0 5px;
  }
  .views {
    font-size: 16px;
    margin: 1px 15px 0 5px;
  }
  .comments {
    font-size: 16px;
    margin: 1px 300px 0 5px;
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
