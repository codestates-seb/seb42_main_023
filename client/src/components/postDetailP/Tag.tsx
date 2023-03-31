import React from 'react';
import styled from 'styled-components';
import { MdCancel } from 'react-icons/md';
import { useAppDispatch } from '../../hooks';
import { deleteTag } from '../../slices/postInputSlice';

interface Props {
  content: string;
  button?: string;
  search?: boolean;
}

const Tag = ({ content }: Props) => {
  return (
    <>
      <TagItem>
        <span>{content}</span>
      </TagItem>
    </>
  );
};

export default Tag;

//삭제 버튼이 없는 태그
export const TagItem = styled.button`
  position: relative;
  display: inline-flex;
  background-color: #fff;
  border: 1px solid var(--point-blue-color);
  box-sizing: border-box;
  padding: 5px 10px 5px 10px;
  border-radius: 30px;
  margin: 0 7px 15px 0;

  width: max-content;
  span {
    font-size: 16px;
    color: var(--point-blue-color);
  }
`;