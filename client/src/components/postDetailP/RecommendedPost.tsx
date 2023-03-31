import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { PostType } from '../../types/PostDetail';
import { recommendedPostsApi } from '../../api/recommendPostApi';
import CommentIcon from '../../assets/common/CommentIcon';

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
                <div className="idx">{idx + 1}</div>
                <Link to={url}>
                  <h2 className="title">{post?.title}</h2>
                </Link>
                <div className="icon">
                  <CommentIcon checked={true}></CommentIcon>
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
    border-bottom: 2px solid #5c5c5c;
    color: var(--main-font-color);
    font-weight: 700;
    svg {
      color: var(--point-blue-color);
      margin-right: 4px;
    }
  }
  .recommend-list {
    display: flex;
    justify-content: flex-start;
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
    margin: 5px 0 0 15px;
  }
  .comment-count {
    font-weight: 500;
    margin-left: 15px;
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
      font-weight: 700;
    }
    :hover {
      color: var(--point-blue-color);
    }
  }
`;
