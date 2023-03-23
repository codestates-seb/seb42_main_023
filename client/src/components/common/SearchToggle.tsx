import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setSearch } from '../../slices/headerSlice';
import { SearchBtn, ClickSearchBtn } from './Btn';
import { setSearchOn } from '../../slices/mainSlice';

function Search() {
  const dispatch = useAppDispatch();
  const header = useAppSelector(({ header }) => header);
  const cancleSearchHandler = () => {
    dispatch(setSearch(!header.search));
    dispatch(setSearchOn(false));
  };
  return (
    <>
      {header.search ? (
        <ClickSearchBtn onClick={cancleSearchHandler}>검색취소</ClickSearchBtn>
      ) : (
        <SearchBtn onClick={() => dispatch(setSearch(!header.search))}>
          검색
        </SearchBtn>
      )}
    </>
  );
}

export default Search;
