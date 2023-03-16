import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setSearch } from '../../slices/headerSlice';
import { SearchBtn, ClickSearchBtn } from './Btn';

function Search() {
  const dispatch = useAppDispatch();
  const header = useAppSelector(({ header }) => header);
  return (
    <>
      {header.search ? (
        <ClickSearchBtn onClick={() => dispatch(setSearch(!header.search))}>
          검색취소
        </ClickSearchBtn>
      ) : (
        <SearchBtn onClick={() => dispatch(setSearch(!header.search))}>
          검색
        </SearchBtn>
      )}
    </>
  );
}

export default Search;
