import React from 'react';
import styled from 'styled-components';
import DislikeIcon from '../../assets/common/DislikeIcon';
import LikeIcon from '../../assets/common/LikeIcon';
import { setReplyDislike, setReplyLike } from '../../slices/postSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';

interface stateType {
  postSlice: {
    isLike: boolean;
    isDislike: boolean;
    isBookmark: boolean;
    isCommentLike: boolean;
    isCommentDislike: boolean;
    isReplyLike: boolean;
    isReplyDislike: boolean;
  };
}

const Reply = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state: stateType): stateType => {
    return state;
  });
  // 답글 좋아요 클릭 함수
  const ReplyLiikeHandler = (): void => {
    dispatch(setReplyLike(state.postSlice.isReplyLike));
  };
  // 답글 싫어요 클릭 함수
  const ReplyDislikeHandler = (): void => {
    dispatch(setReplyDislike(state.postSlice.isReplyDislike));
  };
  const img =
    'https://img.khan.co.kr/news/2020/10/16/2020101601001687000138341.jpg';
  return (
    <ReplyContainer>
      <ReplyInfo>
        <ul className="reply-info">
          <li className="image">
            <img src={img}></img>
          </li>
          <li className="nickname">NickName</li>
          <li className="reply-created-time">12시간 전</li>
          <li className="reply-update">수정</li>
          <li className="reply-delete">삭제</li>
          <button onClick={ReplyLiikeHandler}>
            <LikeIcon checked={state.postSlice.isReplyLike} />
          </button>
          <li className="reply-likes">30</li>
          <button onClick={ReplyDislikeHandler}>
            <DislikeIcon checked={state.postSlice.isReplyDislike} />
          </button>
          <li className="reply-dislikes">20</li>
        </ul>
      </ReplyInfo>
      <ReplyContent>
        <div className="content">
          이 편지는 영국에서 최초로 시작되어 일년에 한바퀴를 돌면서 받는
          사람에게 행운을 주었고 지금은 당신에게로 옮겨진 이 편지는 4일 안에
          당신 곁을 떠나야 합니다.
        </div>
      </ReplyContent>
    </ReplyContainer>
  );
};

export default Reply;

const ReplyContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 670px;
  padding-left: 50px;
  height: auto;
  margin-top: 20px;

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
  }
  .content {
    height: 100%;
    width: 100%;
  }
  .nickname {
    font-size: 16px;
    margin: 2px 15px 0 5px;
  }
  .reply-created-time {
    font-size: 16px;
    margin: 3px 15px 0 5px;
  }
  .reply-update {
    font-size: 16px;
    margin: 3px 15px 0 35px;
    color: gray;
    cursor: pointer;
  }
  .reply-delete {
    font-size: 16px;
    margin: 3px 204px 0 5px;
    color: gray;
    cursor: pointer;
  }
  .reply-likes {
    font-size: 16px;
    margin: 3px 15px 0 15px;
  }
  .reply-dislikes {
    font-size: 16px;
    margin: 3px 15px 0 15px;
  }
`;
const ReplyInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  height: 30px;
`;

const ReplyContent = styled.div`
  padding-left: 50px;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  width: 670px;
  height: 100%;
`;
