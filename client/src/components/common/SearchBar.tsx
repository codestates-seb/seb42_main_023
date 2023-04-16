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
import { TagItemWidthDelete } from '../common/Tag';
import { MdCancel } from 'react-icons/md';
import SearchBtn from './SearchToggle';
import { setPostCategory } from '../../slices/mainSlice';
import { setSearchQuery } from '../../slices/headerSlice';
import { useNavigate } from 'react-router-dom';

interface Input {
  className: string;
  placeholder: string;
  onChange: React.KeyboardEvent<HTMLInputElement>;
  value: string;
}

const SearchBar: React.FC = () => {
  const dispatch = useAppDispatch();
  const header = useAppSelector(({ header }) => header);
  const valid = useAppSelector(({ validation }) => validation);
  const navigation = useNavigate();

  const valueCheck = (event: React.ChangeEvent<HTMLInputElement>): void => {
    dispatch(setInput(event.target.value));
  };

  const validation = () => {
    const tag: Array<string> = header.tag;
    const input = header.input;
    if (input.length > 10) {
      dispatch(setTagErr('태그는 10자 이내로 입력해주세요.'));
      return;
    }
    if (tag.includes(input)) {
      dispatch(setTagErr(''));
      return;
    }
    if (input === '' && tag.length === 0) {
      dispatch(setTagErr(''));
      return;
    }
    if (input.includes(' ')) {
      dispatch(setTagErr('태그에 띄어쓰기를 포함할 수 없습니다.'));
      return;
    }
    if (tag.length >= 5) {
      dispatch(setTagErr('태그는 5개까지만 입력 가능합니다.'));
      return;
    } else {
      dispatch(setInput(''));
      dispatch(setTagErr(''));
      dispatch(setSearchTag(input.slice(1)));
    }
  };

  const searchHandler = () => {
    const tag: Array<string> = header.tag;
    const input = header.input;
    if (tag.length === 0 && input === '') {
      return;
    }
    if (input[0] === '#') {
      validation();
    } else {
      dispatch(setPostCategory('/search'));
      if (tag.length === 0 && input.length !== 0) {
        dispatch(setSearchQuery(`&keyword=${input}&tags=`));
      }
      if (tag.length !== 0 && input.length === 0) {
        const tagstring = tag.join();
        dispatch(setSearchQuery(`&keyword=&tags=${tagstring}`));
      }
      if (tag.length !== 0 && input.length !== 0) {
        const tagstring = tag.join();
        dispatch(setSearchQuery(`&keyword=${input}&tags=${tagstring}`));
      }
      navigation('/search');
    }
  };
  const searchEnterHandler = (event: KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'Enter' && event.nativeEvent.isComposing === false) {
      searchHandler();
    }
  };
  const searchClickHandler = (): void => {
    searchHandler();
  };

  return (
    <>
      <TagInputContainer>
        <InputContainer>
          <Input
            className="tag-input"
            placeholder="관심있는 내용을 검색해보세요."
            onChange={valueCheck}
            onKeyDown={searchEnterHandler}
            value={header.input}
          />
          <Icon onClick={searchClickHandler}>
            <AiOutlineSearch size={26} />
          </Icon>
          {valid.tagErr !== '' && <Error>{valid.tagErr}</Error>}
          {header.tag.length === 0 && <Span>#주식 #경제 #연봉</Span>}
          <TagConatiner>
            {header.tag.map((tag, idx) => (
              <TagItemWidthDelete key={idx}>
                <span>{tag}</span>
                <button onClick={() => dispatch(deleteSarchTag(tag))}>
                  <MdCancel
                    size="13"
                    color={valid.tagErr !== '' ? '#ccc' : undefined}
                  />
                </button>
              </TagItemWidthDelete>
            ))}
          </TagConatiner>
        </InputContainer>
        <SearchBtn />
      </TagInputContainer>
    </>
  );
};

export default SearchBar;

const TagInputContainer = styled.div`
  display: flex;
  margin: 0 auto;
  height: 53px;
`;

const InputContainer = styled.div``;
const Input = styled.input`
  border: 1px solid #d4d4d4;
  padding: 10px 20px;
  width: 500px;
  border-radius: 40px;
  font-size: 14px;
  box-sizing: border-box;
  :focus {
    outline: none;
    border: none;
    box-shadow: 0 0 3px var(--hover-point-blue-color);
  }
  @media (max-width: 1100px) {
    width: 100%;
  }
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
  cursor: pointer;
  right: 140px;
  @media (max-width: 1100px) {
    position: absolute;
    right: 40px;
    top: 5px;
  }
`;
const Span = styled.span`
  color: #5c5c5c;
  font-size: 14px;
  margin-left: 14px;
  @media (max-width: 1100px) {
    margin-top: 10px;
  }
`;
