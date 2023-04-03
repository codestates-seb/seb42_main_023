// 패키지 등
import React, { useRef } from 'react';
import styled from 'styled-components';
<<<<<<< HEAD
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
// slices
import { setIsEdit, setTitle } from '../../slices/postInputSlice';
=======
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setTitle } from '../../slices/postInputSlice';
>>>>>>> 6038065ce9f8ca42c1f373aae8d2621ff9d4483d
import { setTitleErr } from '../../slices/validationSlice';

const TitleInput: React.FC = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state);
  const title = useRef<HTMLInputElement>(null);
<<<<<<< HEAD
  const params = useParams();
  const postId = Number(params.postId);
=======
>>>>>>> 6038065ce9f8ca42c1f373aae8d2621ff9d4483d

  // 제목 value 확인
  const valueCheck = (event: React.ChangeEvent<HTMLInputElement>): void => {
    dispatch(setTitle(event.target.value));
    validationTest();
  };

  const validationTest = (): void => {
    const titleValue = title.current?.value;
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
<<<<<<< HEAD
            placeholder="제목을 입력하세요."
            onChange={(event) => {
              valueCheck(event);
              dispatch(setIsEdit(true));
            }}
            value={state.postInput?.title}
=======
            placeholder="제목을 입력해주세요."
            onChange={valueCheck}
>>>>>>> 6038065ce9f8ca42c1f373aae8d2621ff9d4483d
          ></Input>
        </TitleInputContainer>
      ) : (
        <TitleInputContainer>
          <h1> 게시글 수정</h1>
          <Input
            ref={title}
            className="title-input"
<<<<<<< HEAD
            placeholder="제목을 입력하세요."
            onChange={(event) => {
              valueCheck(event);
              dispatch(setIsEdit(true));
            }}
            value={state.postInput?.title}
=======
            placeholder="제목을 입력해주세요."
            onChange={valueCheck}
>>>>>>> 6038065ce9f8ca42c1f373aae8d2621ff9d4483d
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
