import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setSearch } from '../../slices/headerSlice';
import { SearchBtn, ClickSearchBtn } from './Btn';
import { setPostSetting } from '../../slices/mainSlice';
import {
  setInput,
  setSearchQuery,
  deleteAllSarchTag,
} from '../../slices/headerSlice';

function Search() {
  const dispatch = useAppDispatch();
  const { search } = useAppSelector(({ header }) => header);
  const cancleSearchHandler = () => {
    console.log('검색닫기');
    dispatch(setInput(''));
    dispatch(deleteAllSarchTag());
    dispatch(setSearchQuery(''));
    dispatch(setPostSetting(''));
    dispatch(setSearch(!search));
  };
  return (
    <>
      {search ? (
        <ClickSearchBtn onClick={cancleSearchHandler}>검색취소</ClickSearchBtn>
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
