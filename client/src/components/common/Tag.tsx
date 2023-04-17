import React from 'react';
import styled from 'styled-components';
import { MdCancel } from 'react-icons/md';
import { useAppDispatch } from '../../hooks';
import { deleteTag, setIsEdit } from '../../slices/postInputSlice';

interface Props {
  content: string;
  button?: string;
  search?: boolean;
}

const Tag = ({ content }: Props) => {
  const dispatch = useAppDispatch();
  const deleteTagHandler = () => {
    dispatch(deleteTag(content));
    dispatch(setIsEdit(true));
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

export const TagItem = styled.span`
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
  @media (max-width: 1100px) {
    margin-top: 10px;
  }
`;
