import React, { useRef } from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setIsEdit, setTitle } from '../../slices/postInputSlice';
import { setTitleErr } from '../../slices/validationSlice';

const TitleInput: React.FC = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state);
  const title = useRef<HTMLInputElement>(null);

  const checkValue = (event: React.ChangeEvent<HTMLInputElement>): void => {
    dispatch(setTitle(event.target.value));
    validateTitle();
  };

  const validateTitle = (): void => {
    const titleValue = title!.current?.value;
    if (titleValue!.length === 0) {
      dispatch(setTitleErr('제목을 작성해주세요.'));
    }
    if (titleValue) {
      if (titleValue.length < 5 || titleValue.length > 20) {
        dispatch(setTitleErr('제목은 5자 이상 20자 이하로 작성해주세요.'));
      } else {
        dispatch(setTitleErr(''));
      }
    }
  };
  return (
    <>
      {state.validation.titleErr === '' ? (
        <TitleInputContainer>
          <h1> 게시글 수정</h1>
          <Input
            ref={title}
            className="title-input"
            placeholder="제목을 입력하세요."
            onChange={(event) => {
              checkValue(event);
              dispatch(setIsEdit(true));
            }}
            value={state.postInput?.title}
          ></Input>
        </TitleInputContainer>
      ) : (
        <TitleInputContainer>
          <h1> 게시글 수정</h1>
          <Input
            ref={title}
            className="title-input"
            placeholder="제목을 입력하세요."
            onChange={(event) => {
              checkValue(event);
              dispatch(setIsEdit(true));
            }}
            value={state.postInput?.title}
          ></Input>
          <Error>{state.validation?.titleErr}</Error>
        </TitleInputContainer>
      )}
    </>
  );
};

export default TitleInput;

const TitleInputContainer = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 50px;
  margin-bottom: 20px;
  h1 {
    font-size: 24px;
    font-weight: 400;
  }
`;

const Input = styled.input`
  width: 100%;
  height: 50px;
  border: 1px solid #d4d4d4;
  padding: 0 10px 0 10px;
  margin-top: 20px;
  padding-left: 15px;
  ::placeholder {
    font-style: italic;
  }
  :focus {
    outline: 2px solid #0069ca;
  }
`;

const Error = styled.div`
  width: 100%;
  height: 15px;
  color: red;
  margin-top: 10px;
  padding: 0 10px 0 10px;
`;
