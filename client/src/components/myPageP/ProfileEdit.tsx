import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setContent, setEditOpen } from '../../slices/mypageSlice';
import { membersApi } from '../../api/memberapi';

const ProfileEdit = () => {
  const dispatch = useAppDispatch();
  const { EditWidth, content } = useAppSelector(({ mypage }) => mypage);
  const inputRef = useRef<HTMLInputElement>(null);

  //처음 실행될 때 div의 넓이를 지정함
  useEffect(() => {
    inputRef.current?.style?.setProperty('width', `${EditWidth - 24}px`);
    inputRef.current?.focus();
  }, [EditWidth]);

  return (
    <InputWrap>
      <input
        value={content}
        ref={inputRef}
        onChange={(e) => dispatch(setContent(e.target.value))}
      ></input>
    </InputWrap>
  );
};
export default ProfileEdit;
const InputWrap = styled.div`
  display: flex;
  input {
    box-sizing: border-box;
    :focus {
      outline: none;
      color: var(--point-blue-color);
      border-bottom: 1px solid var(--point-blue-color);
    }
  }
  button {
    width: 40px;

    :hover {
      color: var(--point-blue-color);
    }
  }
`;
