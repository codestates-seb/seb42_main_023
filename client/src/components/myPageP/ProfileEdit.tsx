import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setContent, setEditOpen } from '../../slices/mypageSlice';
import { membersApi } from '../../api/memberapi';

const ProfileEdit = () => {
  const dispatch = useAppDispatch();
  const { EditWidth, content, EditOpen } = useAppSelector(
    ({ mypage }) => mypage,
  );
  const { memberName } = useAppSelector(({ header }) => header);
  const inputRef = useRef<HTMLInputElement>(null);

  //처음 실행될 때 div의 넓이를 지정함
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.width = `${EditWidth - 24}px`;
    }
  }, []);
  //input에 입력할 때마나 너비를 조정해줌
  const keyUpHandler = () => {
    console.log(inputRef.current?.value.length);
    if (inputRef.current) {
      inputRef.current.style.width = `${inputRef.current.value?.length * 13}px`;
    }
  };
  const submitHandler = () => {
    dispatch(setEditOpen(!EditOpen));
    //TODO: intro patch요청 시 type error
    // const membersQuery = membersApi.useUpdateMemberMutation<{
    //   name: string;
    //   intro: string;
    // }>({
    //   name: memberName,
    //   intro: content,
    // });
  };
  return (
    <Input>
      <input
        value={content}
        ref={inputRef}
        onKeyUp={keyUpHandler}
        onChange={(e) => dispatch(setContent(e.target.value))}
      ></input>
      <button onClick={submitHandler}>저장</button>
    </Input>
  );
};
export default ProfileEdit;
const Input = styled.div`
  display: flex;
  input {
    :focus {
      outline: none;
    }
  }
  button {
    width: 40px;

    :hover {
      color: var(--point-blue-color);
    }
  }
`;
