import React from 'react';
import styled from 'styled-components';
import CommentInput from '../components/postDetailP/CommentInput';
import Comment from '../components/postDetailP/Comment';
import RecommendedPost from '../components/postDetailP/RecommendedPost';
import BookmarkIcon from '../assets/common/BookmarkIcon';
import { BsThreeDots } from 'react-icons/bs';
import TimeIcon from '../assets/common/TimeIcon';
import ViewIcon from '../assets/common/ViewIcon';
import CommentIcon from '../assets/common/CommentIcon';
import DislikeIcon from '../assets/common/DislikeIcon';
import LikeIcon from '../assets/common/LikeIcon';
import { setBookmark, setDislike, setLike } from '../slices/postSlice';
import { useAppDispatch, useAppSelector } from '../hooks';
import { PostStateType } from '../types/PostDetail';
import { useParams } from 'react-router';
import { postsApi } from '../api/api';

const PostDetail: React.FC = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state: PostStateType): PostStateType => {
    return state;
  });
  const params = useParams();
  const postId = params.postId;
  const postDetailQuery = postsApi.useGetPostQuery({ postId });
  const { data, isSuccess } = postDetailQuery;
  console.log(postDetailQuery);

  // 좋아요 클릭 함수
  const changeLiikeHandler = (): void => {
    dispatch(setLike(state.post.isLike));
  };
  // 싫어요 클릭 함수
  const changeDislikeHandler = (): void => {
    dispatch(setDislike(state.post.isDislike));
  };
  // 북마크 클릭 함수
  const changeBookmarkHandler = (): void => {
    dispatch(setBookmark(state.post.isBookmark));
  };

  return (
    <Container>
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
              <BookmarkIcon checked={isSuccess && data.posts[0].isBookmarked} />
            </button>
            <BsThreeDots style={{ cursor: 'pointer' }} />
          </ul>
        </PostInfo>
        <PostContent>
          <div>{isSuccess && data.posts[0].content}</div>

          <ul className="post-info">
            <button onClick={changeLiikeHandler}>
              <LikeIcon checked={isSuccess && data.posts[0].isThumbup} />
            </button>
            <li className="likes">{isSuccess && data.posts[0].thumbupCount}</li>
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
  );
};

export default PostDetail;
// 페이지 컨테이너
const Container = styled.div`
  display: grid;
  grid-template-columns: 760px 340px;
  width: 100%;
  height: 100%;
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
