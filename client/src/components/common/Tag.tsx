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
  background-color: #e3e8f0;
  box-sizing: border-box;
  padding: 4px 0;
  padding-left: 10px;
  padding-right: 24px;
  border-radius: 30px;
  margin-right: 4px;
  span {
    font-size: 13px;
  }
`;

//삭제 버튼이 있는 태그
export const TagItemWidthDelete = styled(TagItem)`
  button {
    position: absolute;
    right: 5px;
    top: 3px;
    align-items: center;
    background-color: #e3e8f0;
    margin-left: 4px;
    svg {
      color: #b4c2d6;
      :hover {
        color: #72839d;
      }
    }
  }
`;
