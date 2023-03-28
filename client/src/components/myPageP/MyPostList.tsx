import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAppSelector } from '../../hooks';
import TimeIcon from '../../assets/common/TimeIcon';
import ViewIcon from '../../assets/common/ViewIcon';
import Thumnail from '../common/Thumbnail';
import { Tag } from '../mainP/PostList';
import { Link } from 'react-router-dom';
import { membersPostListApi } from '../../api/memberapi';
import { timeSince } from '../mainP/Timecalculator';
import Pagination from '../common/Pagination';
import { PostListItem } from '../../types/PostList';
import { FaRegThumbsUp } from 'react-icons/fa';

function MyPostList() {
  const [pageOffset, setPageOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const { memberName } = useAppSelector(({ header }) => header);

  const membersPostListquery = membersPostListApi.useGetMemberPostListQuery({
    name: memberName,
    page: currentPage,
  });
  const { data, isSuccess, refetch } = membersPostListquery;

  useEffect(() => {
    refetch();
  }, []);

  if (!isSuccess) {
    return <div>Loading...</div>;
  }

  return (
    <PostListWrap>
      <List>
        {isSuccess &&
          data.posts.map((post: PostListItem) => {
            return (
              <Item key={post.postId}>
                <div>
                  <Link to={`/posts/${post.postId}`}>
                    <Thumnail content={post.imgUrl} />
                  </Link>
                </div>
                <div>
                  {post.title === '신고된 게시글입니다.' ? (
                    <h1 style={{ color: '#94969b' }}>{post.title}</h1>
                  ) : (
                    <Link to={`/posts/${post.postId}`}>
                      <h1>{post.title}</h1>
                    </Link>
                  )}
                  <Itemside>
                    <div>
                      {post.tags.map((tag, idx) => (
                        <Tag key={idx}>{tag.tagName}</Tag>
                      ))}
                    </div>
                    <Info>
                      <span>{post.memberName}</span>
                      <span>
                        <TimeIcon />
                        {timeSince(post.createdAt)}
                      </span>
                      <span>
                        <ViewIcon />
                        {post.viewCount}
                      </span>
                      <span>
                        <FaRegThumbsUp size={13} />
                        {post.thumbupCount}
                      </span>
                    </Info>
                  </Itemside>
                </div>
              </Item>
            );
          })}
      </List>
      {isSuccess && data.posts.length !== 0 && (
        <Pagination
          pageInfo={data.pageInfo}
          pageOffset={pageOffset}
          setPageOffset={setPageOffset}
          setCurrentPage={setCurrentPage}
        />
      )}
    </PostListWrap>
  );
}

export default MyPostList;

const List = styled.ul`
  width: 100%;
`;
export const Item = styled.li`
  height: 100px;
  border-bottom: 1px solid var(--border-color);
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
  h1 {
    font-size: 20px;
    margin-bottom: 4px;
  }
  > div:nth-child(2) {
    flex-grow: 1;
  }
`;
export const Itemside = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  > div {
    display: flex;
  }
`;
export const Info = styled.div`
  span {
    color: var(--sub-font-color);
    font-size: var(--sub-font-size);
    margin-left: 20px;
    flex-direction: row;
    display: flex;
    align-items: center;
  }
`;

export const PostListWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
