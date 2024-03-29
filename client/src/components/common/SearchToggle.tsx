import React from 'react';
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
        <button
          onClick={cancleSearchHandler}
          id="search-close"
          aria-label="searchClose"
        >
          <GrClose />
        </button>
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
