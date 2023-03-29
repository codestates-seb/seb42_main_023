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
  const dispatch = useAppDispatch();
  const deleteTagHandler = () => {
    dispatch(deleteTag(content));
  };
  return (
    <>
      <TagItemWidthDelete>
        <span>{content}</span>
        <button onClick={deleteTagHandler}>
          <MdCancel size="13" />
        </button>
      </TagItemWidthDelete>
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
  padding: 4px 0;
  padding-left: 12px;
  padding-right: 26px;
  border-radius: 30px;
  margin-right: 4px;
  span {
    font-size: 16px;
    color: var(--point-blue-color);
  }
`;

//삭제 버튼이 있는 태그
export const TagItemWidthDelete = styled(TagItem)`
  button {
    position: absolute;
    right: 7px;
    top: 4px;
    align-items: center;
    margin-left: 4px;
    border-radius: 10px;
    svg {
      color: #b4c2d6;
      :hover {
        color: #72839d;
      }
    }
  }
`;
