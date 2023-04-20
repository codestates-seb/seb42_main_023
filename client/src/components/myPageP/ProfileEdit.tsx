import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';

interface ProfileEditProps {
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
}

const ProfileEdit: React.FC<ProfileEditProps> = ({ content, setContent }) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  });

  return (
    <EditIntput
      value={content}
      ref={inputRef}
      onChange={(e) => {
        setContent(e.currentTarget.value);
      }}
      rows={5}
      maxLength={499}
    ></EditIntput>
  );
};

export default ProfileEdit;
const InputWrap = styled.div`
  display: flex;
  textarea {
    box-sizing: border-box;
    max-width: 900px;
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
const EditIntput = styled.textarea`
  width: 100%;
  border: 1px solid var(--border-color);
  padding: 10px;
  border-radius: 6px;
  :focus {
    outline: none;
    border: none;
    box-shadow: 0 0 6px var(--hover-point-blue-color);
  }
`;
