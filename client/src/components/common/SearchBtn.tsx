import React from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setSearch } from '../../slices/headerSlice';

function SearchBtn() {
  const dispatch = useAppDispatch();
  const header = useAppSelector(({ header }) => header);
  return (
    <>
      <Btn
        onClick={() => {
          dispatch(setSearch(!header.search));
        }}
        value={`${header.search}`}
      >
        {header.search ? '검색취소' : '검색'}
      </Btn>
    </>
  );
}

export default SearchBtn;

interface Button {
  value: string;
}

const Btn = styled.button<Button>`
  padding: 6px 20px;
  box-sizing: border-box;
  border: 1px solid #d9d9d9;
  background-color: ${({ value }) => (value === 'true' ? '#fff' : '#0069CA')};
  color: ${({ value }) => !(value === 'true') && '#fff'};
  :hover {
    background-color: ${({ value }) =>
      value === 'true' ? '#f9f6f6' : '#0275e1'};
    transition: 0.3s;
    color: ${({ value }) => (value === 'true' ? '#5c5c5c' : '#fff')};
  }
`;
