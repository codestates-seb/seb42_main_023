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
import { useParams } from 'react-router-dom';

const Main = () => {
  const dispatch = useAppDispatch();
  const params = useParams();
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
  const { data, isSuccess } = postListquery;

  useEffect(() => {
    window.scrollTo(0, 0);
    console.log(currentPage);
  }, [params]);

  return (
    <>
      <Banner>
        <h1>
          <RiMoneyDollarCircleLine color="#fff" size={28} />
          Dragon Money Community
        </h1>
        <p>
          용돈 받을때부터 드릴때까지! 재테크, 내집마련, 주식투자, 모든
          금융고민을 또래 사회초년생과 함께 나눠보세요.
        </p>
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
  width: 100%;
  background: linear-gradient(90deg, #0069ca 0%, #0d1275 100%);
  height: 120px;
  margin-bottom: 40px;
  padding: 30px;
  border-radius: 10px;

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
