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
import { PostListWrap, Item } from './MyPostList';
import Nolist from './Nolist';

function MyLikePostList() {
  const [pageOffset, setPageOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const { memberName } = useAppSelector(({ header }) => header);

  const membersLikePostListquery =
    membersPostListApi.useGetMemberLikePostListQuery({
      name: memberName,
      page: currentPage,
    });
  const { data, isSuccess, refetch } = membersLikePostListquery;

  useEffect(() => {
    refetch();
  }, []);

  return (
    <PostListWrap>
      <List>
        {isSuccess && data.posts.length === 0 && (
          <Nolist name={'좋아요한 글이'} />
        )}
        {isSuccess &&
          data.posts.map((post: PostListItem) => {
            return (
              <Item key={post.postId}>
                <Link
                  to={
                    post.title !== '신고된 게시글입니다.'
                      ? `/posts/${post.postId}`
                      : `#`
                  }
                  className={
                    post.title !== '신고된 게시글입니다.' ? '' : 'disabled-link'
                  }
                >
                  <div>
                    <Thumnail content={post.imgUrl} />
                  </div>
                  <div>
                    {post.title === '신고된 게시글입니다.' ? (
                      <h1 style={{ color: '#94969b' }}>{post.title}</h1>
                    ) : (
                      <h1>{post.title}</h1>
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
                </Link>
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

export default MyLikePostList;

const List = styled.ul`
  width: 100%;
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
