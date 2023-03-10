import React from 'react';
import styled from 'styled-components';
import Reply from './Reply';
import ReplyInput from './ReplyInput';
import DislikeIcon from '../../assets/common/DislikeIcon';
import LikeIcon from '../../assets/common/LikeIcon';
import TimeIcon from '../../assets/common/TimeIcon';

const Comment = () => {
  const img =
    'https://img.khan.co.kr/news/2020/10/16/2020101601001687000138341.jpg';
  return (
    <CommentContainer>
      <CommentInfo>
        <ul className="content-info">
          <li className="image">
            <img src={img}></img>
          </li>
          <li className="nickname">NickName</li>
          <TimeIcon />
          <li className="created-time">12시간 전</li>
          <li className="comment-update">수정</li>
          <li className="comment-delete">삭제</li>
          <LikeIcon checked={false} />
          <li className="comment-likes">30</li>
          <DislikeIcon checked={false} />
          <li className="comment-dislikes">20</li>
        </ul>
      </CommentInfo>
      <CommentContent>
        <div className="content">
          이 편지는 영국에서 최초로 시작되어 일년에 한바퀴를 돌면서 받는
          사람에게 행운을 주었고 지금은 당신에게로 옮겨진 이 편지는 4일 안에
          당신 곁을 떠나야 합니다.
        </div>
        <ReplyBtn>답글</ReplyBtn>
      </CommentContent>
      <ReplyInput></ReplyInput>
      <Reply></Reply>
    </CommentContainer>
  );
};

export default Comment;

const CommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 720px;
  height: auto;
  margin-top: 20px;
  h1 {
    font-size: 24px;
    font-weight: 400;
  }
  .content-info {
    width: 720px;
    height: 80px;
    display: flex;
    align-items: center;
    font-size: 12px;
    padding: 30px 0 30px 0;
  }
  .content {
    height: 100%;
    width: auto;
  }
  .nickname {
    font-size: 16px;
    margin: 2px 15px 0 5px;
  }
  .created-time {
    font-size: 16px;
    margin: 3px 15px 0 5px;
  }
  .comment-update {
    font-size: 16px;
    margin: 3px 15px 0 35px;
    color: gray;
    cursor: pointer;
  }
  .comment-delete {
    font-size: 16px;
    margin: 3px 240px 0 5px;
    color: gray;
    cursor: pointer;
  }
  .comment-likes {
    font-size: 16px;
    margin: 3px 15px 0 15px;
  }
  .comment-dislikes {
    font-size: 16px;
    margin: 3px 15px 0 15px;
  }
`;
const CommentInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  height: 30px;
`;

const CommentContent = styled.div`
  padding-left: 50px;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  width: 720px;
  height: auto;
`;

const ReplyBtn = styled.button`
  width: 50px;
  height: 10px;
  background-color: #ffffff;
  color: #5c5c5c;
  margin-top: 15px;
  cursor: pointer;
`;
