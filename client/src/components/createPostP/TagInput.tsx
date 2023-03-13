import React, { KeyboardEvent } from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setTagContent, setTag } from '../../slices/postInputSlice';

interface Input {
  className: string;
  placeholder: string;
  onChange: React.KeyboardEvent<HTMLInputElement>;
  value: string;
}

// 공통 컴포넌트
const TagInput: React.FC = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state);

  const valueCheck = (event: React.ChangeEvent<HTMLInputElement>): void => {
    dispatch(setTagContent(event.target.value));
  };

  const enterHandler = (event: KeyboardEvent<HTMLInputElement>): void => {
    const tag = state.postInput.tag;
    const tagContent = state.postInput.tagContent;
    if (event.key === 'Enter' && event.nativeEvent.isComposing === false) {
      // 공백 방지
      if (tagContent === '') {
        return;
      }
      // 띄어쓰기 방지
      if (tagContent.includes(' ')) {
        alert('태그에 띄어쓰기를 포함할 수 없습니다.');
        return;
      }
      // 태그 개수 제한
      if (tag.length >= 5) {
        alert('태그는 5개까지만 입력 가능합니다.');
        return;
      } else {
        dispatch(setTagContent(''));
        dispatch(setTag(tagContent));
      }
    }
  };
  return (
    <TagInputContainer>
      <Input
        className="tag-input"
        placeholder="태그를 입력하고 엔터를 치세요.(최대 5개)"
        onChange={valueCheck}
        onKeyDown={enterHandler}
        value={state.postInput.tagContent}
      ></Input>
    </TagInputContainer>
  );
};

export default TagInput;

const TagInputContainer = styled.div`
  width: 100%;
  height: 40px;
  margin-top: 65px;
`;
const Input = styled.input`
  width: 100%;
  height: 50px;
  border: 1px solid #d4d4d4;
  padding: 0 10px 0 10px;
`;
