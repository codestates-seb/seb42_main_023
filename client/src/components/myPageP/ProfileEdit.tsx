import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';

interface ProfileEditProps {
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
  submitHandler: () => void;
}

const ProfileEdit: React.FC<ProfileEditProps> = ({
  content,
  setContent,
  submitHandler,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  });

  //엔터로 수정
  const searchEnterHandler = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ): void => {
    if (event.key === 'Enter') {
      submitHandler();
    }
  };
  return (
    <InputWrap>
      <input
        value={content}
        ref={inputRef}
        onChange={(e) => setContent(e.target.value)}
        onKeyDown={searchEnterHandler}
      ></input>
    </InputWrap>
  );
};
export default ProfileEdit;
const InputWrap = styled.div`
  display: flex;
  input {
    box-sizing: border-box;
    width: 900px;
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
