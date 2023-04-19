import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import DropdownButton from '../components/mainP/DropdownButton';
import { AiOutlineTrophy } from 'react-icons/ai';
import { NavBtn } from '../components/common/Btn';
import { postListApi } from '../api/postListapi';
import { weeklyPopularApi } from '../api/postListapi';
import Pagenation from '../components/common/Pagination';
import { RiMoneyDollarCircleLine } from 'react-icons/ri';
import Loading from '../components/common/Loading';
import PostItem from '../components/mainP/PostItem';
import { PostListItem } from '../types/PostList';
import WeeklyPopularPost from '../components/mainP/WeeklyPopularPost';

const Main = () => {
  const [pageOffset, setPageOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [orderby, setOrderby] = useState('latest');
  const [postCategory, setPostCategory] = useState('');
  const postListquery = postListApi.useGetPostListQuery({
    postSetting: postCategory,
    page: currentPage,
    orderby: orderby,
    search: '',
  });
  const { data, isSuccess, refetch } = postListquery;
  const weeklyPopularquery = weeklyPopularApi.useGetWeekPostListQuery({
    endpoint: 'weekly-popular',
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    refetch();
  }, []);

  if (!isSuccess) return <Loading />;

  return (
    <MainContainer>
      <Banner>
        <h1>
          <RiMoneyDollarCircleLine color="#fff" size={28} />
          Dragon Money Community
        </h1>
        <p>
          용돈 받을 때부터 드릴때까지! 재테크, 내집마련, 주식투자, 모든
          금융고민을 또래 사회초년생과 함께 나눠보세요.
        </p>
      </Banner>
      <WeeklyPopularHeader>주간인기글</WeeklyPopularHeader>
      <WeeklyPopularContainer>
        {weeklyPopularquery?.data?.posts.map(
          (post: PostListItem, index: number) => (
            <WeeklyPopularPost post={post} key={post.postId} />
          ),
        )}
      </WeeklyPopularContainer>
      <FilterWrap>
        <div>
          {postCategory === '' ? (
            <ClickComuntyBtn>커뮤니티</ClickComuntyBtn>
          ) : (
            <ComuntyBtn
              onClick={() => {
                setCurrentPage(1);
                setPageOffset(0);
                setPostCategory('');
              }}
            >
              커뮤니티
            </ComuntyBtn>
          )}
          {postCategory === '/best-awards' ? (
            <ClickComuntyBtn>
              <AiOutlineTrophy size={20} />
              명예의전당
            </ClickComuntyBtn>
          ) : (
            <ComuntyBtn
              onClick={() => {
                setCurrentPage(1);
                setPageOffset(0);
                setPostCategory('/best-awards');
              }}
            >
              <AiOutlineTrophy size={20} />
              명예의전당
            </ComuntyBtn>
          )}
        </div>
        <div>
          <DropdownButton setOrderby={setOrderby} />
        </div>
      </FilterWrap>
      <List>
        {data?.posts.map((post: PostListItem) => (
          <PostItem post={post} key={post.postId} />
        ))}
      </List>
      {isSuccess && data.posts.length !== 0 && (
        <Pagenation
          pageInfo={data.pageInfo}
          pageOffset={pageOffset}
          setPageOffset={setPageOffset}
          setCurrentPage={setCurrentPage}
        />
      )}
    </MainContainer>
  );
};

export default Main;

const MainContainer = styled.div`
  position: relative;
`;

export const List = styled.ul`
  margin-top: -4px;
  border-top: 1px solid var(--border-color);
`;

const WeeklyPopularHeader = styled.h1`
  margin-bottom: 10px;
  @media (max-width: 1100px) {
    margin: 0 10px;
    margin-bottom: 10px;
  }
`;

const WeeklyPopularContainer = styled.ul`
  margin-bottom: 60px;
  display: flex;
  justify-content: space-between;
  @media (max-width: 1100px) {
    margin: 0 10px;
    margin-bottom: 50px;
  }
  @media (max-width: 640px) {
    width: auto;
    display: block;
  }
`;

const ComuntyBtn = styled(NavBtn)`
  font-size: 16px;
  padding-bottom: 10px;
  padding-right: 10px;
  padding-left: 10px;
  svg {
    transform: translateY(4px);
  }
`;
const ClickComuntyBtn = styled(ComuntyBtn)`
  color: var(--point-blue-color);
  border-bottom: 2px solid var(--point-blue-color);
`;
const FilterWrap = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Banner = styled.div`
  width: auto;
  background: linear-gradient(90deg, #0069ca 0%, #0d1275 100%);
  margin-bottom: 40px;
  padding: 30px;
  border-radius: 10px;
  box-sizing: border-box;
  h1 {
    color: #fff;
    font-size: 24px;
    font-weight: 400;
    display: flex;
    align-items: center;
    svg {
      margin-right: 4px;
    }
  }
  p {
    color: #fff;
    font-weight: 200;
    margin-top: 8px;
  }
  @media (max-width: 1100px) {
    margin: 0 10px;
    margin-bottom: 40px;
  }
`;
