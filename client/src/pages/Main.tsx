import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PostList from '../components/mainP/PostList';
import DropdownButton from '../components/mainP/DropdownButton';
import { AiOutlineTrophy } from 'react-icons/ai';
import { NavBtn } from '../components/common/Btn';
import { useAppDispatch, useAppSelector } from '../hooks';
import { postListApi } from '../api/postListapi';
import { setPostSetting } from '../slices/mainSlice';
import Pagenation from '../components/common/Pagination';
import { RiMoneyDollarCircleLine } from 'react-icons/ri';

const Main = () => {
  const dispatch = useAppDispatch();
  //페이지네이션
  const [pageOffset, setPageOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const { postSetting, orderby } = useAppSelector(({ main }) => main);
  const { searchQuery } = useAppSelector(({ header }) => header);
  const postListquery = postListApi.useGetPostListQuery({
    postSetting: postSetting,
    page: currentPage,
    orderby: orderby,
    search: searchQuery,
  });
  const { data, isSuccess, refetch } = postListquery;

  useEffect(() => {
    refetch();
  }, []);

  return (
    <>
      <Banner>
        <h1>
          <RiMoneyDollarCircleLine color="#fff" size={28} />
          WELCOME!
        </h1>
        <p>사회초년생을 위한 경제 커뮤니티 용돈에 오신것을 환영합니다</p>
      </Banner>
      <FilterWrap>
        <div>
          {postSetting === '' ? (
            <ClickComuntyBtn>커뮤니티</ClickComuntyBtn>
          ) : (
            <ComuntyBtn
              onClick={() => {
                setCurrentPage(1);
                setPageOffset(0);
                dispatch(setPostSetting(''));
              }}
            >
              커뮤니티
            </ComuntyBtn>
          )}
          {postSetting === '/best-awards' ? (
            <ClickComuntyBtn>
              <AiOutlineTrophy size={20} />
              명예의전당
            </ClickComuntyBtn>
          ) : (
            <ComuntyBtn
              onClick={() => {
                setCurrentPage(1);
                setPageOffset(0);
                dispatch(setPostSetting('/best-awards'));
              }}
            >
              <AiOutlineTrophy size={20} />
              명예의전당
            </ComuntyBtn>
          )}
        </div>
        <div>
          <DropdownButton />
        </div>
      </FilterWrap>
      {isSuccess && <PostList posts={data.posts} currentPage={currentPage} />}
      {isSuccess && data.posts.length !== 0 && (
        <Pagenation
          pageInfo={data.pageInfo}
          pageOffset={pageOffset}
          setPageOffset={setPageOffset}
          setCurrentPage={setCurrentPage}
        />
      )}
    </>
  );
};

export default Main;

const ComuntyBtn = styled(NavBtn)`
  font-size: 20px;
  padding-bottom: 10px;
  padding-right: 10px;
  padding-left: 10px;
  svg {
    transform: translateY(2px);
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
  width: 100%;
  background: linear-gradient(
    90deg,
    rgba(0, 105, 202, 1) 0%,
    rgba(13, 18, 117, 1) 100%
  );
  height: 120px;
  border-radius: 10px;
  margin-bottom: 40px;
  padding: 30px;
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
`;
