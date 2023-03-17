import React, { useCallback } from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import Reply from './Reply';
import ReplyInput from './ReplyInput';
import DislikeIcon from '../../assets/common/DislikeIcon';
import LikeIcon from '../../assets/common/LikeIcon';
import TimeIcon from '../../assets/common/TimeIcon';
import {
  setCommentDislike,
  setCommentLike,
  setIsOpened,
  setCommentId,
  isOpened,
} from '../../slices/postSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { StateType, ReplyType, CommentType } from '../../types/PostDetail';
import { commentsApi, repliesApi } from '../../api/api';
import { useParams } from 'react-router';

const Comment: React.FC = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state: StateType): StateType => {
    return state;
  });
  const params = useParams();
  const postId = params.postId;
  const commentQuery = commentsApi.useGetCommentQuery({ postId });
  const commentId = state.postSlice && state.postSlice.commentId;
  const replyQuery = repliesApi.useGetReplyQuery({ commentId });

  //TODO 답글 추가하는 로직 필요함 Mutation 사용해 보기
  // 댓글 좋아요 클릭 함수
  const CommentLiikeHandler = (): void => {
    dispatch(setCommentLike(state.postSlice.isCommentLike));
  };
  // 댓글 싫어요 클릭 함수
  const CommentDislikeHandler = (): void => {
    dispatch(setCommentDislike(state.postSlice.isCommentDislike));
  };

  // 답글 조회
  const getReply = async (commentId: Partial<CommentType>) => {
    // const commentid = id;
    // const response = await axios.get(`/comments/${commentid}/replies`);
    // try {
    //   const { data } = response;
    //   // console.log('data', data);
    //   dispatch(setReplies(data.comment));
    //   dispatch(setTotalReplies(data.comment));
    // } catch (err) {
    //   console.log(err);
    // }
  };

  // console.log(open);
  // dispatch(isOpened(open));

  // 답글 조회
  const confirmRepliesHandler = useCallback(
    (commentId: Partial<CommentType>): void => {
      // const open =
      //   commentQuery.isSuccess &&
      //   Array.from(
      //     { length: commentQuery.data.comment.length },
      //     (el) => (el = false),
      //   );
      // console.log('open', open);
      dispatch(setCommentId(commentId));
    },
    [],
  );

  return (
    <CommentContainer>
      {commentQuery.data &&
        commentQuery.data.comment.map(
          (comment: Partial<CommentType>, idx: number) => {
            const filtered =
              replyQuery.data &&
              (_.uniqBy(replyQuery.data, 'replyId') as Array<object>).filter(
                (reply) => {
                  return (reply as ReplyType).commentId === comment.commentId;
                },
              );
            // console.log('replies', replyQuery.data.comment);
            // console.log('filtered', filtered);
            return (
              <>
                <CommentInfo key={comment.commentId}>
                  <ul className="content-info">
                    <li className="image">
                      <img src={comment.memberImage}></img>
                    </li>
                    <li className="nickname">{comment.memberName}</li>
                    <TimeIcon />
                    <li className="created-time">12시간 전</li>
                    <li className="comment-update">수정</li>
                    <li className="comment-delete">삭제</li>
                    <button onClick={CommentLiikeHandler}>
                      <LikeIcon checked={comment.isThumbup!} />
                    </button>
                    <li className="comment-likes">{comment.thumbupCount}</li>
                    <button onClick={CommentDislikeHandler}>
                      <DislikeIcon checked={comment.isThumbDown!} />
                    </button>
                    <li className="comment-dislikes">
                      {comment.thumbDownCount}
                    </li>
                  </ul>
                </CommentInfo>
                <CommentContent>
                  <div className="content">{comment.content}</div>
                  <ReplyBtn
                    onClick={(): void => {
                      console.log('commentId', comment.commentId);
                      confirmRepliesHandler(
                        comment.commentId as Partial<CommentType>,
                      );
                      dispatch(setIsOpened(idx));
                    }}
                  >
                    답글 {comment.replyCount}
                  </ReplyBtn>
                </CommentContent>
                {state.postSlice.isOpend &&
                (state.postSlice.isOpend as Array<boolean>)[idx] ? (
                  <ReplyContainer>
                    <ReplyInput></ReplyInput>
                    {filtered! &&
                      (filtered as Array<ReplyType>).map((reply: ReplyType) => {
                        return (
                          <>
                            <Reply
                              key={reply.replyId}
                              replyInfo={reply}
                            ></Reply>
                          </>
                        );
                      })}
                  </ReplyContainer>
                ) : null}
              </>
            );
          },
        )}
    </CommentContainer>
  );
};

export default Comment;

const CommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 720px;
  height: auto;

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
    width: 100%;
    display: flex;
    justify-content: flex-start;
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
    margin: 3px 200px 0 5px;
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
  margin-top: 50px;
`;

const CommentContent = styled.div`
  padding-left: 50px;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  width: 720px;
  height: auto;
  margin-bottom: 10px;
`;

const ReplyContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  color: #5c5c5c;

  cursor: pointer;
`;

const ReplyBtn = styled.button`
  width: 50px;
  height: 10px;
  background-color: #ffffff;
  color: #5c5c5c;
  margin-top: 15px;
  cursor: pointer;
`;

//충돌해결
