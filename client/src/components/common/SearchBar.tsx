import React, { KeyboardEvent } from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  setInput,
  setSearchTag,
  deleteSarchTag,
} from '../../slices/headerSlice';
import { setTagErr } from '../../slices/validationSlice';
import { AiOutlineSearch } from 'react-icons/ai';
import * as Styled from '../common/Tag';
import { MdCancel } from 'react-icons/md';
import SearchBtn from './SearchToggle';

interface Input {
  className: string;
  placeholder: string;
  onChange: React.KeyboardEvent<HTMLInputElement>;
  value: string;
}

// 공통 컴포넌트
const SearchBar: React.FC = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state);

  //검색 인풋창 데이터 입력
  const valueCheck = (event: React.ChangeEvent<HTMLInputElement>): void => {
    dispatch(setInput(event.target.value));
  };

  //Get 요청 실행
  //   const getpostHandler = () => {};

  //유효성 검사 로직
  const validation = () => {
    const tag: Array<string> = state.header.tag;
    const input = state.header.input;
    // 태그 글자수 제한
    if (input.length > 10) {
      dispatch(setTagErr('태그는 10자 이내로 입력해주세요.'));
      return;
    }
    // 태그 중복 입력 방지
    if (tag.includes(input)) {
      dispatch(setTagErr(''));
      return;
    }
    // 공백 방지
    if (input === '' && tag.length === 0) {
      dispatch(setTagErr(''));
      return;
    }
    // 띄어쓰기 방지
    if (input.includes(' ')) {
      dispatch(setTagErr('태그에 띄어쓰기를 포함할 수 없습니다.'));
      return;
    }
    // 태그 개수 제한
    if (tag.length >= 5) {
      dispatch(setTagErr('태그는 5개까지만 입력 가능합니다.'));
      return;
    } else {
      dispatch(setInput(''));
      dispatch(setTagErr(''));
      dispatch(setSearchTag(input.slice(1)));
    }
  };

  //검색 방식 분기
  const searchHandler = (event: KeyboardEvent<HTMLInputElement>): void => {
    const tag: Array<string> = state.header.tag;
    const input = state.header.input;
    if (event.key === 'Enter' && event.nativeEvent.isComposing === false) {
      if (tag.length === 0 && input === '') {
        return;
      }
      if (input !== '') {
        if (input[0] === '#') {
          validation();
        } else {
          //검색실행
        }
      }
      if (tag.length !== 0 && input === '') {
        //검색실행
      }
    }
  };

  return (
    <>
      {state.validation.tagErr === '' ? (
        <TagInputContainer>
          <InputWraper>
            <Input
              className="tag-input"
              placeholder="관심있는 내용을 검색해보세요."
              onChange={valueCheck}
              onKeyDown={searchHandler}
              value={state.header.input}
            ></Input>
            <Icon>
              <AiOutlineSearch size={26} />
            </Icon>
            {state.header.tag.length === 0 && <Span>#태그를 검색하세요</Span>}
            <TagConatiner>
              {state.header.tag.map((tag, idx) => {
                return (
                  <Styled.TagItemWidthDelete key={idx}>
                    <span>{tag}</span>
                    <button onClick={() => dispatch(deleteSarchTag(tag))}>
                      <MdCancel size="13" />
                    </button>
                  </Styled.TagItemWidthDelete>
                );
              })}
            </TagConatiner>
          </InputWraper>
          <SearchBtn />
        </TagInputContainer>
      ) : (
        <TagInputContainer>
          <InputWraper>
            <Input
              className="tag-input"
              placeholder="관심있는 내용을 검색해보세요."
              onChange={valueCheck}
              onKeyDown={searchHandler}
              value={state.header.input}
            ></Input>
            <Icon>
              <AiOutlineSearch size={26} />
            </Icon>
            <Error>{state.validation.tagErr}</Error>
            <TagConatiner>
              {state.header.tag.map((tag, idx) => {
                return (
                  <Styled.TagItemWidthDelete key={idx}>
                    <span>{tag}</span>
                    <button onClick={() => dispatch(deleteSarchTag(tag))}>
                      <MdCancel size="13" />
                    </button>
                  </Styled.TagItemWidthDelete>
                );
              })}
            </TagConatiner>
          </InputWraper>
          <SearchBtn />
        </TagInputContainer>
      )}
    </>
  );
};

export default SearchBar;

const TagInputContainer = styled.div`
  display: flex;
  margin: 0 auto;
  height: 53px;
`;

const InputWraper = styled.div`
  position: relative;
`;
const Input = styled.input`
  border: 1px solid #d4d4d4;
  padding: 10px 20px;
  padding-left: 40px;
  width: 500px;
  border-radius: 40px;
  font-size: 14px;
`;

const Error = styled.div`
  color: red;
  font-size: 12px;
  position: absolute;
  left: 310px;
`;
const TagConatiner = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-left: 10px;
`;
const Icon = styled.button`
  background-color: #fff;
  position: absolute;
  left: 12px;
  cursor: pointer;
`;
const Span = styled.span`
  color: #5c5c5c;
  font-size: 14px;
  margin-left: 4px;
`;