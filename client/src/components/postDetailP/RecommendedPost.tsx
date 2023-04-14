import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import CommentIcon from '../../assets/common/CommentIcon';
import { recommendedPostsApi } from '../../api/recommendPostApi';
import { PostType } from '../../types/Post';

const RecommendedPost: React.FC = () => {
  const recommendPostsQuery = recommendedPostsApi.useGetRomendedPostsQuery({
    recommend: 'recommend',
  });
  const { data, isSuccess } = recommendPostsQuery;

  return (
    <RecommendedPostContainer>
      <ul>
        <h1>추천게시글</h1>
        {data?.recommends.map((post: Partial<PostType>, idx: number) => {
          const url = `/posts/${post.postId}`;
          return (
            <div key={post?.postId}>
              <div className="recommend-list">
                <Link to={url}>
                  <h2 className="title">
                    <span className="idx">{idx + 1}</span>
                    {post?.title}
                  </h2>
                </Link>
                <div className="icon">
                  <CommentIcon checked={false}></CommentIcon>
                  <span className="comment-count">
                    {isSuccess && post.commentCount}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </ul>
    </RecommendedPostContainer>
  );
};

export default RecommendedPost;

const RecommendedPostContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  height: 100%;
  margin-top: 18px;

  h1 {
    margin-bottom: 20px;
    font-weight: 500;
    font-size: 18px;
    display: flex;
    align-items: center;
    padding: 0 0 10px 0;
    border-bottom: 1px solid #5c5c5c;
    color: var(--main-font-color);
    font-weight: 700;
    svg {
      color: var(--point-blue-color);
      margin-right: 4px;
    }
  }
  .recommend-list {
    display: flex;
    justify-content: space-between;
  }
  .idx {
    font-size: 17px;
    font-weight: bold;
    font-family: Arial, Helvetica, sans-serif;
    margin: 5px 15px 5px 0;
    color: var(--point-blue-color);
    font-style: italic;
  }
  .icon {
    margin: 3px 0 0 10px;
    svg {
      transform: translateY(2px);
    }
  }
  .comment-count {
    font-size: 14px;
    margin-left: 4px;
    color: var(--sub-font-color);
  }
  a {
    text-decoration: none;
    color: #5c5c5c;
    font-weight: 550;
    h2 {
      height: 30px;
      width: 180px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      margin: 5px 0 5px 0;
    }
    :hover {
      color: var(--point-blue-color);
    }
  }
`;
