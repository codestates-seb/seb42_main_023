import React, { KeyboardEvent } from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setTagContent, setTag } from '../../slices/postInputSlice';
import { setTagErr } from '../../slices/validationSlice';
import { AiOutlineSearch } from 'react-icons/ai';
import Tag from '../common/Tag';
import SearchBtn from './SearchBtn';

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
  const valueCheck = (event: React.ChangeEvent<HTMLInputElement>): void => {
    dispatch(setTagContent(event.target.value));
  };

  //  테그 추가
  const addTagHandler = (event: KeyboardEvent<HTMLInputElement>): void => {
    const tag: Array<string> = state.postInput.tag;
    const tagContent = state.postInput.tagContent;

    // 유효성 검사
    if (event.key === 'Enter' && event.nativeEvent.isComposing === false) {
      // 태그 중복 입력 방지
      console.log(tagContent);
      if (tag.includes(tagContent)) {
        dispatch(setTagErr(''));
        return;
      }
      // 공백 방지
      if (tagContent === '') {
        dispatch(setTagErr(''));
        return;
      }
      // 띄어쓰기 방지
      if (tagContent.includes(' ')) {
        dispatch(setTagErr('태그에 띄어쓰기를 포함할 수 없습니다.'));
        return;
      }
      // 태그 개수 제한
      if (tag.length >= 5) {
        dispatch(setTagErr('태그는 5개까지만 입력 가능합니다.'));
        return;
      } else {
        dispatch(setTagContent(''));
        dispatch(setTagErr(''));
        dispatch(setTag(tagContent));
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
              onKeyDown={addTagHandler}
              value={state.postInput.tagContent}
            ></Input>
            <Icon>
              <AiOutlineSearch size={26} />
            </Icon>
            <Span>#태그를 검색하세요</Span>
            <TagConatiner>
              {state.postInput.tag.map((tag, idx) => {
                return <Tag key={idx} content={tag}></Tag>;
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
              onKeyDown={addTagHandler}
              value={state.postInput.tagContent}
            ></Input>
            <Icon>
              <AiOutlineSearch size={26} />
            </Icon>
            <Error>{state.validation.tagErr}</Error>
            <TagConatiner>
              {state.postInput.tag.map((tag, idx) => {
                return <Tag key={idx} content={tag}></Tag>;
              })}
            </TagConatiner>
          </InputWraper>
          <div>
            <SearchBtn />
          </div>
        </TagInputContainer>
      )}
    </>
  );
};

export default SearchBar;

const TagInputContainer = styled.div`
  display: flex;
  margin: 0 auto;
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
