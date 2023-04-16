import React from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setSearch } from '../../slices/headerSlice';
import { SearchBtn } from './Btn';
import { setPostCategory } from '../../slices/mainSlice';
import {
  setInput,
  setSearchQuery,
  deleteAllSarchTag,
} from '../../slices/headerSlice';
import { GrClose } from 'react-icons/gr';
import { useNavigate } from 'react-router-dom';

function Search() {
  const navigation = useNavigate();
  const dispatch = useAppDispatch();
  const { search } = useAppSelector(({ header }) => header);
  const cancleSearchHandler = () => {
    dispatch(setInput(''));
    dispatch(deleteAllSarchTag());
    dispatch(setSearchQuery(''));
    dispatch(setPostCategory(''));
    dispatch(setSearch(!search));
    navigation('/');
  };
  return (
    <>
      {search ? (
        <CloseBtn
          onClick={cancleSearchHandler}
          id="search-close"
          aria-label="searchClose"
        >
          <GrClose />
        </CloseBtn>
      ) : (
        <SearchBtn
          onClick={() => {
            dispatch(setSearch(!search));
          }}
        >
          검색
        </SearchBtn>
      )}
    </>
  );
}

export default Search;
const CloseBtn = styled.button`
  @media (max-width: 1100px) {
    position: absolute;
    top: 14px;
    right: 17px;
  }
`;
