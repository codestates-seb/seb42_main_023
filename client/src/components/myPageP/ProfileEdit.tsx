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
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  });

  const searchEnterHandler = (
    event: React.KeyboardEvent<HTMLTextAreaElement>,
  ): void => {
    if (event.key === 'Enter') {
      submitHandler();
    }
  };

  return (
    <InputWrap>
      <textarea
        value={content}
        ref={inputRef}
        onChange={(e) => {
          setContent(e.currentTarget.value);
        }}
        onKeyDown={searchEnterHandler}
        rows={5}
        maxLength={499}
      ></textarea>
    </InputWrap>
  );
};

export default ProfileEdit;
const InputWrap = styled.div`
  display: flex;
  textarea {
    box-sizing: border-box;
    width: 806px;
    resize: none;
    border: 1px solid var(--border-color);
    padding: 10px;
    border-radius: 6px;
    :focus {
      outline: 1px solid var(--point-blue-color);
    }
  }
  button {
    width: 40px;

    :hover {
      color: var(--point-blue-color);
    }
  }
`;
