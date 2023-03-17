import React from 'react';
import styled from 'styled-components';
import DislikeIcon from '../../assets/common/DislikeIcon';
import LikeIcon from '../../assets/common/LikeIcon';
import { setReplyDislike, setReplyLike } from '../../slices/replySlice';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { PostStateType, ReplyStateType, Props } from '../../types/PostDetail';

const Reply: React.FC<Props> = ({ replyInfo }: Props) => {
  const dispatch = useAppDispatch();
  const state = useAppSelector(
    (state: PostStateType | ReplyStateType): PostStateType | ReplyStateType => {
      return state;
    },
  );
  // 답글 좋아요 클릭 함수
  const ReplyLiikeHandler = (): void => {
    dispatch(setReplyLike((state as ReplyStateType).reply.isReplyLike));
  };
  // 답글 싫어요 클릭 함수
  const ReplyDislikeHandler = (): void => {
    dispatch(setReplyDislike((state as ReplyStateType).reply.isReplyDislike));
  };

  return (
    <ReplyContainer>
      <ReplyInfo key={replyInfo.replyId}>
        <ul className="reply-info">
          <li className="image">
            <img src={replyInfo && replyInfo.memberImage}></img>
          </li>
          <li className="nickname">{replyInfo && replyInfo.memberName}</li>
          <li className="reply-created-time">12시간 전</li>
          <li className="reply-update">수정</li>
          <li className="reply-delete">삭제</li>
          <button onClick={ReplyLiikeHandler}>
            <LikeIcon checked={replyInfo && replyInfo.isThumbup} />
          </button>
          <li className="reply-likes">{replyInfo && replyInfo.thumbupCount}</li>
          <button onClick={ReplyDislikeHandler}>
            <DislikeIcon checked={replyInfo && replyInfo.isThumbDown} />
          </button>
          <li className="reply-dislikes">
            {replyInfo && replyInfo.thumbupCount}
          </li>
        </ul>
      </ReplyInfo>
      <ReplyContent>
        <div className="content">{replyInfo && replyInfo.content}</div>
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
  margin-top: 25px;

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
    display: flex;
    justify-content: flex-start;
    color: black;
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
    margin: 3px 164px 0 5px;
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
