import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import throttle from 'lodash/throttle';
import parse from 'html-react-parser';
import { useParams, useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from '../hooks';
import { getTimeSince } from '../../src/util/timeCalculator';
import debounce from 'lodash/debounce';
import Comment from '../components/postDetailP/Comment';
import CommentInput from '../components/postDetailP/CommentInput';
import RecommendedPost from '../components/postDetailP/RecommendedPost';
import Tag from '../components/postDetailP/Tag';
import Loading from '../components/common/Loading';
import BookmarkIcon from '../assets/common/BookmarkIcon';
import TimeIcon from '../assets/common/TimeIcon';
import ViewIcon from '../assets/common/ViewIcon';
import CommentIcon from '../assets/common/CommentIcon';
import DislikeIcon from '../assets/common/DislikeIcon';
import LikeIcon from '../assets/common/LikeIcon';
import PostDropdownButton from '../components/postDetailP/PostDropdownButton';
import { BlueBtn, WhiteBtn } from '../components/common/Btn';
import { ReactComponent as CheckedIcon } from '../assets/checked.svg';
import { ReactComponent as NoCheckedIcon } from '../assets/noChecked.svg';
import { postsApi } from '../api/postApi';
import { commentsApi } from '../api/commentApi';
import { repliesApi } from '../api/replyApi';
import { membersApi } from '../api/membersApi';
import { reportApi } from '../api/reportApi';
import {
  setIsOpenFilter,
  setReportOption,
  setSelectedMember,
} from '../slices/postSlice';
import { setReportErr } from '../slices/validationSlice';
import { setMemberName } from '../slices/headerSlice';
import { checkIsLogin } from '../../src/util/checkIsLogin';

const PostDetail: React.FC = () => {
  const isLogin = checkIsLogin();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state);
  const reportTextRef = useRef<HTMLTextAreaElement>(null);
  const [isLike, setIsLike] = useState<boolean>();
  const [isDislike, setIsDislike] = useState<boolean>();
  const [isBookmark, setBookmark] = useState<boolean>();
  const [like, setLike] = useState<number>();
  const [dislike, setDislike] = useState<number>();
  const [views, setViews] = useState<number>();
  const [commentCnt, setCommentCnt] = useState<number>();
  const [checkedElement, setCheckedElement] = useState(-1);
  const [isOpenReport, setIsOpenReport] = useState<boolean>(false);
  const [isOpenReportErr] = useState<boolean>(false);
  const [isOpenDelete, setIsOpenDelete] = useState<boolean>(false);
  const [deleteType, setDeleteType] = useState<string>('');
  const [isOpenIntro, setIsOpenIntro] = useState<boolean>(false);
  const [isOpenCommentIntro, setIsOpenCommentIntro] = useState<boolean>(false);
  const [isOpenReplyIntro, setIsOpenReplyIntro] = useState<boolean>(false);

  const params = useParams();
  const postId = Number(params.postId);
  const commentId = state.comment?.commentId;
  const replyId = state.reply?.replyId;
  const reportReason = state.post.reportOption;
  const reportErr = state.validation.reportErr;
  const selectedMember = state.post.selectedMember;
  const loginUserName = window.localStorage.getItem('name');
  const postDetailQuery = postsApi.useGetPostQuery({ postId });
  const { data, isSuccess, isLoading, refetch } = postDetailQuery;
  const time = getTimeSince(isSuccess && data?.createdAt);
  const isEdit = data?.modifiedAt !== data?.createdAt ? true : false;
  const parsedData = parse(String(data?.content));
  const deleteConfirm = `${deleteType}을 정말 삭제하시겠습니까?`;
  const [deletePost] = postsApi.useDeletePostMutation();
  const [addThumbUp] = postsApi.useAddPostThumbUpMutation();
  const [deleteThumbUp] = postsApi.useDeletePostThumbUpMutation();
  const [addThumbDown] = postsApi.useAddPostThumbDownMutation();
  const [deleteThumbDown] = postsApi.useDeletePostThumbDownMutation();
  const [addBookmark] = postsApi.useAddBookmarkMutation();
  const [removeBookmark] = postsApi.useRemoveBookmarkMutation();
  const [deleteComment] = commentsApi.useDeleteCommentMutation();
  const [deleteReply] = repliesApi.useDeleteReplyMutation();
  const [sendReport] = reportApi.usePostReportMutation();
  const memberQuery = membersApi.useGetMemberQuery(
    { name: selectedMember },
    {
      skip: !selectedMember,
    },
  );

  useEffect(() => {
    if (isSuccess) {
      setIsLike(data?.isThumbup);
      setIsDislike(data?.isThumbdown);
      setLike(data?.thumbupCount);
      setDislike(data?.thumbDownCount);
      setBookmark(data?.isBookmarked);
      setViews(data?.viewCount);
      setCommentCnt(data?.commentCount);
    }
  }, [data]);

  useEffect(() => {
    if (state.post.isOpenFilter) {
      dispatch(setIsOpenFilter(true));
    }
    scrollTo(0, 0);
    refetch();
  }, [postId]);

  const changeLiikeHandler = (): void => {
    if (!isLogin) navigate('/login');
    if (loginUserName) {
      if (isLike && !isDislike) {
        deleteThumbUp({ postId });
        setIsLike(false);
        setLike((prev) => prev! - 1);
        return;
      }

      if (!isLike && isDislike) {
        deleteThumbDown({ postId });
        setIsDislike(false);
        setDislike((prev) => prev! - 1);
        addThumbUp({ postId });
        setIsLike(true);
        setLike((prev) => prev! + 1);
        return;
      }
      if (!isLike && !isDislike) {
        addThumbUp({ postId });
        setIsLike(true);
        setLike((prev) => prev! + 1);
        return;
      }
    }
  };

  const changeDislikeHandler = (): void => {
    if (!isLogin) {
      navigate('/login');
      return;
    }
    if (loginUserName) {
      if (isLike && !isDislike) {
        deleteThumbUp({ postId });
        setIsLike(false);
        setLike((prev) => prev! - 1);
        addThumbDown({ postId });
        setIsDislike(true);
        setDislike((prev) => prev! + 1);
        return;
      }
      if (!isLike && isDislike) {
        deleteThumbDown({ postId });
        setIsDislike(false);
        setDislike((prev) => prev! - 1);
        return;
      }
      if (!isLike && !isDislike) {
        addThumbDown({ postId });
        setIsDislike(true);
        setDislike((prev) => prev! + 1);
        return;
      }
    }
  };
  const changeBookmarkHandler = (): void => {
    if (!isLogin) navigate('/login');
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

  const confirmDeleteHandler = (): void => {
    setIsOpenDelete(!isOpenDelete);
  };
  const reportHandler = (): void => {
    setIsOpenReport(!isOpenReport);
  };

  const deleteData = (): void => {
    if (deleteType === '게시글') {
      deletePost({ postId });
      confirmDeleteHandler();
      navigate('/');
      return;
    }
    if (deleteType === '댓글') {
      deleteComment({ commentId });
      confirmDeleteHandler();
      return;
    }
    if (deleteType === '답글') {
      deleteReply({ replyId });
      confirmDeleteHandler();
      return;
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (state.post?.isOpenFilter) {
      dispatch(setIsOpenFilter(state.post?.isOpenFilter));
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

  const reportOption = [
    '영리목적/홍보성',
    '저작권침해',
    '음란성/선정성',
    '욕설/인신공격',
    '개인정보노출',
    '도배',
    '기타',
  ];

  const selectChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedElement(Number(event.target.value));
    dispatch(setReportOption(event.target.id));
  };

  const selectHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    setCheckedElement(Number(event.currentTarget.value));
    dispatch(
      setReportOption(
        String(event.currentTarget?.parentElement?.children[0].id),
      ),
    );
  };

  const sendReportHandler = (): void => {
    if (!state.post?.reportOption) {
      dispatch(setReportErr('신고 이유를 선택해 주세요.'));
      return;
    } else {
      dispatch(setReportErr(''));
    }
    if (reportTextRef.current?.value === '') {
      dispatch(setReportErr('신고 내용을 작성해 주세요.'));
      return;
    }
    if (state.validation?.reportErr) return;
    if (state.post?.reportType === 'post') {
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

      return;
    }

    if (state.post?.reportType === 'comment') {
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

      return;
    }

    if (state.post.reportType === 'reply') {
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

      return;
    }
  };

  const checkValidation = (): void => {
    const reportValue = reportTextRef.current?.value;
    if (!state.post?.reportOption) {
      dispatch(setReportErr('신고 이유를 선택해 주세요'));
    }
    if (reportValue?.length === 0) {
      dispatch(setReportErr('신고 내용을 작성해 주세요.'));
    }
    if (reportValue) {
      if (reportValue.length < 10 || reportValue.length > 40) {
        dispatch(setReportErr('신고내용은 10자 이상 40자 이하이어야 합니다. '));
        return;
      }

      dispatch(setReportErr(''));
    }
  };

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

  useEffect(() => {
    if (isSuccess) {
      setIsLike(data?.isThumbup);
      setIsDislike(data?.isThumbdown);
      setLike(data?.thumbupCount);
      setDislike(data?.thumbDownCount);
      setBookmark(data?.isBookmarked);
      setViews(data?.viewCount);
      setCommentCnt(data?.commentCount);
    }
  }, [data]);

  useEffect(() => {
    if (state.post?.isOpenFilter) {
      dispatch(setIsOpenFilter(true));
    }
    scrollTo(0, 0);
    refetch();
  }, [postId]);

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
                      onChange={selectChangeHandler}
                    />

                    {checkedElement === idx ? (
                      <button
                        id={option}
                        value={idx}
                        onClick={(event): void => {
                          selectHandler(event);
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
                          selectHandler(event);
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
              onChange={checkValidation}
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
      {isLoading ? (
        <Loading />
      ) : (
        <Container onClick={handleClickOutside}>
          <PostContainer
            className="post-contatiner"
            onClick={outClickIntroHandler}
          >
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
                    <div className="card-image">
                      <img src={data?.memberImage}></img>
                    </div>
                    <div>{data?.memberName}</div>
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
                          dispatch(setMemberName(data?.memberName));
                          navigate('/mypage');
                        }}
                      >
                        더보기
                      </button>
                    </div>
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
                  onClick={throttle(() => {
                    changeBookmarkHandler();
                  }, 300)}
                >
                  <BookmarkIcon checked={isBookmark!} />
                </Bookmark>
                {loginUserName ? (
                  <PostDropdownButton
                    memberName={data?.memberName}
                    isOpenReport={isOpenReport}
                    setIsOpenReport={setIsOpenReport}
                    isOpenDelete={isOpenDelete}
                    setIsOpenDelete={setIsOpenDelete}
                    setDeleteType={setDeleteType}
                  ></PostDropdownButton>
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
                  onClick={debounce(
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
                  onClick={debounce(
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
        </Container>
      )}
    </>
  );
};

export default PostDetail;
const Container = styled.div<any>`
  display: grid;
  grid-template-columns: 760px 340px;
  position: relative;
  width: 100%;
  height: 100%;
  overflow: scroll;

  svg {
    min-width: 20px;
    width: 20px;
  }
  img {
    max-width: 720px;
  }
  @media (max-width: 1100px) {
    grid-template-columns: none;
  }
`;
const PostContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 1100px;
  width: auto;

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
    transform: translateY(7px);
    cursor: pointer;
  }
  @media (max-width: 1100px) {
    width: 100vw;
    padding: 0 15px 0 15px;

    .post-info {
      width: 100%;
    }
    .nickname {
      min-width: 100px;
      width: max-content;
    }
    .created-time {
      min-width: 50px;
      width: max-content;
    }
    .views {
      min-width: 40px;
      width: max-content;
    }
    .comments {
      min-width: 40px;
      margin: 1px auto 0 5px;
    }
  }
`;
const Bookmark = styled.button``;
const PostInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  height: 30px;

  @media (max-width: 1100px) {
     {
      width: 100%;
    }
  }
`;
const PostContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-around;
  padding-top: 50px;
  width: 720px;
  height: 100%;
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

  @media (max-width: 1100px) {
     {
      width: 100%;
    }
  }
`;

const RecommendedPostContainer = styled.div`
  width: 290px;
  display: flex;
  justify-content: center;
  height: 100%;

  .recommended-post {
    display: flex;
    justify-content: center;
    padding: 10px;
    width: 100%;
    height: 480px;
    background-color: white;
    border: 1px solid #d4d4d4;
  }
  @media (max-width: 1100px) {
    width: 100vw;
    display: flex;
    justify-content: center;
    height: 100%;
    margin-top: 50px;
    align-items: center;
    .recommended-post {
      width: 97vw;
      height: 480px;
      background-color: white;
      border: 1px solid #d4d4d4;
    }
  }
`;

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
    z-index: 10;
    :focus {
      outline: 2px solid #0069ca;
    }
  }
  input {
    display: none;
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

const BtnContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const DeleteBtn = styled(BlueBtn)`
  width: 220px;
  height: 60px;
  font-size: 20px;
  font-weight: 400px;
  margin: 0 12px 0 12px;
`;
const SendReportBtn = styled(BlueBtn)`
  width: 220px;
  height: 60px;
  font-size: 20px;
  font-weight: 400px;
  margin: 0 12px 0 12px;
`;
const CancelBtn = styled(WhiteBtn)`
  width: 220px;
  height: 60px;
  font-size: 20px;
  font-weight: 400px;
  margin: 0 12px 0 12px;
`;

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
