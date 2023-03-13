import React from 'react';
import styled from 'styled-components';
import { useAppDispatch } from '../../hooks';
import { setTitle } from '../../slices/postInputSlice';

const TitleInput: React.FC = () => {
  const dispatch = useAppDispatch();
  const valueCheck = (event: React.ChangeEvent<HTMLInputElement>): void => {
    dispatch(setTitle(event.target.value));
  };

  return (
    <TitleInputContainer>
      <h1> 게시글 작성</h1>
      <Input
        className="title-input"
        placeholder="제목을 입력해주세요."
        onChange={valueCheck}
      ></Input>
    </TitleInputContainer>
  );
};

export default TitleInput;

const TitleInputContainer = styled.div`
  width: 100%;
  height: 100px;
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
`;
