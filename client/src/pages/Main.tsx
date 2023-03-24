import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import PostList from '../components/mainP/PostList';
import DropdownButton from '../components/mainP/DropdownButton';
// import SearchPostList from '../components/mainP/SearchPostList';
import { AiOutlineTrophy } from 'react-icons/ai';
import { NavBtn } from '../components/common/Btn';
import { useAppDispatch, useAppSelector } from '../hooks';
import { postListApi } from '../api/postListapi';
import { setPostSetting } from '../slices/mainSlice';
import Pagenation from '../components/mainP/Pagenation';

const Main = () => {
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const { postSetting, orderby, searchOn } = useAppSelector(({ main }) => main);
  const postListquery = postListApi.useGetPostListQuery({
    postSetting: postSetting,
    page: currentPage,
    orderby: orderby,
  });
  const { data, isSuccess } = postListquery;

  //현재페이지 테스트
  useEffect(() => {
    console.log(data.pageInfo.totalPages, currentPage);
  }, [currentPage]);

  return (
    <>
      <FilterWrap>
        <div>
          {!searchOn && (
            <>
              {postSetting === '' ? (
                <ClickComuntyBtn>커뮤니티</ClickComuntyBtn>
              ) : (
                <ComuntyBtn onClick={() => dispatch(setPostSetting(''))}>
                  커뮤니티
                </ComuntyBtn>
              )}
              {postSetting === '' ? (
                <ComuntyBtn
                  onClick={() => dispatch(setPostSetting('/best-awards'))}
                >
                  <AiOutlineTrophy size={20} />
                  명예의전당
                </ComuntyBtn>
              ) : (
                <ClickComuntyBtn>
                  <AiOutlineTrophy size={20} />
                  명예의전당
                </ClickComuntyBtn>
              )}
            </>
          )}
          <DropdownButton setCurrentPage={setCurrentPage} />
        </div>
      </FilterWrap>
      {isSuccess && <PostList posts={data.posts} currentPage={currentPage} />}
      {isSuccess && (
        <Pagenation pageInfo={data.pageInfo} setCurrentPage={setCurrentPage} />
      )}
    </>
  );
};

export default Main;

const ComuntyBtn = styled(NavBtn)`
  font-size: 20px;
  margin-bottom: 10px;
  margin-right: 20px;
  margin-left: 10px;
  svg {
    transform: translateY(2px);
  }
`;
const ClickComuntyBtn = styled(ComuntyBtn)`
  color: var(--point-blue-color);
`;
const FilterWrap = styled.div`
  display: flex;
  justify-content: space-between;
`;
