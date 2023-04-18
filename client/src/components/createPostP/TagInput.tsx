import React, { KeyboardEvent } from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../hooks';
import Tag from '../common/Tag';
import { setTagContent, setTag } from '../../slices/postInputSlice';
import { setTagErr } from '../../slices/validationSlice';

const TagInput: React.FC = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state);
  const checkValue = (event: React.ChangeEvent<HTMLInputElement>): void => {
    dispatch(setTagContent(event.target.value));
  };

  const addTagHandler = (event: KeyboardEvent<HTMLInputElement>): void => {
    const tag: Array<string> = state.postInput.tag;
    const tagContent = state.postInput.tagContent;

    if (event.key === 'Enter' && event.nativeEvent.isComposing === false) {
      if (tag.includes(tagContent)) {
        dispatch(setTagErr(''));
        return;
      }
      if (tagContent === '') {
        dispatch(setTagErr(''));
        return;
      }
      if (tagContent.length > 10) {
        dispatch(setTagErr('태그 길이는 최대 10 글자 입니다.'));
        return;
      }
      if (tagContent.includes(' ')) {
        dispatch(setTagErr('태그에 띄어쓰기를 포함할 수 없습니다.'));
        return;
      }
      if (tag.length >= 5) {
        dispatch(setTagErr('태그는 5개까지만 입력 가능합니다.'));
        dispatch(setTagContent(''));
        dispatch(setTagErr(''));
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
          <Input
            className="tag-input"
            placeholder="Enter를 쳐서 태그를 추가하세요.(최소 1개, 최대 5개)"
            onChange={checkValue}
            onKeyDown={addTagHandler}
            value={state.postInput.tagContent}
          ></Input>
          <TagConatiner>
            {state.postInput.tag.map((tag, idx) => {
              return <Tag key={idx} content={tag}></Tag>;
            })}
          </TagConatiner>
        </TagInputContainer>
      ) : (
        <TagInputContainer>
          <Input
            className="tag-input"
            placeholder="태그를 입력하고 엔터를 치세요.(최대 5개)"
            onChange={checkValue}
            onKeyDown={addTagHandler}
            value={state.postInput.tagContent}
          ></Input>
          <Error>{state.validation.tagErr}</Error>
          <TagConatiner>
            {state.postInput.tag.map((tag, idx) => {
              return <Tag key={idx} content={tag}></Tag>;
            })}
          </TagConatiner>
        </TagInputContainer>
      )}
    </>
  );
};

export default TagInput;

const TagInputContainer = styled.div`
  width: 100%;
  height: 40px;
  @media (max-width: 1100px) {
    width: 90vw;
    min-width: 640px;
  }
`;

const Input = styled.input`
  width: 100%;
  height: 50px;
  border: 1px solid #d4d4d4;
  padding: 0 10px 0 10px;
  padding-left: 15px;
  min-width: 640px;
  ::placeholder {
    font-style: italic;
  }
  :focus {
    outline: 2px solid #0069ca;
  }
  @media (max-width: 1100px) {
    width: 90vw;
  }
`;

const Error = styled.div`
  width: 100%;
  height: 15px;
  color: red;
  margin-top: 10px;
  padding: 0 10px 0 10px;
`;
const TagConatiner = styled.div`
  display: flex;
  width: 1000px;
  justify-content: start;
  margin-top: 15px;
`;
